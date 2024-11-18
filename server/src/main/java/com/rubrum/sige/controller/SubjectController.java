package com.rubrum.sige.controller;

import java.lang.annotation.Repeatable;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.subject.DeleteSubjectRequestDTO;
import com.rubrum.sige.domain.subject.Subject;
import com.rubrum.sige.domain.subject.SubjectRepository;
import com.rubrum.sige.domain.subject.SubjectRequestDTO;
import com.rubrum.sige.domain.subject.SubjectResponseDTO;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Validated
@RestController
@Slf4j
@RequestMapping("/subject")
public class SubjectController {

    @Autowired
    private SubjectRepository repository;

    @GetMapping("/{name}")
    public List<Subject> getAllSubjectBySchoolClassId(@RequestHeader String schoolClassId) throws BadRequestException {

        List<Subject> response = repository.findAllSubjectBySchoolClassId(schoolClassId);

        return response;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveSubject(@RequestBody SubjectRequestDTO data) throws BadRequestException {
        Subject subject = new Subject(data);

        Subject obj = repository.findByName(data.name());

        if (obj != null && obj.getSchoolClassId().equalsIgnoreCase(data.schoolClassId())) {
            throw new BadRequestException("subject nao adicionada");
        }

        repository.save(subject);
        return ResponseEntity.ok("Materia Adicionada");
    }

    @GetMapping("/get/{name}")
    public ResponseEntity<SubjectResponseDTO> getByName(@PathVariable String name) throws BadRequestException {
        Subject obj = repository.findByName(name);

        if (obj == null) {
            throw new BadRequestException("nome nao encontrado");
        }
        return ResponseEntity.ok(new SubjectResponseDTO(obj));
    }

}
