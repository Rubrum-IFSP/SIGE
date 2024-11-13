package com.rubrum.sige.controller;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.school_class.SchoolClassRepository;
import com.rubrum.sige.domain.school_class.SchoolClassRequestDTO;
import com.rubrum.sige.domain.school_class.SchoolClass;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Validated
@RestController
@Slf4j
@RequestMapping("/schoolClass")
public class SchoolClassController {

    @Autowired
    private SchoolClassRepository repository;

    @GetMapping("/{name}")
    public List<SchoolClass> getAllBySchoolId(@RequestHeader String schoolId) throws BadRequestException {
        List<SchoolClass> schoolClass = repository.findAllBySchoolId(schoolId);

        return schoolClass;
    }

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody SchoolClassRequestDTO data) {
        SchoolClass schoolClass = new SchoolClass(data);
        repository.save(schoolClass);
        return ResponseEntity.ok("Classe Adicionada");
    }

}
