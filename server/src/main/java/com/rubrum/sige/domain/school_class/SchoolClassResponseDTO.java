package com.rubrum.sige.domain.school_class;

public record SchoolClassResponseDTO(String id, String name, String schoolId) {

    public SchoolClassResponseDTO(SchoolClass schoolClass) {
        this(schoolClass.getId(), schoolClass.getName(), schoolClass.getSchoolId());
    }
}
