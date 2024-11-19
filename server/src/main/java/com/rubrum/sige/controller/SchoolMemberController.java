package com.rubrum.sige.controller;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;

import lombok.extern.slf4j.Slf4j;

@Validated
@RestController
@Slf4j
@RequestMapping("/schoolMember")
public class SchoolMemberController {

    @Autowired
    SchoolMemberRepository repository;

    @GetMapping("/getRoles")
    public ResponseEntity<String> getSchoolMemberRoleByUserIdAndSchoolId(@RequestParam String userId,
            @RequestParam String schoolId) throws BadRequestException {
        SchoolMember member = repository.findBySchoolIdAndUserId(schoolId, userId);
        if (member == null) {
            throw new BadRequestException("erro");
        }
        return ResponseEntity.ok(member.getRole().toString());
    }
}
