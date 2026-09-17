package org.example.brettspiele.controller;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.service.BoardGameService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BoardGameControllerTest {

    private final BoardGameService boardGameService = mock(BoardGameService.class);
    private final BoardGameController boardGameController = new BoardGameController(boardGameService);

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
}