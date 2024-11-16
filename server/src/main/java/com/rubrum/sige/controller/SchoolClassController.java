package com.rubrum.sige.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.school_class.SchoolClassRepository;
import com.rubrum.sige.domain.school_class.SchoolClassRequestDTO;
import com.rubrum.sige.domain.school_class.SchoolClassResponseDTO;
import com.rubrum.sige.domain.school_class.SchoolClass;
import com.rubrum.sige.domain.school_class.DeleteSchoolClassRequestDTO;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

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
    public ResponseEntity<String> save(@RequestBody SchoolClassRequestDTO data) throws BadRequestException {
        SchoolClass schoolClass = new SchoolClass(data);

        SchoolClass obj = repository.findByName(data.name());

        if (obj != null && obj.getSchoolId().equalsIgnoreCase(data.schoolId())) {
            throw new BadRequestException("classe não adicionada");
        }

        repository.save(schoolClass);
        return ResponseEntity.ok("Classe Adicionada");
    }

    @GetMapping("/get/{name}")
    public ResponseEntity<SchoolClassResponseDTO> getByName(@PathVariable String name) throws BadRequestException {

        SchoolClass obj = repository.findByName(name);
        if (obj == null) {
            throw new BadRequestException("classe não encontrada");
        }
        return ResponseEntity.ok(new SchoolClassResponseDTO(obj));

    }

    @PostMapping("/delete")
    public ResponseEntity<String> removeSchoolClass(@RequestBody DeleteSchoolClassRequestDTO data)
            throws NoSuchElementException {
        SchoolClass schoolClass = repository.findByNameAndSchoolId(data.name(), data.schoolId());

        if (schoolClass == null) {
            throw new NoSuchElementException("schoolclass nao encontrada");
        }

        repository.delete(schoolClass);
        return ResponseEntity.ok().build();

    }

}
