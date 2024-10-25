package com.rubrum.sige.domain.event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String> {

    List<Event> findAllBySchoolId(String schoolId);
    
}
