package com.rubrum.sige.domain.school_class;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.micrometer.common.lang.NonNull;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, String> {

    public List<SchoolClass> findAllBySchoolId(String id);

}
