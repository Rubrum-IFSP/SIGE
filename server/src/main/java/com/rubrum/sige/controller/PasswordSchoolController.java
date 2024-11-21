package com.rubrum.sige.controller;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.passwordSchool.PasswordSchool;
import com.rubrum.sige.domain.passwordSchool.PasswordSchoolRepository;
import com.rubrum.sige.domain.passwordSchool.PasswordSchoolRequestDTO;
import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRoles;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Validated
@RestController
@Slf4j
@RequestMapping("/password")
public class PasswordSchoolController {

    @Autowired
    PasswordSchoolRepository repository;

    @Autowired
    SchoolMemberRepository memberRepository;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody PasswordSchoolRequestDTO data) throws BadRequestException {

        PasswordSchool passwordSchool = new PasswordSchool(data);

        PasswordSchool obj = repository.findBySchoolId(data.schoolId());

        if (obj != null) {
            throw new BadRequestException("senha não foi criada");
        }
        repository.save(passwordSchool);
        return ResponseEntity.ok(data.password());
    }

    @PostMapping("/enter")
    public ResponseEntity<String> enterSchool(@RequestParam String schoolId, @RequestParam String password,
            @RequestParam String userId)
            throws BadRequestException {
        PasswordSchool obj = repository.findBySchoolId(schoolId);
        if (obj.getPassword().equals(password)) {
            SchoolMember member = new SchoolMember(userId, SchoolMemberRoles.STUDENT, schoolId);
            memberRepository.save(member);
            return ResponseEntity.ok("Sucesso!");

        }
        throw new BadRequestException("algo deu errado");

    }

}
