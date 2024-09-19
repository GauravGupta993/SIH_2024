package com.visionaries.backend.jobs;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    private String company;
    private String job_type;
    private String stipend;
    private String description;
    private  String username;
}
