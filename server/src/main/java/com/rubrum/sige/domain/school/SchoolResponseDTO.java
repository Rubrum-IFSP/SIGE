package com.rubrum.sige.domain.school;

public record SchoolResponseDTO(String name, String palette) {
    public SchoolResponseDTO(School school) {
        this(school.getName(), school.getPalette());
    }
}
