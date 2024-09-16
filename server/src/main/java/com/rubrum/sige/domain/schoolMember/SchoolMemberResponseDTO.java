package com.rubrum.sige.domain.schoolMember;

public record SchoolMemberResponseDTO(String role) {
    public SchoolMemberResponseDTO(SchoolMember member) {
        this(member.getRole().toString());
    }    
}
