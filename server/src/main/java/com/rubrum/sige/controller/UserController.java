package com.rubrum.sige.controller;

import java.util.List;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.school.SchoolRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRoles;
import com.rubrum.sige.domain.user.User;
import com.rubrum.sige.domain.user.UserRepository;
import com.rubrum.sige.domain.user.UserRequestDTO;
import com.rubrum.sige.domain.user.UserResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository repository;

    @Autowired
    SchoolMemberRepository memberRepository;

    @Autowired
    SchoolRepository schoolRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserRequestDTO data) {
        User user = new User(data);
        repository.save(user);
        return ResponseEntity.ok("usuário criado com sucesso!");
    }

    @GetMapping("/role")
    public ResponseEntity<String> getUserRole(@RequestHeader String userEmail, @RequestHeader String schoolId) {
        SchoolMemberRoles role = SchoolMemberRoles.GUEST;
        User user = repository.findByEmail(userEmail);
        if (user == null)
            return ResponseEntity.badRequest().build();

        SchoolMember member = memberRepository.findBySchoolIdAndUserId(schoolId, user.getId());
        if (member != null)
            role = member.getRole();

        return ResponseEntity.ok(role.toString());
    }

    @GetMapping("/id")
    public ResponseEntity<String> getUserIdByEmail(@RequestParam String email) throws BadRequestException {
        User user = repository.findByEmail(email);
        if (user == null) {
            throw new BadRequestException("usuario nn encontrado");
        }
        return ResponseEntity.ok(user.getId());
    }

    @GetMapping("/getUser")
    public ResponseEntity<UserResponseDTO> getUserById(@RequestParam String id) throws BadRequestException {
        Optional<User> optionalUser = repository.findById(id);

        if (!optionalUser.isPresent()) {
            throw new BadRequestException("no user found");
        }
        User user = optionalUser.get();
        return ResponseEntity.ok(new UserResponseDTO(user));
    }

}
