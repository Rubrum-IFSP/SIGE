package com.rubrum.sige.domain.user;

import java.util.Optional;

public record UserResponseDTO(String name, String email) {
    public UserResponseDTO(User user) {
        this(user.getName(), user.getEmail());
    }

}
