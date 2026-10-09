import { useState } from 'react';
import type { BoardGameDto } from '../types/BoardGame';

type BoardGameFormProps = {
    onAddGame: (gameDto: BoardGameDto) => void;
};

// übergabeparameter speicher funktion. BoardGameFormProps: props objekt von elternkomponente
export function BoardGameForm({ onAddGame }: BoardGameFormProps) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [minPlayers, setMinPlayers] = useState(1);
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [playTime, setPlayTime] = useState(60);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = () => {

        // gibt die felder an onaddgame weiter
        onAddGame({
            title,
            category,
            minPlayers,
            maxPlayers,
            playTime,
            imageUrl,
        });

        // Formular felder leeren
        setTitle('');
        setCategory('');
        setMinPlayers(1);
        setMaxPlayers(4);
        setPlayTime(60);
        setImageUrl('');
    };

    return (
        <form
            // wird ausgelöst sobald spiel speichern geklickt wird
            onSubmit={(e) => {
                // hindert den browser neu zu laden (standard verhalten)
                e.preventDefault();
                // speichert/übergibt die neue daten und leert das formular
                handleSubmit();
            }}
            style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Neues Brettspiel hinzufügen</h3>

            <div style={{ marginBottom: '10px' }}>
                <label>Titel: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Kategorie: </label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Min. Spieler: </label>
                <input type="number" value={minPlayers} onChange={(e) => setMinPlayers(Number(e.target.value))} min={1} required />

                <label style={{ marginLeft: '15px' }}>Max. Spieler: </label>
                <input type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))} min={1} required />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Spieldauer (Minuten): </label>
                <input type="number" value={playTime} onChange={(e) => setPlayTime(Number(e.target.value))} min={1} required />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Bild-URL: </label>
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            </div>

            <button type="submit">Spiel speichern</button>
        </form>
    );
}