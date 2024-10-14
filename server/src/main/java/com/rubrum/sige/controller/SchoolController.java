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
import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMemberResponseDTO;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRoles;
import com.rubrum.sige.domain.user.User;
import com.rubrum.sige.domain.user.UserRepository;
import com.rubrum.sige.infra.security.TokenService;
import com.rubrum.sige.domain.school.SchoolRequestDTO;

import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("school")
public class SchoolController {
    
    @Autowired
    private SchoolRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolMemberRepository memberRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody @Valid SchoolRequestDTO data, @RequestHeader("Authorization") String token) {
        var email = tokenService.validateToken(token.replace("Bearer ", ""));
        User user = userRepository.findByEmail(email);

        if (user == null) return ResponseEntity.badRequest().build();
        
        School school = new School(data);
        repository.save(school);

        String schoolId = repository.findByName(school.getName()).getId();
        SchoolMember member = new SchoolMember(user.getId(), SchoolMemberRoles.PROVOST, schoolId);
        memberRepository.save(member);
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

    @PostMapping("/invite/create/{schoolName}")
    public void generateSchoolInvite(@PathVariable String schoolName) {
        School school = repository.findByName(schoolName);
        if (school == null) return;

        
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

    @GetMapping("/member") 
    public List<SchoolMemberResponseDTO> getMembers() {
        List<SchoolMemberResponseDTO> memberList = memberRepository.findAll().stream().map(SchoolMemberResponseDTO::new).toList();
        return memberList;
    }

    @GetMapping("/user/{email}")
    public List<SchoolResponseDTO> getSchoolsByUserEmail(@PathVariable String email) throws BadRequestException {
        User user = userRepository.findByEmail(email);
        if (user == null) throw new BadRequestException("usuario não encontrado.");

        List<SchoolMember> userMembers = memberRepository.findAllByUserId(user.getId());
        List<SchoolResponseDTO> response = List.of();

        for (SchoolMember schoolMember : userMembers) {
            School school = repository.findById(schoolMember.getSchoolId()).get();
            SchoolResponseDTO dto = new SchoolResponseDTO(school);
            response.add(dto);
        }

        return response;
    }
}
