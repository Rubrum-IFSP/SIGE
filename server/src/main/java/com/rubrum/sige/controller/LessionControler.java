package com.rubrum.sige.controller;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.lession.Lession;
import com.rubrum.sige.domain.lession.LessionRepository;
import com.rubrum.sige.domain.lession.LessionRequestDTO;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Validated
@RestController
@Slf4j
@RequestMapping("/lession")
public class LessionControler {

    @Autowired
    LessionRepository repository;

    @PostMapping("/save")
    public ResponseEntity<String> saveLession(@RequestBody LessionRequestDTO data) throws BadRequestException {
        Lession lession = new Lession(data);

        Lession obj = repository.findByTitle(data.title());

        if (obj != null && obj.getSubjectId().equalsIgnoreCase(data.subjectId())) {
            throw new BadRequestException("já existe uma lição com esse nome");
        }
        repository.save(lession);
        return ResponseEntity.ok("lição adicionada");

    }

}
