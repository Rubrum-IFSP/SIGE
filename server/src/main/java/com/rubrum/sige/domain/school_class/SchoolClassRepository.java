package com.rubrum.sige.domain.school_class;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, String> {

    public List<SchoolClass> findAllBySchoolId(String id);

    public SchoolClass findByName(String name);

    public SchoolClass findByNameAndSchoolId(String name, String schoolId);

    @Modifying
    @Transactional
    @Query("DELETE FROM school_class sc  WHERE sc.name = :name AND sc.schoolId = :schoolId")
    public void deleteAllSchoolClassByNameAndSchoolId(String name, String schoolId);

}
