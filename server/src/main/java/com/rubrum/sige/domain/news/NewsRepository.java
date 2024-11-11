package com.rubrum.sige.domain.news;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, String> {
    public List<News> findAllBySchoolId(String schoolId);
}
