package com.visionaries.backend.posts;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {

    private String body;
    private  String username;
}
