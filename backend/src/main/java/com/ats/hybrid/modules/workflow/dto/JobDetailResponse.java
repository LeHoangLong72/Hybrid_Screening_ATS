package com.ats.hybrid.modules.workflow.dto;

import com.ats.hybrid.modules.workflow.domain.JobOpening;
import com.ats.hybrid.modules.workflow.domain.Stage;
import com.ats.hybrid.modules.workflow.domain.StageTransition;

import java.util.List;

public class JobDetailResponse {
    private JobOpening job;
    private List<Stage> stages;
    private List<StageTransition> allowedTransitions;

    public JobDetailResponse() {}

    public JobDetailResponse(JobOpening job, List<Stage> stages, List<StageTransition> allowedTransitions) {
        this.job = job;
        this.stages = stages;
        this.allowedTransitions = allowedTransitions;
    }

    public JobOpening getJob() {
        return job;
    }

    public void setJob(JobOpening job) {
        this.job = job;
    }

    public List<Stage> getStages() {
        return stages;
    }

    public void setStages(List<Stage> stages) {
        this.stages = stages;
    }

    public List<StageTransition> getAllowedTransitions() {
        return allowedTransitions;
    }

    public void setAllowedTransitions(List<StageTransition> allowedTransitions) {
        this.allowedTransitions = allowedTransitions;
    }
}
