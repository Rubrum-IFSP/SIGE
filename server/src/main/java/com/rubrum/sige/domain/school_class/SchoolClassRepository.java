package com.rubrum.sige.domain.school_class;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, String> {

    public List<SchoolClass> findAllBySchoolId(String id);

    public SchoolClass findByName(String name);

}
