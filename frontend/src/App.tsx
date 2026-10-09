import { useEffect, useState } from 'react';
import type { BoardGame, BoardGameDto} from './types/BoardGame';
import { getAllBoardGames, addBoardGame, deleteBoardGame } from './api/boardGameService';
import { BoardGameList } from './components/BoardGameList';
import { BoardGameForm } from './components/BoardGameForm';
import './App.css';

export function App() {
    const [boardGames, setBoardGames] = useState<BoardGame[]>([]);
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

    // wenn formular abgesendet wird, wird diese speicher funktion aufgerufen
    const handleAddGame = (newGameDto: BoardGameDto) => {
        addBoardGame(newGameDto)
            .then((createdGame) => {
                // Das vom Backend zurückgegebene Spiel (inkl. neuer ID) zur Liste hinzufügen
                setBoardGames((prevGames) => [...prevGames, createdGame]);
            })
            .catch((err) => {
                console.error('Fehler beim Speichern des Spiels:', err);
                alert('Das Spiel konnte nicht gespeichert werden.');
            });
    };

    // Löschen Handler
    const handleDeleteGame = (id: string) => {
        deleteBoardGame(id)
            .then(() => {
                // Spiel aus dem React-State herausfiltern, damit es sofort aus der Anzeige verschwindet
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
                    onDeleteGame={handleDeleteGame}/>
            )}

            {/* Formular zum Erstellen */}
            <BoardGameForm onAddGame={handleAddGame} />

            {/* Ladeanzeige und Fehlerbehandlung */}
            {loading && <p>Lade Brettspiele...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}


        </div>
    );
}

export default App;