package org.example.brettspiele.controller;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.service.BoardGameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

// @RequestMapping legt die Basis-URL für alle Endpunkte in dieser Klasse fest
// Alle Anfragen an http://localhost:8080/api/boardgames landen in diesem Controller.
@RequestMapping("/api/boardgames")
public class BoardGameController {

    private final BoardGameService boardGameService;

    // Dependency Injection: Spring Boot injiziert den BoardGameService über den Konstruktor.
    public BoardGameController(BoardGameService boardGameService) {
        this.boardGameService = boardGameService;
    }

    // GET /api/boardgames
    // Holt die Liste aller Brettspiele ab.
    @GetMapping
    public List<BoardGame> getAllBoardGames() {
        return boardGameService.getAllBoardGames();
    }

    // POST /api/boardgames
    // Erstellt ein neues Brettspiel.
    // @RequestBody wandelt die JSON Daten aus dem Request Body automatisch in ein Java Objekt um.
    @PostMapping
    public BoardGame addBoardGame(@RequestBody BoardGame boardGame) {
        return boardGameService.addBoardGame(boardGame);
    }
}