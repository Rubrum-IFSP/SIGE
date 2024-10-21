package com.rubrum.sige.domain.school;

public record SchoolResponseDTO(String id, String name, String palette) {
    public SchoolResponseDTO(School school) {
        this(school.getId(), school.getName(), school.getPalette());
    }
}
