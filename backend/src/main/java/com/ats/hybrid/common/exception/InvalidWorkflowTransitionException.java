package com.ats.hybrid.common.exception;

public class InvalidWorkflowTransitionException extends RuntimeException {
    private final String fromStageId;
    private final String toStageId;

    public InvalidWorkflowTransitionException(String fromStageId, String toStageId, String message) {
        super(message);
        this.fromStageId = fromStageId;
        this.toStageId = toStageId;
    }

    public String getFromStageId() {
        return fromStageId;
    }

    public String getToStageId() {
        return toStageId;
    }
}
