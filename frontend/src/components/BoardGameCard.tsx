import type { BoardGame } from '../types/BoardGame';

// die Komponente erwartet ein Array von boardgame Objekten
type BoardGameCardProps = {
    boardGame: BoardGame;
    onDelete: (id: string) => void;
    onEdit: (game: BoardGame) => void; // Callback Funktion um das gewählte Spiel zu bearbeiten
};

// Cards komponente um ein Brettspiel anzuzeigen, ondelete löscht
export const BoardGameCard = ({ boardGame, onDelete, onEdit }: BoardGameCardProps) => {
    return (
        <div className="board-game-card">
            {boardGame.imageUrl ? (
                <img
                    src={boardGame.imageUrl}
                    alt={boardGame.title}
                    className="board-game-image"
                />
            ) : (
                <div className="board-game-image-placeholder">Kein Bild</div>
            )}

            <div className="board-game-info">
                <h3>{boardGame.title}</h3>
                <span className="category">{boardGame.category}</span>

                <div className="details">
                    <span>👥 {boardGame.minPlayers} - {boardGame.maxPlayers} Spieler</span>
                    <span>⏱️ {boardGame.playTime} Min.</span>
                </div>

                {/* Button zum bearbeiten, übergibt das gesamte Spiel Objekt an die übergeordnete Komponente */}
                <button
                    onClick={() => onEdit(boardGame)}
                    style={{
                        marginTop: '12px',
                        padding: '6px 12px',

                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >✏️</button>

                <button
                    onClick={() => onDelete(boardGame.id)}
                    style={{
                        marginTop: '12px',
                        padding: '6px 12px',

                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >🗑️</button>
            </div>
        </div>
    );
};