package com.rubrum.sige.domain.faq_message;

import org.springframework.validation.annotation.Validated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "faq_message")
@Entity(name = "faq_message")
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Validated
public class FaqMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String senderId;
    private String message;

    public FaqMessage(FaqMessageRequestDTO data) {
        this.senderId = data.senderId();
        this.message = data.message();
    }
}
