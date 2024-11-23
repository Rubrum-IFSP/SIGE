package com.rubrum.sige.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.faq_message.FaqMessage;
import com.rubrum.sige.domain.faq_message.FaqMessageRepository;
import com.rubrum.sige.domain.faq_message.FaqMessageRequestDTO;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Validated
@Slf4j
@RestController
@RequestMapping("/faqMessage")
public class FaqMessageController {

    @Autowired
    FaqMessageRepository repository;

    @PostMapping("save")
    public ResponseEntity<String> save(@RequestBody FaqMessageRequestDTO data) {

        FaqMessage msg = new FaqMessage(data);

        repository.save(msg);

        return ResponseEntity.ok("msg adicionada");

    }

}
