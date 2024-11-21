package com.rubrum.sige.domain.passwordSchool;

public record PasswordSchoolResponseDTO(String id, String schoolId, String password) {

    public PasswordSchoolResponseDTO(PasswordSchool data) {
        this(data.getId(), data.getSchoolId(), data.getSchoolId());
    }
}
