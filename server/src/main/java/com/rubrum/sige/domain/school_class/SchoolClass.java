package com.rubrum.sige.domain.school_class;

import org.springframework.validation.annotation.Validated;

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

@Table(name = "school_class")
@Entity(name = "school_class")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Validated
public class SchoolClass {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String schoolId;
    private String name;

    public SchoolClass(SchoolClassRequestDTO data) {
        this.schoolId = data.schoolId();
        this.name = data.name();
    }

}
