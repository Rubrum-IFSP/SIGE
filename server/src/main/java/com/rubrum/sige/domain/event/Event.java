package com.rubrum.sige.domain.event;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "calendary_event")
@Entity(name = "calendary_event")
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Validated
public class Event {

    @NotBlank
    @NotNull
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date date;

    private String desc;

    @NotBlank
    @NotNull
    private String name;

    @NotBlank
    @NotNull
    @Column(name = "school_id")
    private String schoolId;

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    public Event(@Valid EventRequestDTO data) {
        this.schoolId = data.schoolId();
        this.name = data.name();
        this.date = new Date();
        this.desc = data.desc();
    }
}
