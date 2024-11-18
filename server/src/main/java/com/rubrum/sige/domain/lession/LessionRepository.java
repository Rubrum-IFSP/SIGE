package com.rubrum.sige.domain.lession;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rubrum.sige.domain.subject.Subject;

public interface LessionRepository extends JpaRepository<Subject, String> {

}
