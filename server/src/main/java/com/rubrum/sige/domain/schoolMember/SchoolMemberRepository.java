package com.rubrum.sige.domain.schoolMember;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolMemberRepository extends JpaRepository<SchoolMember, String> {
    public SchoolMember findBySchoolIdAndUserId(String schoolId, String userId);

    public List<SchoolMember> findAllByUserId(String userId);

    public List<SchoolMember> findAllBySchoolId(String schoolId);
}
