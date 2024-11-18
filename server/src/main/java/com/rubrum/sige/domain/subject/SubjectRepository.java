package com.rubrum.sige.domain.subject;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SubjectRepository extends JpaRepository<Subject, String> {

    public List<Subject> findAllSubjectBySchoolClassId(String id);

    public Subject findByName(String name);

    public Subject findByNameAndSchoolClassId(String name, String schoolClassId);
}