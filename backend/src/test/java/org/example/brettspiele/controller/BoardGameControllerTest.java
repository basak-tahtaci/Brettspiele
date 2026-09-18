package org.example.brettspiele.controller;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.service.BoardGameService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BoardGameControllerTest {

    private final BoardGameService boardGameService = mock(BoardGameService.class);
    private final BoardGameController boardGameController = new BoardGameController(boardGameService);

    @Test
    void getAllBoardGames_shouldReturnListOfBoardGames() {
        // GIVEN
        BoardGame game = new BoardGame("1", "Catan", 3, 4, 10, "https://example.com/image.jpg", "Strategie");
        when(boardGameService.getAllBoardGames()).thenReturn(List.of(game));

        // WHEN
        List<BoardGame> actual = boardGameController.getAllBoardGames();

        // THEN
        assertEquals(List.of(game), actual);
        verify(boardGameService).getAllBoardGames();
    }

    @Test
    void addBoardGame_shouldReturnCreatedBoardGame() {
        // GIVEN

        BoardGame newGame = new BoardGame("1", "Catan", 3, 4, 60, "Kosmos", "https://example.com/image.jpg");
        when(boardGameService.addBoardGame(newGame)).thenReturn(newGame);

        // WHEN
        BoardGame actual = boardGameController.addBoardGame(newGame);

        // THEN
        assertEquals(newGame, actual);
        verify(boardGameService).addBoardGame(newGame);
    }

    @Test
    void getBoardGameById_shouldReturnBoardGame() {
        // GIVEN
        BoardGame game = new BoardGame("1", "Catan", 3, 4, 60, "Kosmos", "https://example.com/image.jpg");
        when(boardGameService.getBoardGameById("1")).thenReturn(game);

        // WHEN
        BoardGame actual = boardGameController.getBoardGameById("1");

        // THEN
        assertEquals(game, actual);
        verify(boardGameService).getBoardGameById("1");
    }

    @Test
    void updateBoardGame_shouldReturnUpdatedBoardGame() {
        // GIVEN
        BoardGame updatedGame = new BoardGame("1", "Catan", 3, 4, 90, "Kosmos", "https://example.com/image.jpg");
        when(boardGameService.updateBoardGame("1", updatedGame)).thenReturn(updatedGame);

        // WHEN
        BoardGame actual = boardGameController.updateBoardGame("1", updatedGame);

        // THEN
        assertEquals(updatedGame, actual);
        verify(boardGameService).updateBoardGame("1", updatedGame);
    }

    @Test
    void deleteBoardGame_shouldCallService() {
        // GIVEN
        String idToDelete = "1";

        // WHEN
        boardGameController.deleteBoardGame(idToDelete);

        // THEN
        verify(boardGameService).deleteBoardGame(idToDelete);
    }
}