package com.visionaries.backend.apply;

import com.visionaries.backend.jobs.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplyRepository  extends JpaRepository<Apply,Integer> {
    List<Apply> findAllByJob(Jobs job);
}
