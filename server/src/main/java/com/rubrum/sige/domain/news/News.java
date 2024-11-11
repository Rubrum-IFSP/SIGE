package com.rubrum.sige.domain.news;

import java.sql.Date;

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

    private String school_id;
    private String news_type;
    private String title;
    private String content;
    private String autors;
    private Date created_at;

    public News(NewsRequestDTO data) {
        this.school_id = data.school_id();
        this.news_type = data.news_type();
        this.title = data.title();
        this.content = data.content();
        this.autors = data.autors();
    }

    public void update(NewsUpdateRequestDTO data) {
        this.title = data.title();
        this.content = data.content();
        this.autors = data.autors();
    }
}