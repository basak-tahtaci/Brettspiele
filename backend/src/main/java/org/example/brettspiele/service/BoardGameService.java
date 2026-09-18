package org.example.brettspiele.service;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.repository.BoardGameRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

// @Service ist die logik in unserem Programm
// Daten werden verarbeitet bevor sie an den Controller weitergegeben werden
@Service
public class BoardGameService {

    private final BoardGameRepository boardGameRepository;

    // Konstruktor für Dependency Injection:

    public BoardGameService(BoardGameRepository boardGameRepository) {
        this.boardGameRepository = boardGameRepository;
    }

    // Methode 1 Alle Brettspiele abrufen
    public List<BoardGame> getAllBoardGames() {
        // Ruft die findAll() Methode des Repositorys auf die alle Dokumente aus der MongoDB liest
        return boardGameRepository.findAll();
    }

    // Methode 2 neues Brettspiel hinzufügen
    public BoardGame addBoardGame(BoardGame boardGame) {
        // Ruft die save() Methode des Repo auf
        return boardGameRepository.save(boardGame);
    }

    // Einzelnes Spiel per ID suchen
    public BoardGame getBoardGameById(String id) {
        return boardGameRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("BoardGame with id " + id + " not found"));
    }

    // Spiel aktualisieren
    public BoardGame updateBoardGame(String id, BoardGame boardGame) {
        BoardGame updatedGame = new BoardGame(
                id,
                boardGame.title(),
                boardGame.minPlayers(),
                boardGame.maxPlayers(),
                boardGame.playTimeMinutes(),
                boardGame.category(),
                boardGame.imageUrl()
        );
        return boardGameRepository.save(updatedGame);
    }

    // Spiel löschen
    public void deleteBoardGame(String id) {
        boardGameRepository.deleteById(id);
    }
}