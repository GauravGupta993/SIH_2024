package com.visionaries.backend.jobs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JobResponse {
    private Integer id;
    private String company;
    private String jobType;
    private String stipend;
    private String description;

    private String firstname; // Add firstname here
}
