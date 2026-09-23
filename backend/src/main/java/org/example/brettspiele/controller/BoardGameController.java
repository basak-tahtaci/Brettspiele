package org.example.brettspiele.controller;

import org.example.brettspiele.model.BoardGame;
import org.example.brettspiele.model.BoardGameDto;
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
    public BoardGame addBoardGame(@RequestBody BoardGameDto boardGameDto) {
        return boardGameService.addBoardGame(boardGameDto);
    }

    // get anfrage
    // Liest ein einzelnes Spiel anhand ID
    @GetMapping("/{id}")
    public BoardGame getBoardGameById(@PathVariable String id)
    // @PathVariable liest den dynamischen Wert aus der URL  zb /123 und übergibt ihn an den Parameter id
    {
        return boardGameService.getBoardGameById(id);
    }

    // put anfrage
    // aktualisiert die Daten eines bestehenden spiels
    @PutMapping("/{id}")
    public BoardGame updateBoardGame(
            // @PathVariable liefert die ID des zu aktualisierenden Spiels aus der URl
            @PathVariable String id,
            // @RequestBody wandelt den json aus dem request body automatisch in ein Java Objekt um
            @RequestBody BoardGameDto boardGameDto
    ) {
        return boardGameService.updateBoardGame(id, boardGameDto);
    }

    // delete Anfrage
    // Löscht ein Spiel anhand seiner ID
    @DeleteMapping("/{id}")
    public void deleteBoardGame(
            // @PathVariable liefert die ID des zu löschenden Spiels aus der URL
            @PathVariable String id
    ) {
        boardGameService.deleteBoardGame(id);
    }


}