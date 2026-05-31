package com.portfolio.controller;

import com.portfolio.dto.ContactRequest;
import com.portfolio.dto.ContactResponse;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> submitContact(@Valid @RequestBody ContactRequest request) {
        try {
            contactService.sendContactEmail(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ContactResponse("Thank you for reaching out. I will get back to you soon."));
        } catch (MailException ex) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(new ContactResponse("Unable to send message at this time. Please try again later."));
        }
    }
}
