package com.rubrum.sige.domain.lession;

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

@Table(name = "lession")
@Entity(name = "lession")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Validated
public class Lession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "subject_id")
    private String subjectId;

    @Column(name = "title")
    private String title;

    @Column(name = "desc")
    private String desc;

    public Lession(LessionRequestDTO data) {
        this.subjectId = data.subjectId();
        this.title = data.title();
        this.desc = data.desc();
    }
}
