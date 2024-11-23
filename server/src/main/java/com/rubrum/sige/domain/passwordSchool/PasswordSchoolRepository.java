package com.rubrum.sige.domain.passwordSchool;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PasswordSchoolRepository extends JpaRepository<PasswordSchool, String> {

    public PasswordSchool findBySchoolId(String schoolId);

}