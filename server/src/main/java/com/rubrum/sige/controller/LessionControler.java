package com.rubrum.sige.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.lession.DeleteLessionRequestDTO;
import com.rubrum.sige.domain.lession.Lession;
import com.rubrum.sige.domain.lession.LessionRepository;
import com.rubrum.sige.domain.lession.LessionRequestDTO;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @GetMapping("/get")
    public List<Lession> getAllLessionBySubjectId(@RequestParam String subjectId) {
        List<Lession> list = repository.findAllBySubjectId(subjectId);

        return list;
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestBody DeleteLessionRequestDTO data) throws NoSuchElementException {

        Lession lession = repository.findByTitle(data.title());

        if (lession == null) {
            throw new NoSuchElementException("LESSION NOT FOUND");
        }
        repository.delete(lession);

        return ResponseEntity.ok().build();
    }

}
