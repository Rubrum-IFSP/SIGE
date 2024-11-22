package com.rubrum.sige.controller;

import java.util.List;
import java.util.NoSuchElementException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.subject.DeleteSubjectRequestDTO;
import com.rubrum.sige.domain.subject.Subject;
import com.rubrum.sige.domain.subject.SubjectRepository;
import com.rubrum.sige.domain.subject.SubjectRequestDTO;
import com.rubrum.sige.domain.subject.SubjectResponseDTO;
import com.rubrum.sige.domain.user.User;
import com.rubrum.sige.domain.user.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Validated
@RestController
@Slf4j
@RequestMapping("/subject")
public class SubjectController {

    @Autowired
    private SubjectRepository repository;

    @Autowired
    private UserRepository userRepository;

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

    @PostMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody DeleteSubjectRequestDTO data) throws NoSuchElementException {
        Subject subject = repository.findByNameAndSchoolClassId(data.name(), data.schoolClassId());
        if (subject == null) {
            throw new NoSuchElementException("subject não encontrada");
        }
        repository.delete(subject);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<SubjectResponseDTO> searchByNameAndSchoolClassId(@RequestParam String name,
            @RequestParam String schoolClassId) throws BadRequestException {
        Subject subject = repository.findByNameAndSchoolClassId(name, schoolClassId);
        if (subject == null) {
            throw new BadRequestException("algo deu errado ");
        }
        return ResponseEntity.ok(new SubjectResponseDTO(subject));
    }

    @GetMapping("/saveProfessor")
    public ResponseEntity<String> updateSubject(@RequestParam String professorId, @RequestParam String subjectName,
            @RequestParam String schoolClassId) throws BadRequestException {
        Subject obj = repository.findByNameAndSchoolClassId(subjectName, schoolClassId);

        if (obj == null)
            throw new BadRequestException("algo deu errado");

        obj.setProfessorId(professorId);
        repository.save(obj);

        return ResponseEntity.ok("deu certo");
    }

    @GetMapping("/getProfessor")
    public ResponseEntity<String> getProfessorBySubjectNameAndSchoolClassId(@RequestParam String subjectName,
            @RequestParam String schoolClassId) throws BadRequestException {

        String response = repository.findByNameAndSchoolClassId(subjectName, schoolClassId).getProfessorId();
        User user = userRepository.findById(response).get();

        if (user == null)
            throw new BadRequestException("algo deu errado");

        return ResponseEntity.ok(user.getEmail());
    }

}
