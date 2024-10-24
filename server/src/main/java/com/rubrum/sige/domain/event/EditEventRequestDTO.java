package com.rubrum.sige.domain.event;

import java.util.Date;

public record EditEventRequestDTO(String id, String name, Date date, String desc) {

}
