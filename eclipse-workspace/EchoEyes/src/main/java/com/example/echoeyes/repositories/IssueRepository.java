package com.example.echoeyes.repositories;

import com.example.echoeyes.models.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Long> {
}
