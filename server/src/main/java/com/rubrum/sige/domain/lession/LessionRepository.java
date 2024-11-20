package com.rubrum.sige.domain.lession;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessionRepository extends JpaRepository<Lession, String> {

    public Lession findByTitle(String title);

    public List<Lession> findAllBySubjectId(String subjectId);

}
