package com.rubrum.sige.domain.school;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolRepository extends JpaRepository<School, String> {
    public School findByName(String name);
}
