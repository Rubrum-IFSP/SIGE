package com.rubrum.sige.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.event.DeleteEventRequestDTO;
import com.rubrum.sige.domain.event.EditEventRequestDTO;
import com.rubrum.sige.domain.event.Event;
import com.rubrum.sige.domain.event.EventReponseDTO;
import com.rubrum.sige.domain.event.EventRepository;
import com.rubrum.sige.domain.event.EventRequestDTO;

@RestController
@RequestMapping("school/event")
@Validated
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveEvent(@RequestBody EventRequestDTO data) {
        Event event = new Event(data);
        eventRepository.save(event);
        return ResponseEntity.ok("Evento adicionado com sucesso!");
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editEvent(@RequestBody EditEventRequestDTO data) {
        Event event = eventRepository.findById(data.id()).get();
        event.setName(data.name());
        event.setDesc(data.desc());
        event.setDate(data.date());
        eventRepository.save(event);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/delete")
    public ResponseEntity<String> removeEvent(@RequestBody DeleteEventRequestDTO data) {
        Event event = eventRepository.findById(data.eventId()).get();
        eventRepository.delete(event);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<EventReponseDTO> getSchoolEvents(@RequestHeader String schoolId) {
        return eventRepository.findAllBySchoolId(schoolId).stream().map(EventReponseDTO::new).toList();
    }

    @GetMapping("/all")
    public List<EventReponseDTO> getEvents() {
        List<Event> events = eventRepository.findAll();
        List<EventReponseDTO> resp = List.of();

        for (Event event : events) {
            resp.add(new EventReponseDTO(event));
        }

        return resp;
    }
}
