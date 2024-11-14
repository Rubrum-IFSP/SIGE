package com.rubrum.sige.domain.subject;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, String> {

    public List<Subject> findAllSubjectBySchoolClassId(String id);

    public Subject findByName(String name);
}