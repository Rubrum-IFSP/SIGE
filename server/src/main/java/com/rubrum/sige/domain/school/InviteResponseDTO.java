package com.rubrum.sige.domain.school;

import com.rubrum.sige.domain.user.UserResponseDTO;

public record InviteResponseDTO (SchoolResponseDTO schoolInfo, UserResponseDTO userInfo) {
    
}
