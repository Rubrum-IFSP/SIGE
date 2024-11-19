package com.rubrum.sige.domain.lession;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LessionRepository extends JpaRepository<Lession, String> {

    public Lession findByTitle(String title);

}
