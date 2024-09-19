package com.visionaries.backend.posts;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
public class PostController {

    @Autowired
    private PostService postService;

    // Get all posts
    @GetMapping("/all")
    public List<PostResponse> getAllPosts() {
        return postService.getAllPosts();
    }

    // Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Integer id) {
        Optional<PostResponse> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new post
    @PostMapping("/create")
    public ResponseEntity<String> createPost(@RequestBody PostRequest postRequest) {

        Post newPost = postService.createPost(postRequest);
        System.out.println("working create");
        return ResponseEntity.ok("okkk");
    }

    // Delete a post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Integer id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
