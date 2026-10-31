package com.ats.hybrid.modules.workflow.controller;

import com.ats.hybrid.modules.workflow.domain.CandidateApplication;
import com.ats.hybrid.modules.workflow.dto.MoveApplicationRequest;
import com.ats.hybrid.modules.workflow.service.WorkflowEngine;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/applications")
public class ApplicationWorkflowController {

    private final WorkflowEngine workflowEngine;

    public ApplicationWorkflowController(WorkflowEngine workflowEngine) {
        this.workflowEngine = workflowEngine;
    }

    /**
     * Flow FLOW-05: Move card on Kanban
     * - Validates stage transition matrix (BR-01)
     * - Enforces optimistic locking (@Version)
     * - Checks guard conditions (BR-05)
     * - Computes LexoRank (BR-03)
     */
    @PatchMapping("/{id}/move")
    public ResponseEntity<CandidateApplication> moveApplication(
            @PathVariable String id,
            @Valid @RequestBody MoveApplicationRequest request) {
        CandidateApplication updated = workflowEngine.moveApplication(id, request);
        return ResponseEntity.ok(updated);
    }
}
