package com.rubrum.sige.domain.schoolMember;

public enum SchoolMemberRoles {
    PROVOST("PROVOST"),
    ADMIN("ADMIN"),
    STUDENT("STUDENT"),
    GUEST("GUEST");

    private String role;

    SchoolMemberRoles(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
