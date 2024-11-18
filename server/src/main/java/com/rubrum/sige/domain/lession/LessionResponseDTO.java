package com.rubrum.sige.domain.lession;

public record LessionResponseDTO(String id, String subjectId, String title, String desc) {

    public LessionResponseDTO(Lession data) {
        this(data.getId(), data.getSubjectId(), data.getTitle(), data.getDesc());
    }

}
