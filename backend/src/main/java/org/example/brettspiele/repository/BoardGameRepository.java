package org.example.brettspiele.repository;

import org.example.brettspiele.model.BoardGame;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

// ist für den Datenbankzugriff zuständig
@Repository
// MongoRepository stellt uns automatisch Datenbankoperationen CRUD bereit
public interface BoardGameRepository extends MongoRepository<BoardGame, String> {
}