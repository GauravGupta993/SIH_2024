package com.visionaries.backend.apply;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyResponse {
    private Integer id;
    private String name;
    private Boolean ref;
    private Integer score;
}
