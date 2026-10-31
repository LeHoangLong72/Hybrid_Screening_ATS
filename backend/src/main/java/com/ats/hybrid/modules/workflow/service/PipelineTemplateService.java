package com.ats.hybrid.modules.workflow.service;

import com.ats.hybrid.common.exception.ResourceNotFoundException;
import com.ats.hybrid.common.exception.ValidationException;
import com.ats.hybrid.modules.workflow.domain.CandidateApplication;
import com.ats.hybrid.modules.workflow.domain.PipelineTemplate;
import com.ats.hybrid.modules.workflow.domain.Stage;
import com.ats.hybrid.modules.workflow.repository.MockDataStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PipelineTemplateService {

    private final MockDataStore dataStore;

    public PipelineTemplateService(MockDataStore dataStore) {
        this.dataStore = dataStore;
    }

    public List<PipelineTemplate> getAllTemplates() {
        return dataStore.findAllTemplates();
    }

    public PipelineTemplate getTemplateById(String id) {
        return dataStore.findTemplateById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PipelineTemplate", id));
    }

    public PipelineTemplate createTemplate(PipelineTemplate template) {
        if (template.getStages() == null || template.getStages().isEmpty()) {
            throw new ValidationException("Pipeline template must have at least one stage.");
        }
        if (template.getId() == null || template.getId().trim().isEmpty()) {
            template.setId("pipe-" + UUID.randomUUID().toString().substring(0, 8));
        }
        return dataStore.saveTemplate(template);
    }

    /**
     * Rule BR-02 (Bảo toàn Ứng viên khi Đóng Cột):
     * Cấm xóa vật lý Stage đã có ứng viên. Muốn đóng (Archive) một Stage đang chứa ứng viên,
     * bắt buộc phải di chuyển toàn bộ ứng viên sang Stage đích hợp lệ.
     */
    public synchronized int migrateStage(String templateId, String sourceStageId, String targetStageId) {
        PipelineTemplate template = getTemplateById(templateId);

        Stage src = template.getStages().stream()
                .filter(s -> s.getId().equals(sourceStageId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Source Stage", sourceStageId));

        Stage dst = template.getStages().stream()
                .filter(s -> s.getId().equals(targetStageId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Target Stage", targetStageId));

        if (sourceStageId.equals(targetStageId)) {
            throw new ValidationException("Source stage and target stage for migration cannot be the same (BR-02).");
        }

        List<CandidateApplication> candidatesToMigrate = dataStore.findApplicationsByStageId(sourceStageId);
        for (CandidateApplication app : candidatesToMigrate) {
            app.setStageId(targetStageId);
            app.setVersion(app.getVersion() + 1);
            dataStore.saveApplication(app);
        }

        return candidatesToMigrate.size();
    }
}
