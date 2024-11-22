package com.rubrum.sige.domain.subject;

public record SubjectResponseDTO(String id, String schoolClassId, String name, String professorId) {

    public SubjectResponseDTO(Subject obj) {
        this(obj.getId(), obj.getSchoolClassId(), obj.getName(), obj.getProfessorId());
    }
}