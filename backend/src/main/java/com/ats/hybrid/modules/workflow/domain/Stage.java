package com.ats.hybrid.modules.workflow.domain;

public class Stage {
    private String id;
    private String name;
    private StageType type;
    private int orderIndex;
    private String color;
    private String guardRule;

    public Stage() {}

    public Stage(String id, String name, StageType type, int orderIndex, String color, String guardRule) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.orderIndex = orderIndex;
        this.color = color;
        this.guardRule = guardRule;
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

    public StageType getType() {
        return type;
    }

    public void setType(StageType type) {
        this.type = type;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getGuardRule() {
        return guardRule;
    }

    public void setGuardRule(String guardRule) {
        this.guardRule = guardRule;
    }
}
