package com.visionaries.backend.posts;

import com.visionaries.backend.config.JwtService;
import com.visionaries.backend.user.User;
import com.visionaries.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    // Get all posts
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .map(post -> new PostResponse(
                        post.getId(),
                        post.getBody(),
                        post.getUser().getFirstname()
                )).collect(Collectors.toList());
    }

    // Get post by ID
    public Optional<PostResponse> getPostById(Integer id) {
        return postRepository.findById(id)
                .map(post -> new PostResponse(
                        post.getId(),
                        post.getBody(),
                        post.getUser().getFirstname()
                ));
    }

    // Create a new post
    public Post createPost(PostRequest postRequest) {
        // Find user by username
        User user = userRepository.findByEmail( jwtService.extractUsername(postRequest.getUsername())).get();


        Post post = new Post();
        post.setBody(postRequest.getBody());
        post.setUser(user);

        return postRepository.save(post);
    }

    // Delete a post by ID
    public void deletePost(Integer id) {
        postRepository.deleteById(id);
    }
}
