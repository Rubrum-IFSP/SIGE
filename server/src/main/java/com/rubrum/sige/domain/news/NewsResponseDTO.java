package com.rubrum.sige.domain.news;

import java.util.Date;

public record NewsResponseDTO(String id, String title, String content, String authors, Date created_at) {
    public NewsResponseDTO(News news) {
        this(news.getId(), news.getTitle(), news.getContent(), news.getAuthors(), news.getCreated_at());
    }
}
