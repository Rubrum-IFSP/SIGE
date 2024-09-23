package com.rubrum.sige.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRoles;

@Service
public class UserService {
    
    @Autowired
    private SchoolMemberRepository repository;

    public List<SimpleGrantedAuthority> getUserRole(String userId, String schoolId) {
        SchoolMember member = repository.findBySchoolIdAndUserId(schoolId, userId);

        if (member == null) return null;

        SchoolMemberRoles role = member.getRole();

        switch (role) {
            case PROVOST:
                return List.of(new SimpleGrantedAuthority("ROLE_PROVOST"), new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_STUDENT"), new SimpleGrantedAuthority("ROLE_GUEST"));

            case ADMIN:
                return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_STUDENT"), new SimpleGrantedAuthority("ROLE_GUEST"));

            case STUDENT:
                return List.of(new SimpleGrantedAuthority("ROLE_STUDENT"), new SimpleGrantedAuthority("ROLE_GUEST"));

            default:
                return List.of(new SimpleGrantedAuthority("ROLE_GUEST"));
        }
    }
}
