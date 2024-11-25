package com.rubrum.sige.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRequestDTO;

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

    @GetMapping("/getMembers/class")
    public List<SchoolMember> getAllMembersBySchoolClass(@RequestParam String schoolId,
            @RequestParam String schoolClassName) {

        List<SchoolMember> list = repository.findAllBySchoolIdAndData(schoolId, schoolClassName);

        return list;

    }

    @GetMapping("/getMembers")
    public List<SchoolMember> getSchoolMembersBySchoolId(@RequestParam String schoolId) throws BadRequestException {
        List<SchoolMember> list = repository.findAllBySchoolId(schoolId);

        return list;

    }

    @PostMapping("/update")
    public ResponseEntity<String> updateMember(@RequestBody SchoolMemberRequestDTO data) throws BadRequestException {

        SchoolMember obj = repository.findBySchoolIdAndUserId(data.schoolId(), data.userId());

        if (obj == null)
            throw new BadRequestException("algo deu errado");

        obj.setRole(data.role());
        obj.setData(data.data());

        repository.save(obj);

        return ResponseEntity.ok("deu certo");

    }

    @GetMapping("/searchClass")
    public ResponseEntity<String> getMemberClassByUserId(@RequestParam String userId, @RequestParam String schoolId)
            throws BadRequestException {

        String res = repository.findBySchoolIdAndUserId(schoolId, userId).getData();

        if (res == null)
            throw new BadRequestException("algo deu errado");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/searchTeachers")
    public List<SchoolMember> getAllTeachersBySchoolId(@RequestParam String schoolId) throws BadRequestException {

        List<SchoolMember> list = repository.findAllBySchoolId(schoolId);

        if (list.isEmpty())
            throw new BadRequestException("algo deu errado");

        List<SchoolMember> copy = new ArrayList<>();

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getRole().getRole().equals("PROFESSOR")) {
                copy.add(list.get(i));
            }
        }
        System.out.println(copy);

        return copy;
    }

    @GetMapping("/delete")
    public ResponseEntity<String> deletByUserIdAndSchoolId(@RequestParam String userId, @RequestParam String schoolId)
            throws BadRequestException {

        SchoolMember member = repository.findBySchoolIdAndUserId(schoolId, userId);

        if (member == null)
            throw new BadRequestException("algo deu errado");

        repository.deleteById(member.getId());

        return ResponseEntity.ok("deu certo");
    }

}
