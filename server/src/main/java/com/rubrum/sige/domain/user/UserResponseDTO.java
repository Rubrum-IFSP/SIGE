package com.rubrum.sige.domain.user;

public record UserResponseDTO(String name, String email) {
    public UserResponseDTO(User user) {
        this(user.getName(), user.getEmail());
    }

}
