package com.rubrum.sige.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.invite.InviteRequestDTO;
import com.rubrum.sige.domain.invite.InviteResponseDTO;
import com.rubrum.sige.domain.invite.JoinSchoolRequestDTO;
import com.rubrum.sige.domain.school.School;
import com.rubrum.sige.domain.school.SchoolRepository;
import com.rubrum.sige.domain.school.SchoolResponseDTO;
import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRoles;
import com.rubrum.sige.domain.user.User;
import com.rubrum.sige.domain.user.UserRepository;
import com.rubrum.sige.domain.user.UserResponseDTO;
import com.rubrum.sige.infra.security.TokenService;
import com.rubrum.sige.services.InviteService;

@RestController
@RequestMapping("/invite")
@Validated
public class InviteController {

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolMemberRepository memberRepository;

    @Autowired
    private InviteService inviteService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/create")
    public ResponseEntity<String> generateSchoolInvite(@RequestBody InviteRequestDTO data) {
        School school = schoolRepository.findById(data.schoolId()).get();
        if (school == null)
            return ResponseEntity.badRequest().build();

        String invite = inviteService.generateInvite(school, data.userEmail());
        return ResponseEntity.ok(invite);
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinSchool(@RequestBody JoinSchoolRequestDTO data,
            @RequestHeader String Authorization) {
        String schoolId = inviteService.validateInvite(data.invite());

        try {
            String userEmail = tokenService.validateToken(tokenService.recoverToken(Authorization));
            User user = userRepository.findByEmail(userEmail);
            if (user == null) {
                throw new Exception("Usuario não encontrado.");
            }

            School school = schoolRepository.findById(schoolId).get();
            if (school == null) {
                throw new Exception("Escola não encontrada.");
            }

            if (memberRepository.findBySchoolIdAndUserId(school.getId(), user.getId()) != null) {
                throw new MemberAlreadyExistsException("O usuário já está registrado nesta escola.");
            }

            SchoolMember member = new SchoolMember(user.getId(), SchoolMemberRoles.STUDENT, school.getId(), null);
            memberRepository.save(member);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate/{invite}")
    public ResponseEntity<InviteResponseDTO> validateSchoolInvite(@PathVariable String invite) {
        var schoolId = inviteService.validateInvite(invite);
        if (schoolId == null)
            return ResponseEntity.badRequest().build();

        School school = schoolRepository.findById(schoolId).get();
        if (school == null)
            return ResponseEntity.badRequest().build();

        String userEmail = inviteService.getSenderEmail(invite);
        User sender = userRepository.findByEmail(userEmail);

        SchoolResponseDTO schoolInfo = new SchoolResponseDTO(school);
        UserResponseDTO userInfo = new UserResponseDTO(sender);

        return ResponseEntity.ok(new InviteResponseDTO(schoolInfo, userInfo));
    }

    private class MemberAlreadyExistsException extends Exception {
        public MemberAlreadyExistsException(String message) {
            super(message);
        }
    }
}
