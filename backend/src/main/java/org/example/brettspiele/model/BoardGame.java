package org.example.brettspiele.model;

import org.springframework.data.annotation.Id;

public record BoardGame(
        @Id
        String id,
        String title,
        int minPlayers,
        int maxPlayers,
        int playTimeMinutes,
        String category,
        String imageUrl
) {
}
