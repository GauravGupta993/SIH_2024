package com.visionaries.backend.posts;

import com.visionaries.backend.user.User;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Post {
    @Id
    @GeneratedValue
    private Integer id;
    private String body;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    public User user;
}

