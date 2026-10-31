package com.ats.hybrid.modules.workflow.service;

import com.ats.hybrid.common.exception.ResourceNotFoundException;
import com.ats.hybrid.common.exception.ValidationException;
import com.ats.hybrid.modules.workflow.domain.*;
import com.ats.hybrid.modules.workflow.dto.CreateJobOpeningRequest;
import com.ats.hybrid.modules.workflow.dto.JobDetailResponse;
import com.ats.hybrid.modules.workflow.repository.MockDataStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class JobOpeningService {

    private final MockDataStore dataStore;

    public JobOpeningService(MockDataStore dataStore) {
        this.dataStore = dataStore;
    }

    public List<JobOpening> getAllJobs() {
        return dataStore.findAllJobs();
    }

    public JobDetailResponse getJobDetail(String jobId) {
        JobOpening job = dataStore.findJobById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("JobOpening", jobId));

        PipelineTemplate template = dataStore.findTemplateById(job.getPipelineTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("PipelineTemplate", job.getPipelineTemplateId()));

        return new JobDetailResponse(job, template.getStages(), template.getAllowedTransitions());
    }

    public JobOpening createJobOpening(CreateJobOpeningRequest request) {
        // 1. Verify Pipeline Template exists
        PipelineTemplate template = dataStore.findTemplateById(request.getPipelineTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("PipelineTemplate", request.getPipelineTemplateId()));

        // 2. Validate Scoring Rubric sum = 100% (BR-04)
        validateRubricWeights(request.getRubric());

        // 3. Build & Save Job
        String jobId = "job-" + UUID.randomUUID().toString().substring(0, 8);
        JobOpening job = new JobOpening(
                jobId,
                request.getTitle(),
                request.getDepartment(),
                request.getLocation(),
                JobStatus.OPEN,
                request.getMinWorkExpMonths(),
                request.getMaxSalary(),
                0,
                template.getId(),
                request.getRubric()
        );

        return dataStore.saveJob(job);
    }

    private void validateRubricWeights(List<ScoringCriterion> rubric) {
        if (rubric == null || rubric.isEmpty()) {
            throw new ValidationException("Scoring rubric cannot be empty. Must define evaluation criteria (BR-04).");
        }

        double totalWeight = rubric.stream()
                .mapToDouble(ScoringCriterion::getWeight)
                .sum();

        if (Math.abs(totalWeight - 100.0) > 0.001) {
            throw new ValidationException(String.format(
                    "Total weight of Scoring Rubric must equal exactly 100%% (BR-04). Current total: %.1f%%",
                    totalWeight
            ));
        }
    }
}
