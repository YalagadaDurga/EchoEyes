package com.example.echoeyes.services;

import com.example.echoeyes.models.Issue;
import com.example.echoeyes.repositories.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }
}
