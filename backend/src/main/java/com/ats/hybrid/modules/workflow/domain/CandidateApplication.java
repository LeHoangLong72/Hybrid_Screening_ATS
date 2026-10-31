package com.ats.hybrid.modules.workflow.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CandidateApplication {
    private String id;
    private String candidateCode;
    private String masterCandidateId;
    private String fullName;
    private String blindCode;
    private String jobId;
    private String stageId;
    private long version = 1;
    private String lexoRank;

    // Experience metrics
    private int totalWorkExpMonths;
    private String educationLevel;
    private String universityTier;

    // Screening
    private String failedHardFilterReason;
    private Integer bm25Rank;
    private Integer vectorRank;
    private Double rrfScore;
    private Double rubricScore;
    private List<Map<String, Object>> rubricEvidences = new ArrayList<>();

    // Security & Flags
    private boolean hasSecurityFlag;
    private List<Map<String, Object>> securityThreats = new ArrayList<>();

    // Deduplication & Cooldown
    private Boolean isPotentialDuplicate;
    private Double duplicateMatchScore;
    private Boolean cooldownFlag;
    private String cooldownMessage;

    // Scorecards
    private int scorecardsCount;
    private int lockedScorecardsCount;

    private Instant updatedAt = Instant.now();

    public CandidateApplication() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCandidateCode() {
        return candidateCode;
    }

    public void setCandidateCode(String candidateCode) {
        this.candidateCode = candidateCode;
    }

    public String getMasterCandidateId() {
        return masterCandidateId;
    }

    public void setMasterCandidateId(String masterCandidateId) {
        this.masterCandidateId = masterCandidateId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getBlindCode() {
        return blindCode;
    }

    public void setBlindCode(String blindCode) {
        this.blindCode = blindCode;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getStageId() {
        return stageId;
    }

    public void setStageId(String stageId) {
        this.stageId = stageId;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public String getLexoRank() {
        return lexoRank;
    }

    public void setLexoRank(String lexoRank) {
        this.lexoRank = lexoRank;
    }

    public int getTotalWorkExpMonths() {
        return totalWorkExpMonths;
    }

    public void setTotalWorkExpMonths(int totalWorkExpMonths) {
        this.totalWorkExpMonths = totalWorkExpMonths;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getUniversityTier() {
        return universityTier;
    }

    public void setUniversityTier(String universityTier) {
        this.universityTier = universityTier;
    }

    public String getFailedHardFilterReason() {
        return failedHardFilterReason;
    }

    public void setFailedHardFilterReason(String failedHardFilterReason) {
        this.failedHardFilterReason = failedHardFilterReason;
    }

    public Integer getBm25Rank() {
        return bm25Rank;
    }

    public void setBm25Rank(Integer bm25Rank) {
        this.bm25Rank = bm25Rank;
    }

    public Integer getVectorRank() {
        return vectorRank;
    }

    public void setVectorRank(Integer vectorRank) {
        this.vectorRank = vectorRank;
    }

    public Double getRrfScore() {
        return rrfScore;
    }

    public void setRrfScore(Double rrfScore) {
        this.rrfScore = rrfScore;
    }

    public Double getRubricScore() {
        return rubricScore;
    }

    public void setRubricScore(Double rubricScore) {
        this.rubricScore = rubricScore;
    }

    public List<Map<String, Object>> getRubricEvidences() {
        return rubricEvidences;
    }

    public void setRubricEvidences(List<Map<String, Object>> rubricEvidences) {
        this.rubricEvidences = rubricEvidences;
    }

    public boolean isHasSecurityFlag() {
        return hasSecurityFlag;
    }

    public void setHasSecurityFlag(boolean hasSecurityFlag) {
        this.hasSecurityFlag = hasSecurityFlag;
    }

    public List<Map<String, Object>> getSecurityThreats() {
        return securityThreats;
    }

    public void setSecurityThreats(List<Map<String, Object>> securityThreats) {
        this.securityThreats = securityThreats;
    }

    public Boolean getIsPotentialDuplicate() {
        return isPotentialDuplicate;
    }

    public void setIsPotentialDuplicate(Boolean potentialDuplicate) {
        isPotentialDuplicate = potentialDuplicate;
    }

    public Double getDuplicateMatchScore() {
        return duplicateMatchScore;
    }

    public void setDuplicateMatchScore(Double duplicateMatchScore) {
        this.duplicateMatchScore = duplicateMatchScore;
    }

    public Boolean getCooldownFlag() {
        return cooldownFlag;
    }

    public void setCooldownFlag(Boolean cooldownFlag) {
        this.cooldownFlag = cooldownFlag;
    }

    public String getCooldownMessage() {
        return cooldownMessage;
    }

    public void setCooldownMessage(String cooldownMessage) {
        this.cooldownMessage = cooldownMessage;
    }

    public int getScorecardsCount() {
        return scorecardsCount;
    }

    public void setScorecardsCount(int scorecardsCount) {
        this.scorecardsCount = scorecardsCount;
    }

    public int getLockedScorecardsCount() {
        return lockedScorecardsCount;
    }

    public void setLockedScorecardsCount(int lockedScorecardsCount) {
        this.lockedScorecardsCount = lockedScorecardsCount;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
