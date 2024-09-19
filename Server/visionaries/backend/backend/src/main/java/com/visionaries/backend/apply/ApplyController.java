package com.visionaries.backend.apply;

import com.visionaries.backend.config.JwtService;
import com.visionaries.backend.jobs.JobRequest;
import com.visionaries.backend.jobs.Jobs;
import com.visionaries.backend.jobs.JobsRepository;
import com.visionaries.backend.user.User;
import com.visionaries.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/apply")
@RequiredArgsConstructor
public class ApplyController {
    @Autowired
    ApplyRepository applyRepository;
    @Autowired
    JobsRepository jobsRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody ApplyRequest request) {
        Apply apply=new Apply();
        apply.setUser(userRepository.findByEmail( jwtService.extractUsername(request.getUsername())).get());
        apply.setJob(jobsRepository.findById(request.getJob_id()).get());
        apply.setRef(false);
        apply.setScore(request.getScore());
        applyRepository.save(apply);
        return ResponseEntity.ok("applied");

    }
    @GetMapping("/ref/{id}")
    public ResponseEntity<?> ref(@PathVariable Integer id){
        Apply apply= applyRepository.findById(id).get();
        apply.setRef(true);
        User user=   apply.getJob().getUser();
        user.setRefer(user.getRefer()+1);
        userRepository.save(user);
        applyRepository.save(apply);
        return ResponseEntity.ok("reffered");
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<List<ApplyResponse>>all(@PathVariable Integer id){
        List<Apply> L1=applyRepository.findAllByJob(jobsRepository.findById(id).get());
        List<ApplyResponse>L2= new ArrayList<>();
        for( int i=0;i<L1.size();i++){
            ApplyResponse ar =new ApplyResponse(L1.get(i).getId(),L1.get(i).user.getFirstname(),L1.get(i).getRef(),L1.get(i).getScore());

            L2.add(ar);

        }
        return ResponseEntity.ok(L2);
    }
}
