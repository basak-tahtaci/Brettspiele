package org.example.brettspiele.service;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.repository.BoardGameRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service ist die logik in unserem Programm
// Daten werden verarbeitet bevor sie an den Controller weitergegeben werden
@Service
public class BoardGameService {

    private final BoardGameRepository boardGameRepository;

    // Konstruktor für Dependency Injection:
    // Spring Boot erkennt den Konstruktor und übergibt ("injiziert") automatisch das BoardGameRepository.
    public BoardGameService(BoardGameRepository boardGameRepository) {
        this.boardGameRepository = boardGameRepository;
    }

    // Methode 1: Alle Brettspiele abrufen
    public List<BoardGame> getAllBoardGames() {
        // Ruft die findAll() Methode des Repositorys auf die alle Dokumente aus der MongoDB liest
        return boardGameRepository.findAll();
    }

    // Methode 2: Ein neues Brettspiel hinzufügen
    public BoardGame addBoardGame(BoardGame boardGame) {
        // Ruft die save() Methode des Repo auf
        return boardGameRepository.save(boardGame);
    }
}