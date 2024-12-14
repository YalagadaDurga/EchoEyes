package com.example.echoeyes.controllers;

import com.example.echoeyes.models.Issue;
import com.example.echoeyes.repositories.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestParam("title") @NotNull String title,
                                             @RequestParam("description") @NotNull String description,
                                             @RequestParam("latitude") double latitude,
                                             @RequestParam("longitude") double longitude,
                                             @RequestParam(value = "image", required = false) MultipartFile image,
                                             @RequestParam("userEmail") String userEmail) {
        Issue issue = new Issue();
        issue.setTitle(title);
        issue.setDescription(description);
        issue.setLatitude(latitude);
        issue.setLongitude(longitude);

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            issue.setImageUrl(imageUrl);
        }

        Issue savedIssue = issueRepository.save(issue);
        notifyAdmin(savedIssue);
        sendConfirmationEmail(userEmail, savedIssue);
        return ResponseEntity.ok(savedIssue);
    }

    private String saveImage(MultipartFile image) {
        // Implement image saving logic (e.g., to disk or cloud storage)
        return "/images/" + image.getOriginalFilename();
    }

    private void notifyAdmin(Issue issue) {
        String adminEmail = "admin@example.com";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(adminEmail);
        message.setSubject("New Issue Reported: " + issue.getTitle());
        message.setText("Description: " + issue.getDescription() +
                        "\nLocation: [" + issue.getLatitude() + ", " + issue.getLongitude() + "]" +
                        "\nImage: " + issue.getImageUrl());
        mailSender.send(message);
    }

    private void sendConfirmationEmail(String userEmail, Issue issue) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setSubject("Issue Reported: " + issue.getTitle());
        message.setText("Thank you for reporting the issue: " + issue.getTitle() +
                        "\nDescription: " + issue.getDescription() +
                        "\nLocation: [" + issue.getLatitude() + ", " + issue.getLongitude() + "]" +
                        "\nWe will review it shortly.");
        mailSender.send(message);
    }
}
