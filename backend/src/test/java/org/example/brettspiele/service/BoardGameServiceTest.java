package org.example.brettspiele.service;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.model.BoardGameDto;
import org.example.brettspiele.repository.BoardGameRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

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
        BoardGameDto dto = new BoardGameDto("Catan", 3, 4, 90, "Strategie", "catan.jpg");
        BoardGame gameToSave = new BoardGame(null, "Catan", 3, 4, 90, "Strategie", "catan.jpg");
        BoardGame savedGame = new BoardGame("123", "Catan", 3, 4, 90, "Strategie", "catan.jpg");

        when(boardGameRepository.save(gameToSave)).thenReturn(savedGame);

        // WHEN
        BoardGame actual = boardGameService.addBoardGame(dto);

        // THEN
        assertEquals(savedGame, actual);
        verify(boardGameRepository).save(gameToSave);
    }

    @Test
    void getBoardGameById_shouldReturnBoardGame_whenIdExists() {
        // GIVEN
        BoardGame game = new BoardGame("1", "Die Burgen von Burgund", 1, 4, 120, "Strategie", "");
        when(boardGameRepository.findById("1")).thenReturn(Optional.of(game));

        // WHEN
        BoardGame actual = boardGameService.getBoardGameById("1");

        // THEN
        assertEquals(game, actual);
        verify(boardGameRepository).findById("1");
    }

    @Test
    void updateBoardGame_shouldReturnUpdatedGame() {
        // GIVEN
        BoardGameDto dto = new BoardGameDto("Die Burgen von Burgund", 1, 4, 150, "Strategie", "");
        BoardGame gameToUpdate = new BoardGame("1", "Die Burgen von Burgund", 1, 4, 150, "Strategie", "");
        when(boardGameRepository.save(gameToUpdate)).thenReturn(gameToUpdate);

        // WHEN
        BoardGame actual = boardGameService.updateBoardGame("1", dto);

        // THEN
        assertEquals(gameToUpdate, actual);
        verify(boardGameRepository).save(gameToUpdate);
    }

    @Test
    void deleteBoardGame_shouldCallRepository() {
        // GIVEN
        String idToDelete = "1";

        // WHEN
        boardGameService.deleteBoardGame(idToDelete);

        // THEN
        verify(boardGameRepository).deleteById(idToDelete);
    }
}