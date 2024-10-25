package com.rubrum.sige.domain.event;

import java.util.Date;

public record EventReponseDTO(String name, Date date, String desc) {
    public EventReponseDTO(Event event) {
        this(event.getName(), event.getDate(), event.getDesc());
    }
}
