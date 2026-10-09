import type { BoardGame } from '../types/BoardGame';
import { BoardGameCard } from './BoardGameCard';

// Typ definition für Props, die Komponente erwartet ein Array von boardgame Objekten
type BoardGameListProps = {
    boardGames: BoardGame[];
    onDeleteGame: (id: string) => void;
};

// hier wird eine list der Brettspiele gerendert
export const BoardGameList = ({ boardGames, onDeleteGame}: BoardGameListProps) => {
    // Wenn das Array leer ist wird ein Hinweis angezeigt
    if (boardGames.length === 0) {
        return <p className="no-games">Keine Brettspiele in der Sammlung vorhanden.</p>;
    }

    return (
        <div className="board-game-list">
            {/* map durchläuft jedes Element im Array und wandelt es in boardgame card um */}
            {/* key ist um elemente eindeutig zu identifizieren */}
            {boardGames.map((game) => (
                <BoardGameCard
                    key={game.id}
                    boardGame={game}
                    onDelete={onDeleteGame}
                />
            ))}
        </div>
    );
};