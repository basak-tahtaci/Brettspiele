package org.example.brettspiele.model;

public record BoardGameDto(
        String title,
        int minPlayers,
        int maxPlayers,
        int playTime,
        String category,
        String imageUrl
) {
}
