package com.rubrum.sige.domain.news;

import java.sql.Date;

public record NewsResponseDTO(String id, String title, String content, String autors, Date created_at) {
    public NewsResponseDTO(News news) {
        this(news.getId(), news.getTitle(), news.getContent(), news.getAutors(), news.getCreated_at());
    }
}
