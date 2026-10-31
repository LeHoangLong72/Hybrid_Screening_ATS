package com.ats.hybrid.common.exception;

public class ConcurrencyConflictException extends RuntimeException {
    private final String entityId;
    private final long expectedVersion;
    private final long actualVersion;

    public ConcurrencyConflictException(String entityId, long expectedVersion, long actualVersion) {
        super(String.format("Concurrency conflict on entity '%s': client version was %d but current database version is %d",
                entityId, expectedVersion, actualVersion));
        this.entityId = entityId;
        this.expectedVersion = expectedVersion;
        this.actualVersion = actualVersion;
    }

    public String getEntityId() {
        return entityId;
    }

    public long getExpectedVersion() {
        return expectedVersion;
    }

    public long getActualVersion() {
        return actualVersion;
    }
}
