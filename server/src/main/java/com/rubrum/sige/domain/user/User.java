package com.rubrum.sige.domain.user;

import org.springframework.validation.annotation.Validated;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users", uniqueConstraints= @UniqueConstraint(columnNames={"email"}))
@Entity(name = "users")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Validated
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull(message = "o nome precisa ser preenchido.")
    @NotBlank(message = "o nome precisa ser preenchido.")
    private String name;

    @NotNull(message = "o email precisa ser preenchido.")
    @NotBlank(message = "o email precisa ser preenchido.")
    private String email;

    @NotNull(message = "a senha precisa ser preenchida.")
    @NotBlank(message = "a senha precisa ser preenchida.")
    private String password;

    public User(UserRequestDTO data) {
        this.name = data.name();
        this.email = data.email();
        this.password = data.password();
    }
}
