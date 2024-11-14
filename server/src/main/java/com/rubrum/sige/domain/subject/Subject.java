package com.rubrum.sige.domain.subject;

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

@Table(name = "subject")
@Entity(name = "subject")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Validated
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String schoolClassId;
    private String name;

    public Subject(SubjectRequestDTO data) {
        this.schoolClassId = data.schoolClassId();
        this.name = data.name();

    }
}
