package org.example.brettspiele.service;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.repository.BoardGameRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BoardGameServiceTest {

    private final BoardGameRepository boardGameRepository = mock(BoardGameRepository.class);

    // Service mit  gefakten Repository erstellen
    private final BoardGameService boardGameService = new BoardGameService(boardGameRepository);

    @Test
    void getAllBoardGames_shouldReturnListOfGames() {
        // GIVEN
        BoardGame game = new BoardGame("1", "Die Burgen von Burgund", 1, 4, 120, "Strategie", "");
        when(boardGameRepository.findAll()).thenReturn(List.of(game));

        // WHEN
        List<BoardGame> actual = boardGameService.getAllBoardGames();

        // THEN
        List<BoardGame> expected = List.of(game);
        assertEquals(expected, actual);
        verify(boardGameRepository).findAll(); // Prüft, ob das Mock-Repo aufgerufen wurde
    }

    @Test
    void addBoardGame_shouldSaveAndReturnGame() {
        // GIVEN
        BoardGame gameToSave = new BoardGame(null, "Catan", 3, 4, 90, "Strategie", "catan.jpg");
        BoardGame savedGame = new BoardGame("123", "Catan", 3, 4, 90, "Strategie", "catan.jpg");

        when(boardGameRepository.save(gameToSave)).thenReturn(savedGame);

        // WHEN
        BoardGame actual = boardGameService.addBoardGame(gameToSave);

        // THEN
        assertEquals(savedGame, actual);
        verify(boardGameRepository).save(gameToSave);
    }
}