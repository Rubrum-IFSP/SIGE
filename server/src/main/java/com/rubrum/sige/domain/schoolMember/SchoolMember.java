package com.rubrum.sige.domain.schoolMember;

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

@Table(name = "school_member")
@Entity(name = "school_member")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Validated
public class SchoolMember {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String userId;
    private String schoolId;
    private SchoolMemberRoles role;
    private String data;

    public SchoolMember(String userId, SchoolMemberRoles role, String schoolId, String data) {
        this.userId = userId;
        this.schoolId = schoolId;
        this.role = role;
        this.data = data;
    }

    public SchoolMember(SchoolMemberRequestDTO data) {
        this.userId = data.userId();
        this.schoolId = data.schoolId();
        this.role = data.role();
        this.data = data.data();
    }
}