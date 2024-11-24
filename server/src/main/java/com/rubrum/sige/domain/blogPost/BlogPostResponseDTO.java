package com.rubrum.sige.domain.blogPost;

public record BlogPostResponseDTO(String id, String schoolId, String title, String author, String content) {

    public BlogPostResponseDTO(BlogPost data) {
        this(data.getId(), data.getSchoolId(), data.getTitle(), data.getAuthor(), data.getContent());
    }
}
