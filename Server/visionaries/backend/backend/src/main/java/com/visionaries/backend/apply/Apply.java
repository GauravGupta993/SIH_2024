package com.visionaries.backend.apply;

import com.visionaries.backend.jobs.Jobs;
import com.visionaries.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Apply {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer score;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    public User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id")
    public Jobs job;
    private Boolean ref=false;

}
