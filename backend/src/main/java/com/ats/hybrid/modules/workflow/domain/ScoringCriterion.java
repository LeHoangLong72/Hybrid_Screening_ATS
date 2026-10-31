package com.ats.hybrid.modules.workflow.domain;

public class ScoringCriterion {
    private String id;
    private String name;
    private String description;
    private double weight;

    public ScoringCriterion() {}

    public ScoringCriterion(String id, String name, String description, double weight) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.weight = weight;
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

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }
}
