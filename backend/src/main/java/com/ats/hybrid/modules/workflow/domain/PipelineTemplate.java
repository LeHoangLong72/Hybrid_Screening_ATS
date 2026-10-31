package com.ats.hybrid.modules.workflow.domain;

import java.util.ArrayList;
import java.util.List;

public class PipelineTemplate {
    private String id;
    private String name;
    private String description;
    private List<Stage> stages = new ArrayList<>();
    private List<StageTransition> allowedTransitions = new ArrayList<>();

    public PipelineTemplate() {}

    public PipelineTemplate(String id, String name, String description, List<Stage> stages, List<StageTransition> allowedTransitions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stages = stages;
        this.allowedTransitions = allowedTransitions;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
