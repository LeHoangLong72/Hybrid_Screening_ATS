package com.ats.hybrid.modules.workflow;

import com.ats.hybrid.common.exception.ValidationException;
import com.ats.hybrid.modules.workflow.domain.JobOpening;
import com.ats.hybrid.modules.workflow.domain.ScoringCriterion;
import com.ats.hybrid.modules.workflow.dto.CreateJobOpeningRequest;
import com.ats.hybrid.modules.workflow.repository.MockDataStore;
import com.ats.hybrid.modules.workflow.service.JobOpeningService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JobOpeningServiceTest {

    private MockDataStore dataStore;
    private JobOpeningService jobOpeningService;

    @BeforeEach
    void setUp() {
        dataStore = new MockDataStore();
        jobOpeningService = new JobOpeningService(dataStore);
    }

    @Test
    @DisplayName("BR-04: Tạo Job Opening với tổng trọng số Rubric = 100% thành công")
    void testCreateJob_RubricSum100_Success() {
        CreateJobOpeningRequest req = new CreateJobOpeningRequest();
        req.setTitle("Frontend Lead Engineer");
        req.setDepartment("UI/UX Engineering");
        req.setLocation("Hà Nội");
        req.setMinWorkExpMonths(36);
        req.setMaxSalary(50000000.0);
        req.setPipelineTemplateId("pipe-tech-standard");

        List<ScoringCriterion> rubric = Arrays.asList(
                new ScoringCriterion("r1", "React & Next.js", "Deep knowledge", 50.0),
                new ScoringCriterion("r2", "TypeScript & State Management", "Clean architecture", 30.0),
                new ScoringCriterion("r3", "CSS & Responsive Design", "Modern styling", 20.0)
        );
        req.setRubric(rubric);

        JobOpening job = jobOpeningService.createJobOpening(req);

        assertNotNull(job.getId());
        assertEquals("Frontend Lead Engineer", job.getTitle());
        assertEquals(3, job.getRubric().size());
    }

    @Test
    @DisplayName("BR-04: Tạo Job Opening với tổng trọng số Rubric != 100% bị từ chối")
    void testCreateJob_RubricSumNot100_ThrowsException() {
        CreateJobOpeningRequest req = new CreateJobOpeningRequest();
        req.setTitle("Junior Developer");
        req.setPipelineTemplateId("pipe-tech-standard");

        // Tổng chỉ có 80%
        List<ScoringCriterion> rubric = Arrays.asList(
                new ScoringCriterion("r1", "Core Java", "OOP fundamentals", 50.0),
                new ScoringCriterion("r2", "SQL Basics", "Queries", 30.0)
        );
        req.setRubric(rubric);

        ValidationException ex = assertThrows(ValidationException.class, () ->
                jobOpeningService.createJobOpening(req)
        );

        assertTrue(ex.getMessage().contains("100%"));
    }
}
