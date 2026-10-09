import {useEffect, useState} from 'react';
import type {BoardGame, BoardGameDto} from '../types/BoardGame';

type BoardGameFormProps = {
    // funktion zum speichern, sendet das dto an app.tsx
    onAddGame: (gameDto: BoardGameDto) => void;
    // Das aktuell zu bearbeitende Spiel oder null wenn ein neues Spiel erstellt wird
    editingGame: BoardGame | null;
    // Funktion um den Bearbeitungsmodus abzubrechen
    onCancelEdit: () => void;
};

// übergabeparameter speicher funktion und edit. BoardGameFormProps: props objekt von elternkomponente
export function BoardGameForm({ onAddGame, editingGame, onCancelEdit }: BoardGameFormProps) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [minPlayers, setMinPlayers] = useState(1);
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [playTime, setPlayTime] = useState(60);
    const [imageUrl, setImageUrl] = useState('');

    // useEffect reagiert auf Änderungen von editingGame
    // Wenn ein Spiel zum Bearbeiten ausgewählt wird füllen wir die Eingabefelder
    useEffect(() => {
        if (editingGame) {
            setTitle(editingGame.title);
            setCategory(editingGame.category);
            setMinPlayers(editingGame.minPlayers);
            setMaxPlayers(editingGame.maxPlayers);
            setPlayTime(editingGame.playTime);
            setImageUrl(editingGame.imageUrl || '');
        } else {
            // Wenn kein Spiel bearbeitet wird oder nach dem Speichern wird Formular zurücksetzen
            resetForm();
        }
    }, [editingGame]); // teilt react mit, führen den code im useffekt nur dann wenn sich editinggame ändert

    // Hilfsfunktion zum Zurücksetzen aller Felder
    const resetForm = () => {
        setTitle('');
        setCategory('');
        setMinPlayers(1);
        setMaxPlayers(4);
        setPlayTime(60);
        setImageUrl('');
    };

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
        resetForm();
    };

    return (
        <form
            // wird ausgelöst sobald spiel/änderung speichern geklickt wird
            onSubmit={(e) => {
                // hindert den browser neu zu laden (standard verhalten)
                e.preventDefault();
                // speichert/übergibt die neue daten und leert das formular
                handleSubmit();
            }}
            style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            {/* Dynamische Überschrift je nach Modus */}
            <h3>{editingGame ? 'Brettspiel bearbeiten' : 'Neues Brettspiel hinzufügen'}</h3>

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

            {/* Dynamischer Beschriftungstext für den Submit Button */}
            <button type="submit">
                {editingGame ? 'Änderungen speichern' : 'Spiel speichern'}
            </button>

            {/* Abbrechen Button wird nur im Bearbeitungsmodus angezeigt */}
            {editingGame && (
                <button type="button" onClick={onCancelEdit} style={{ marginLeft: '10px' }}>
                    Abbrechen
                </button>
            )}
        </form>
    );
}