package com.ats.hybrid.modules.workflow;

import com.ats.hybrid.common.exception.ConcurrencyConflictException;
import com.ats.hybrid.common.exception.GuardRuleViolationException;
import com.ats.hybrid.common.exception.InvalidWorkflowTransitionException;
import com.ats.hybrid.modules.workflow.domain.CandidateApplication;
import com.ats.hybrid.modules.workflow.dto.MoveApplicationRequest;
import com.ats.hybrid.modules.workflow.repository.MockDataStore;
import com.ats.hybrid.modules.workflow.service.WorkflowEngine;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WorkflowEngineTest {

    private MockDataStore dataStore;
    private WorkflowEngine workflowEngine;

    @BeforeEach
    void setUp() {
        dataStore = new MockDataStore();
        workflowEngine = new WorkflowEngine(dataStore);
    }

    @Test
    @DisplayName("BR-01: Chuyển bước hợp lệ (Screening -> Tech Interview) thành công và tăng version")
    void testValidTransition_ScreeningToInterview() {
        // App 101 đang ở stage-screening, version = 2
        MoveApplicationRequest req = new MoveApplicationRequest(
                "stage-interview",
                "0|hzzzzz:",
                "0|j00000:",
                2L,
                null
        );

        CandidateApplication result = workflowEngine.moveApplication("app-101", req);

        assertEquals("stage-interview", result.getStageId());
        assertEquals(3L, result.getVersion());
        assertNotNull(result.getLexoRank());
    }

    @Test
    @DisplayName("BR-01: Chuyển bước không nằm trong ma trận (Applied -> Offer) bị từ chối")
    void testInvalidTransition_AppliedToOffer_ThrowsException() {
        // App 102 đang ở stage-applied
        MoveApplicationRequest req = new MoveApplicationRequest(
                "stage-offer",
                null,
                null,
                1L,
                null
        );

        assertThrows(InvalidWorkflowTransitionException.class, () ->
                workflowEngine.moveApplication("app-102", req)
        );
    }

    @Test
    @DisplayName("BR-01: Chuyển sang REJECTED mà không có lý do bị từ chối")
    void testMoveToRejected_WithoutReason_ThrowsException() {
        // App 101 đang ở stage-screening
        MoveApplicationRequest req = new MoveApplicationRequest(
                "stage-rejected",
                null,
                null,
                2L,
                "" // Thiếu lý do từ chối
        );

        assertThrows(InvalidWorkflowTransitionException.class, () ->
                workflowEngine.moveApplication("app-101", req)
        );
    }

    @Test
    @DisplayName("BR-01: Chuyển sang REJECTED có lý do từ chối thành công")
    void testMoveToRejected_WithReason_Success() {
        MoveApplicationRequest req = new MoveApplicationRequest(
                "stage-rejected",
                null,
                null,
                2L,
                "FAILED_TECH_REQUIREMENT"
        );

        CandidateApplication result = workflowEngine.moveApplication("app-101", req);
        assertEquals("stage-rejected", result.getStageId());
    }

    @Test
    @DisplayName("Optimistic Locking: Đụng độ phiên bản thẻ (Stale Version) ném ConcurrencyConflictException")
    void testConcurrencyConflict_StaleVersion_ThrowsException() {
        // App 101 hiện tại có version = 2, client gửi version = 1 (bị người khác sửa trước)
        MoveApplicationRequest req = new MoveApplicationRequest(
                "stage-interview",
                null,
                null,
                1L,
                null
        );

        assertThrows(ConcurrencyConflictException.class, () ->
                workflowEngine.moveApplication("app-101", req)
        );
    }

    @Test
    @DisplayName("BR-05: Chặn chuyển sang Offer khi chưa có ít nhất 1 Scorecard đã khóa")
    void testGuardRule_OfferWithoutLockedScorecard_ThrowsException() {
        // App 101 ở stage-screening chuyển sang stage-interview rồi thử sang stage-offer
        // App 101 có lockedScorecardsCount = 0
        CandidateApplication app101 = dataStore.findApplicationById("app-101").get();
        app101.setStageId("stage-interview");
        dataStore.saveApplication(app101);

        MoveApplicationRequest req = new MoveApplicationRequest(
                "stage-offer",
                null,
                null,
                app101.getVersion(),
                null
        );

        assertThrows(GuardRuleViolationException.class, () ->
                workflowEngine.moveApplication("app-101", req)
        );
    }

    @Test
    @DisplayName("BR-05: Chuyển sang Offer thành công khi đã có ít nhất 1 Scorecard đã khóa")
    void testGuardRule_OfferWithLockedScorecard_Success() {
        // App 103 ở stage-interview có lockedScorecardsCount = 1
        MoveApplicationRequest req = new MoveApplicationRequest(
                "stage-offer",
                null,
                null,
                3L,
                null
        );

        CandidateApplication result = workflowEngine.moveApplication("app-103", req);
        assertEquals("stage-offer", result.getStageId());
        assertEquals(4L, result.getVersion());
    }
}
