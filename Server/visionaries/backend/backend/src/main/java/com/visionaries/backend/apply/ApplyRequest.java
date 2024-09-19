package com.visionaries.backend.apply;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyRequest {
    private String username;
    private Integer job_id;
    private Integer score;

}
