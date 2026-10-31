package com.ats.hybrid.modules.workflow.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class JobOpening {
    private String id;
    private String title;
    private String department;
    private String location;
    private JobStatus status = JobStatus.OPEN;
    private int minWorkExpMonths;
    private Double maxSalary;
    private int totalApplications;
    private String pipelineTemplateId;
    private List<ScoringCriterion> rubric = new ArrayList<>();
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    public JobOpening() {}

    public JobOpening(String id, String title, String department, String location, JobStatus status,
                      int minWorkExpMonths, Double maxSalary, int totalApplications,
                      String pipelineTemplateId, List<ScoringCriterion> rubric) {
        this.id = id;
        this.title = title;
        this.department = department;
        this.location = location;
        this.status = status;
        this.minWorkExpMonths = minWorkExpMonths;
        this.maxSalary = maxSalary;
        this.totalApplications = totalApplications;
        this.pipelineTemplateId = pipelineTemplateId;
        this.rubric = rubric != null ? rubric : new ArrayList<>();
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
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

    public int getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(int totalApplications) {
        this.totalApplications = totalApplications;
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
