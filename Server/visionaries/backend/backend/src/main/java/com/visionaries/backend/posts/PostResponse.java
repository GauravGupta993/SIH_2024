package com.visionaries.backend.posts;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostResponse {
    private Integer id;
    private String body;
    private String username;
}
