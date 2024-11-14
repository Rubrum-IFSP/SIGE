package com.rubrum.sige.domain.subject;

public record SubjectResponseDTO(String id, String schoolClassId, String name) {

    public SubjectResponseDTO(Subject obj) {
        this(obj.getId(), obj.getSchoolClassId(), obj.getName());
    }
}