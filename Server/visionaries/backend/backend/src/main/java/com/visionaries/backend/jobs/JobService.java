package com.visionaries.backend.jobs;

import com.visionaries.backend.config.JwtService;
import com.visionaries.backend.user.User;
import com.visionaries.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobsRepository jobRepository;
    @Autowired
    private  JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    // Get all jobs
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(job -> new JobResponse(
                        job.getId(),
                        job.getCompany(),
                        job.getJob_type(),
                        job.getStipend(),
                        job.getDescription(),

                        job.getUser().getFirstname() // Add firstname here
                )).collect(Collectors.toList());
    }

    // Get job by ID
    public Optional<JobResponse> getJobById(Integer id) {
        return jobRepository.findById(id)
                .map(job -> new JobResponse(
                        job.getId(),
                        job.getCompany(),
                        job.getJob_type(),
                        job.getStipend(),
                        job.getDescription(),
                        job.getUser().getFirstname() // Add firstname here
                ));
    }

    // Create a new job
    public void createJob(JobRequest jobRequest) {
        // Find user by username
        User user = userRepository.findByEmail( jwtService.extractUsername(jobRequest.getUsername())).get();
        user.setJob(user.getJob()+1);

        Jobs job = new Jobs();
        job.setCompany(jobRequest.getCompany());
        job.setJob_type(jobRequest.getJob_type());
        job.setStipend(jobRequest.getStipend());
        job.setDescription(jobRequest.getDescription());
        job.setUser(user);

         jobRepository.save(job);
    }

    // Delete a job by ID
    public void deleteJob(Integer id) {
        jobRepository.deleteById(id);
    }
}
