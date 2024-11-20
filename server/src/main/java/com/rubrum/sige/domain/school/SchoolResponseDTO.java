package com.rubrum.sige.domain.school;

public record SchoolResponseDTO(String id, String name) {
    public SchoolResponseDTO(School school) {
        this(school.getId(), school.getName());
    }
}
