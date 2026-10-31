package com.ats.hybrid.modules.workflow.domain;

public class StageTransition {
    private String fromStageId;
    private String toStageId;
    private String description;

    public StageTransition() {}

    public StageTransition(String fromStageId, String toStageId, String description) {
        this.fromStageId = fromStageId;
        this.toStageId = toStageId;
        this.description = description;
    }

    public String getFromStageId() {
        return fromStageId;
    }

    public void setFromStageId(String fromStageId) {
        this.fromStageId = fromStageId;
    }

    public String getToStageId() {
        return toStageId;
    }

    public void setToStageId(String toStageId) {
        this.toStageId = toStageId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
