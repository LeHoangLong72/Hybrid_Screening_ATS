package com.ats.hybrid.modules.workflow.dto;

import com.ats.hybrid.modules.workflow.domain.ScoringCriterion;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CreateJobOpeningRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    private String department;
    private String location;

    private int minWorkExpMonths = 0;
    private Double maxSalary;

    @NotBlank(message = "Pipeline template ID is required")
    private String pipelineTemplateId;

    @NotNull(message = "Scoring rubric is required")
    private List<ScoringCriterion> rubric;

    public CreateJobOpeningRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getMinWorkExpMonths() {
        return minWorkExpMonths;
    }

    public void setMinWorkExpMonths(int minWorkExpMonths) {
        this.minWorkExpMonths = minWorkExpMonths;
    }

    public Double getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(Double maxSalary) {
        this.maxSalary = maxSalary;
    }

    public String getPipelineTemplateId() {
        return pipelineTemplateId;
    }

    public void setPipelineTemplateId(String pipelineTemplateId) {
        this.pipelineTemplateId = pipelineTemplateId;
    }

    public List<ScoringCriterion> getRubric() {
        return rubric;
    }

    public void setRubric(List<ScoringCriterion> rubric) {
        this.rubric = rubric;
    }
}
