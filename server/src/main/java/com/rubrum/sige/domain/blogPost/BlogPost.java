package com.rubrum.sige.domain.blogPost;

import org.springframework.validation.annotation.Validated;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "blog_post")
@Entity(name = "blog_post")
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Validated
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String schoolId;

    private String title;

    private String author;

    private String content;

    public BlogPost(BlogPostRequestDTO data) {
        this.schoolId = data.schoolId();
        this.title = data.title();
        this.author = data.author();
        this.content = data.content();
    }
}
