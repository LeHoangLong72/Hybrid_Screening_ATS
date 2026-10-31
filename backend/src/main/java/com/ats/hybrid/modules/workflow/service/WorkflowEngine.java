package com.ats.hybrid.modules.workflow.service;

import com.ats.hybrid.common.exception.*;
import com.ats.hybrid.common.util.LexoRankUtil;
import com.ats.hybrid.modules.workflow.domain.*;
import com.ats.hybrid.modules.workflow.dto.MoveApplicationRequest;
import com.ats.hybrid.modules.workflow.repository.MockDataStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkflowEngine {

    private final MockDataStore dataStore;

    public WorkflowEngine(MockDataStore dataStore) {
        this.dataStore = dataStore;
    }

    public synchronized CandidateApplication moveApplication(String applicationId, MoveApplicationRequest request) {
        CandidateApplication app = dataStore.findApplicationById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", applicationId));

        // 1. Optimistic Locking Check (Concurrency Conflict)
        if (request.getVersion() != null && request.getVersion() != app.getVersion()) {
            throw new ConcurrencyConflictException(applicationId, request.getVersion(), app.getVersion());
        }

        JobOpening job = dataStore.findJobById(app.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("JobOpening", app.getJobId()));

        PipelineTemplate template = dataStore.findTemplateById(job.getPipelineTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("PipelineTemplate", job.getPipelineTemplateId()));

        String currentStageId = app.getStageId();
        String targetStageId = request.getTargetStageId();

        Stage targetStage = template.getStages().stream()
                .filter(s -> s.getId().equals(targetStageId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Stage", targetStageId));

        // 2. Validate Stage Transition (BR-01)
        if (!currentStageId.equals(targetStageId)) {
            validateTransition(template, currentStageId, targetStage, request.getRejectionReason());
        }

        // 3. Validate Guard Conditions (BR-05)
        validateGuardCondition(targetStage, app);

        // 4. Calculate LexoRank (BR-03)
        String newRank = LexoRankUtil.between(request.getPrevRank(), request.getNextRank());
        if (LexoRankUtil.needsRebalance(newRank)) {
            rebalanceStage(targetStageId, app.getId());
            newRank = LexoRankUtil.between(request.getPrevRank(), request.getNextRank());
        }

        // 5. Apply Updates & Increment Version
        app.setStageId(targetStageId);
        app.setLexoRank(newRank);
        app.setVersion(app.getVersion() + 1);

        return dataStore.saveApplication(app);
    }

    private void validateTransition(PipelineTemplate template, String fromStageId, Stage targetStage, String rejectionReason) {
        // Rule BR-01: Move to REJECTED is allowed from any stage, BUT requires a rejection reason
        if (targetStage.getType() == StageType.REJECTED) {
            if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
                throw new InvalidWorkflowTransitionException(
                        fromStageId, targetStage.getId(),
                        "Rejection reason (rejection_reason_code) is strictly required when transitioning to REJECTED (BR-01)"
                );
            }
            return;
        }

        // Check if transition is declared in Pipeline template matrix
        boolean isAllowed = template.getAllowedTransitions().stream()
                .anyMatch(t -> t.getFromStageId().equals(fromStageId) && t.getToStageId().equals(targetStage.getId()));

        if (!isAllowed) {
            throw new InvalidWorkflowTransitionException(
                    fromStageId, targetStage.getId(),
                    String.format("Transition from stage '%s' to '%s' is not permitted by pipeline '%s' (BR-01)",
                            fromStageId, targetStage.getId(), template.getName())
            );
        }
    }

    private void validateGuardCondition(Stage targetStage, CandidateApplication app) {
        String guardRule = targetStage.getGuardRule();
        if (guardRule == null || guardRule.trim().isEmpty()) {
            return;
        }

        // Rule BR-05: Chốt chặn vòng Offer (yêu cầu ít nhất 1 scorecard đã khóa)
        if ("MIN_LOCKED_SCORECARD_1".equalsIgnoreCase(guardRule)) {
            if (app.getLockedScorecardsCount() < 1) {
                throw new GuardRuleViolationException(
                        targetStage.getId(), guardRule,
                        String.format("Cannot move candidate '%s' to '%s': Requires at least 1 submitted and locked scorecard (BR-05). Current locked count: %d",
                                app.getCandidateCode(), targetStage.getName(), app.getLockedScorecardsCount())
                );
            }
        }
    }

    private void rebalanceStage(String stageId, String movingAppId) {
        List<CandidateApplication> stageApps = dataStore.findApplicationsByStageId(stageId);
        List<String> newRanks = LexoRankUtil.rebalanceRanks(stageApps.size() + 1);
        for (int i = 0; i < stageApps.size(); i++) {
            CandidateApplication item = stageApps.get(i);
            if (!item.getId().equals(movingAppId)) {
                item.setLexoRank(newRanks.get(i));
                dataStore.saveApplication(item);
            }
        }
    }
}
