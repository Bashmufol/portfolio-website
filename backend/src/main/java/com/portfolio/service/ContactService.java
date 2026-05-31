package com.portfolio.service;

import com.portfolio.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final JavaMailSender mailSender;
    private final String mailTo;
    private final String mailFrom;

    public ContactService(
            JavaMailSender mailSender,
            @Value("${portfolio.mail.to}") String mailTo,
            @Value("${portfolio.mail.from}") String mailFrom) {
        this.mailSender = mailSender;
        this.mailTo = mailTo;
        this.mailFrom = mailFrom;
    }

    public void sendContactEmail(ContactRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailTo);
        message.setFrom(mailFrom);
        message.setReplyTo(request.email());
        message.setSubject("[Portfolio Contact] " + request.subject());
        message.setText(buildBody(request));
        mailSender.send(message);
    }

    private String buildBody(ContactRequest request) {
        return """
                New portfolio contact form submission

                Name: %s
                Email: %s
                Subject: %s

                Message:
                %s
                """.formatted(request.name(), request.email(), request.subject(), request.message());
    }
}
