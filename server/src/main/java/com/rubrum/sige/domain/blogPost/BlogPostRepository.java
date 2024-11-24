package com.rubrum.sige.domain.blogPost;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepository extends JpaRepository<BlogPost, String> {

    public List<BlogPost> findAllBySchoolId(String schoolId);
}