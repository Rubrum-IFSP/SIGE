package com.rubrum.sige.domain.news;

import java.util.Date;

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

@Table(name = "news")
@Entity(name = "news")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Validated
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String schoolId;
    private String newsType;
    private String title;
    private String content;
    private String authors;
    private Date created_at;

    public News(NewsRequestDTO data) {
        this.schoolId = data.schoolId();
        this.newsType = data.newsType();
        this.title = data.title();
        this.content = data.content();
        this.authors = data.authors();
        this.created_at = new Date();
    }

    public void update(NewsUpdateRequestDTO data) {
        this.title = data.title();
        this.content = data.content();
        this.authors = data.authors();
    }
}