package com.visionaries.backend.jobs;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {

    @Autowired
    private JobService jobService;

    // Get all jobs
    @GetMapping
    public List<JobResponse> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Integer id) {
        Optional<JobResponse> job = jobService.getJobById(id);
        return job.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new job
    @PostMapping("/create")
    public ResponseEntity<?> createJob(@RequestBody JobRequest jobRequest) {
         jobService.createJob(jobRequest);
        return ResponseEntity.ok("created");
    }

    // Delete a job by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Integer id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
