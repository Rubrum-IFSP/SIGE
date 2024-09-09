package com.rubrum.sige.domain.schoolMember;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolMemberRepository extends JpaRepository<SchoolMember, String> {
    public SchoolMember findBySchoolIdAndUserId(String schoolId, String userId);
}
