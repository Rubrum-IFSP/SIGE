package com.rubrum.sige.domain.passwordSchool;

import org.springframework.validation.annotation.Validated;

import jakarta.persistence.Column;
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

@Table(name = "password_school")
@Entity(name = "password_school")
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

    @Column(name = "school_id")
    private String schoolId;
    @Column(name = "school_password")
    private String schoolPassword;

    public PasswordSchool(PasswordSchoolRequestDTO data) {
        this.schoolId = data.schoolId();
        this.schoolPassword = data.schoolPassword();
    }
}
