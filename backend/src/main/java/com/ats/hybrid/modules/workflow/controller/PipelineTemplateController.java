package com.ats.hybrid.modules.workflow.controller;

import com.ats.hybrid.modules.workflow.domain.PipelineTemplate;
import com.ats.hybrid.modules.workflow.dto.StageMigrationRequest;
import com.ats.hybrid.modules.workflow.service.PipelineTemplateService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/pipeline-templates")
public class PipelineTemplateController {

    private final PipelineTemplateService pipelineTemplateService;

    public PipelineTemplateController(PipelineTemplateService pipelineTemplateService) {
        this.pipelineTemplateService = pipelineTemplateService;
    }

    @GetMapping
    public ResponseEntity<List<PipelineTemplate>> getAllTemplates() {
        return ResponseEntity.ok(pipelineTemplateService.getAllTemplates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PipelineTemplate> getTemplateById(@PathVariable String id) {
        return ResponseEntity.ok(pipelineTemplateService.getTemplateById(id));
    }

    @PostMapping
    public ResponseEntity<PipelineTemplate> createTemplate(@Valid @RequestBody PipelineTemplate template) {
        PipelineTemplate created = pipelineTemplateService.createTemplate(template);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Rule BR-02 (Bảo toàn Ứng viên khi Đóng Cột):
     * Di chuyển toàn bộ ứng viên từ sourceStageId sang targetStageId trước khi đóng cột.
     */
    @PostMapping("/{id}/migrate-stage")
    public ResponseEntity<Map<String, Object>> migrateStage(
            @PathVariable String id,
            @Valid @RequestBody StageMigrationRequest request) {
        int migratedCount = pipelineTemplateService.migrateStage(id, request.getSourceStageId(), request.getTargetStageId());
        Map<String, Object> response = new HashMap<>();
        response.put("templateId", id);
        response.put("sourceStageId", request.getSourceStageId());
        response.put("targetStageId", request.getTargetStageId());
        response.put("migratedApplicationsCount", migratedCount);
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }
}
