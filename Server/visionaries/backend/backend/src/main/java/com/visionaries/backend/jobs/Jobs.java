package com.visionaries.backend.jobs;

import com.visionaries.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Jobs {
    @Id
    @GeneratedValue
    private  Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    public User user;
    private String company;
    private String job_type;
    private String stipend;
    private String description;



}
