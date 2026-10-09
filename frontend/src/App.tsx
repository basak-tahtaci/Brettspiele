import { useEffect, useState } from 'react';
import type { BoardGame, BoardGameDto} from './types/BoardGame';
import { getAllBoardGames, addBoardGame, updateBoardGame, deleteBoardGame } from './api/boardGameService';
import { BoardGameList } from './components/BoardGameList';
import { BoardGameForm } from './components/BoardGameForm';
import './App.css';

export function App() {
    //State für die Liste aller geladenen Spiele
    const [boardGames, setBoardGames] = useState<BoardGame[]>([]);

    // State für das Spiel das aktuell bearbeitet wird, null = kein Spiel im Bearbeitungsmodus
    const [editingGame, setEditingGame] = useState<BoardGame | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // hier wird beim laden der Seite einmalig die Spiele vom Backend abrufen
    useEffect(() => {
        getAllBoardGames()
            .then((data) => {
                setBoardGames(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fehler beim Laden:', err);
                setError('Konnte die Brettspiele nicht vom Server laden.');
                setLoading(false);
            });
    }, []);

    // Speichern Handler; Entscheidet anhand von editingGame ob bearbeitet oder erstellt wird
    const handleSaveGame = (gameDto: BoardGameDto) => {
        if (editingGame) {
            // Bearbeitungsmodus, Spiel im Backend mit der ID aktualisieren
            updateBoardGame(editingGame.id, gameDto)
                .then((updatedGame) => {
                    // Das aktualisierte Spiel in der React Liste ersetzen
                    setBoardGames((prevGames) =>
                        prevGames.map((game) => (game.id === editingGame.id ? updatedGame : game))
                    );
                    // Bearbeitungsmodus beenden (Formular wieder leeren)
                    setEditingGame(null);
                })
                .catch((err) => {
                    console.error('Fehler beim Aktualisieren des Spiels:', err);
                    alert('Das Spiel konnte nicht aktualisiert werden.');
                });
        } else {
            // Erstellen, Neues Spiel im Backend anlegen
            addBoardGame(gameDto)
                .then((createdGame) => {
                    // Das vom Backend zurückgegebene Spiel zur Liste hinzufügen
                    setBoardGames((prevGames) => [...prevGames, createdGame]);
                })
                .catch((err) => {
                    console.error('Fehler beim Speichern des Spiels:', err);
                    alert('Das Spiel konnte nicht gespeichert werden.');
                });
        }
    };

    // Löschen Handler
    const handleDeleteGame = (id: string) => {
        deleteBoardGame(id)
            .then(() => {
                // Spiel aus dem React State herausfiltern damit es sofort aus der Anzeige verschwindet
                setBoardGames((prevGames) => prevGames.filter((game) => game.id !== id));
            })
            .catch((err) => {
                console.error('Fehler beim Löschen des Spiels:', err);
                alert('Das Spiel konnte nicht gelöscht werden.');
            });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Meine Brettspiel-Sammlung</h1>

            {/* Spieleliste wird gerendert, handledelete wird an boardgamelist übergeben, reicht an einzelne cards weiter und löschen funktioniert */}
            {!loading && !error && (
                <BoardGameList
                    boardGames={boardGames}
                    onDeleteGame={handleDeleteGame}
                    onEditGame={(game) => {
                        setEditingGame(game);
                        // Scrollt nach unten zum Formular
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                />
            )}

            {/* Formular zum Erstellen und bearbeiten */}
            <BoardGameForm
                onAddGame={handleSaveGame}
                editingGame={editingGame}
                onCancelEdit={() => setEditingGame(null)}
            />

            {/* Ladeanzeige und Fehlerbehandlung */}
            {loading && <p>Lade Brettspiele...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}


        </div>
    );
}

export default App;