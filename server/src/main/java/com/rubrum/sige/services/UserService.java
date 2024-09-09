package com.rubrum.sige.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rubrum.sige.domain.schoolMember.SchoolMember;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRepository;
import com.rubrum.sige.domain.schoolMember.SchoolMemberRoles;

@Service
public class UserService {
    
    @Autowired
    private SchoolMemberRepository repository;

    public SchoolMemberRoles getUserRole(String userId, String schoolId) {
        SchoolMember member = repository.findBySchoolIdAndUserId(schoolId, userId);
        return member.getRole();
    }
}
