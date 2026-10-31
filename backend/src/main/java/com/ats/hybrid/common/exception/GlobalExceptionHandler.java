package com.ats.hybrid.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setTitle("Resource Not Found");
        problem.setType(URI.create("https://ats.hybrid/errors/not-found"));
        problem.setProperty("resourceName", ex.getResourceName());
        problem.setProperty("resourceId", ex.getResourceId());
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(InvalidWorkflowTransitionException.class)
    public ProblemDetail handleInvalidTransition(InvalidWorkflowTransitionException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage());
        problem.setTitle("Invalid Workflow Transition (BR-01)");
        problem.setType(URI.create("https://ats.hybrid/errors/invalid-transition"));
        problem.setProperty("fromStageId", ex.getFromStageId());
        problem.setProperty("toStageId", ex.getToStageId());
        problem.setProperty("rule", "BR-01");
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(ConcurrencyConflictException.class)
    public ProblemDetail handleConcurrencyConflict(ConcurrencyConflictException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
        problem.setTitle("Concurrency Conflict (Optimistic Locking)");
        problem.setType(URI.create("https://ats.hybrid/errors/concurrency-conflict"));
        problem.setProperty("entityId", ex.getEntityId());
        problem.setProperty("expectedVersion", ex.getExpectedVersion());
        problem.setProperty("actualVersion", ex.getActualVersion());
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(GuardRuleViolationException.class)
    public ProblemDetail handleGuardRuleViolation(GuardRuleViolationException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage());
        problem.setTitle("Guard Condition Violation (BR-05)");
        problem.setType(URI.create("https://ats.hybrid/errors/guard-violation"));
        problem.setProperty("stageId", ex.getStageId());
        problem.setProperty("guardRule", ex.getGuardRule());
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(ValidationException.class)
    public ProblemDetail handleValidation(ValidationException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage());
        problem.setTitle("Validation Error");
        problem.setType(URI.create("https://ats.hybrid/errors/validation-error"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed for request arguments");
        problem.setTitle("Validation Failed");
        problem.setType(URI.create("https://ats.hybrid/errors/bad-request"));
        problem.setProperty("fieldErrors", errors);
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneralException(Exception ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        problem.setTitle("Internal Server Error");
        problem.setType(URI.create("https://ats.hybrid/errors/internal-error"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }
}
