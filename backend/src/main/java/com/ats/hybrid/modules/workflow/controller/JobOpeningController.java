package com.ats.hybrid.modules.workflow.controller;

import com.ats.hybrid.modules.workflow.domain.CandidateApplication;
import com.ats.hybrid.modules.workflow.domain.JobOpening;
import com.ats.hybrid.modules.workflow.dto.CreateJobOpeningRequest;
import com.ats.hybrid.modules.workflow.dto.JobDetailResponse;
import com.ats.hybrid.modules.workflow.repository.MockDataStore;
import com.ats.hybrid.modules.workflow.service.JobOpeningService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobOpeningController {

    private final JobOpeningService jobOpeningService;
    private final MockDataStore dataStore;

    public JobOpeningController(JobOpeningService jobOpeningService, MockDataStore dataStore) {
        this.jobOpeningService = jobOpeningService;
        this.dataStore = dataStore;
    }

    @GetMapping
    public ResponseEntity<List<JobOpening>> getAllJobs() {
        return ResponseEntity.ok(jobOpeningService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDetailResponse> getJobDetail(@PathVariable String id) {
        return ResponseEntity.ok(jobOpeningService.getJobDetail(id));
    }

    @PostMapping
    public ResponseEntity<JobOpening> createJob(@Valid @RequestBody CreateJobOpeningRequest request) {
        JobOpening createdJob = jobOpeningService.createJobOpening(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    @GetMapping("/{id}/applications")
    public ResponseEntity<List<CandidateApplication>> getJobApplications(@PathVariable String id) {
        // Ensure job exists
        jobOpeningService.getJobDetail(id);
        List<CandidateApplication> apps = dataStore.findApplicationsByJobId(id);
        return ResponseEntity.ok(apps);
    }
}
