package com.ats.hybrid.common.exception;

public class GuardRuleViolationException extends RuntimeException {
    private final String stageId;
    private final String guardRule;

    public GuardRuleViolationException(String stageId, String guardRule, String message) {
        super(message);
        this.stageId = stageId;
        this.guardRule = guardRule;
    }

    public String getStageId() {
        return stageId;
    }

    public String getGuardRule() {
        return guardRule;
    }
}
