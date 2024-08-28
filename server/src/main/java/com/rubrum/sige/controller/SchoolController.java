package com.rubrum.sige.controller;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.school.School;
import com.rubrum.sige.domain.school.SchoolRepository;
import com.rubrum.sige.domain.school.SchoolResponseDTO;
import com.rubrum.sige.domain.school.SchoolRequestDTO;

import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("school")
public class SchoolController {
    
    @Autowired
    private SchoolRepository repository;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody @Valid SchoolRequestDTO data) {
        School school = new School(data);
        repository.save(school);
        return ResponseEntity.ok("escola criada com sucesso!");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody String name) {
        School school = repository.findByName(name);
        repository.delete(school);
        return ResponseEntity.ok("escola excluída com sucesso.");
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody @Valid SchoolRequestDTO data, @RequestHeader String name) {
        School school = new School(data);
        school.setId(repository.findByName(name).getId());

        repository.save(school);
        return ResponseEntity.ok("escola editada com sucesso.");
    }

    @GetMapping
    public List<SchoolResponseDTO> getAll() {
        List<SchoolResponseDTO> schoolList = repository.findAll().stream().map(SchoolResponseDTO::new).toList();
        return schoolList;
    }

    @GetMapping("/{name}")
    public ResponseEntity<SchoolResponseDTO> getByName(@PathVariable String name) throws BadRequestException {
        School school = repository.findByName(name);
        if (school == null) {
            throw new BadRequestException("nome não encontrado.");
        }
        return ResponseEntity.ok(new SchoolResponseDTO(school));
    }
}
