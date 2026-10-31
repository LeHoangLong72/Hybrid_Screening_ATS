package com.ats.hybrid.modules.workflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MoveApplicationRequest {

    @NotBlank(message = "Target stage ID is required")
    private String targetStageId;

    private String prevRank;
    private String nextRank;

    @NotNull(message = "Application version is required for optimistic locking")
    private Long version;

    private String rejectionReason;

    public MoveApplicationRequest() {}

    public MoveApplicationRequest(String targetStageId, String prevRank, String nextRank, Long version, String rejectionReason) {
        this.targetStageId = targetStageId;
        this.prevRank = prevRank;
        this.nextRank = nextRank;
        this.version = version;
        this.rejectionReason = rejectionReason;
    }

    public String getTargetStageId() {
        return targetStageId;
    }

    public void setTargetStageId(String targetStageId) {
        this.targetStageId = targetStageId;
    }

    public String getPrevRank() {
        return prevRank;
    }

    public void setPrevRank(String prevRank) {
        this.prevRank = prevRank;
    }

    public String getNextRank() {
        return nextRank;
    }

    public void setNextRank(String nextRank) {
        this.nextRank = nextRank;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
