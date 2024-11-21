package com.rubrum.sige.domain.passwordSchool;

import org.springframework.validation.annotation.Validated;

import jakarta.annotation.Generated;
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

@Table(name = "passwordSchool")
@Entity(name = "passwordSchool")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Validated
public class PasswordSchool {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String schoolId;
    private String password;

    public PasswordSchool(PasswordSchoolRequestDTO data) {
        this.schoolId = data.schoolId();
        this.password = data.password();
    }
}
