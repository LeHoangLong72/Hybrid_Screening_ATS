package com.ats.hybrid.modules.workflow.dto;

import jakarta.validation.constraints.NotBlank;

public class StageMigrationRequest {

    @NotBlank(message = "Source stage ID is required")
    private String sourceStageId;

    @NotBlank(message = "Target stage ID is required")
    private String targetStageId;

    public StageMigrationRequest() {}

    public StageMigrationRequest(String sourceStageId, String targetStageId) {
        this.sourceStageId = sourceStageId;
        this.targetStageId = targetStageId;
    }

    public String getSourceStageId() {
        return sourceStageId;
    }

    public void setSourceStageId(String sourceStageId) {
        this.sourceStageId = sourceStageId;
    }

    public String getTargetStageId() {
        return targetStageId;
    }

    public void setTargetStageId(String targetStageId) {
        this.targetStageId = targetStageId;
    }
}
