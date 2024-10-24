package com.rubrum.sige.domain.invite;

import com.rubrum.sige.domain.school.SchoolResponseDTO;
import com.rubrum.sige.domain.user.UserResponseDTO;

public record InviteResponseDTO (SchoolResponseDTO schoolInfo, UserResponseDTO userInfo) {
    
}
