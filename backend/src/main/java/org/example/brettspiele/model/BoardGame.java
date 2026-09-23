package org.example.brettspiele.model;

import org.springframework.data.annotation.Id;

// record ist ein spezieller Java Typ für Datenbehälter
public record BoardGame(
        //signalisiert, dass eindeutige Primärschlüssel ist
        @Id
        String id,
        String title,
        int minPlayers,
        int maxPlayers,
        int playTime,
        String category,
        String imageUrl
) {
}

//todo später eventuell verlag hinzufügen
