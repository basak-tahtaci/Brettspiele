import axios from 'axios';
import type { BoardGame, BoardGameDto } from '../types/BoardGame';

// Basis-URL für alle Endpunkte des BoardGame Controllers
const API_URL = '/api/boardgames';


 // Get, lädt alle Brettspiele aus der Datenbank.
 // @returns Ein Promise das ein Array von BoardGame Objekten geliefert wird
export const getAllBoardGames = (): Promise<BoardGame[]> => {
    return axios.get<BoardGame[]>(API_URL)
        .then(response => response.data); // .then() filtert den Axios-Header/Status heraus und gibt nur die Daten (Payload) zurück
};


//GET: Lädt ein bestimmtes Brettspiel anhand seiner ID
 // @param id Die eindeutige Datenbank ID des Spiels
export const getBoardGameById = (id: string): Promise<BoardGame> => {
    return axios.get<BoardGame>(`${API_URL}/${id}`)
        .then(response => response.data);
};


//POST: Erstellt ein neues Brettspiel im Backend.
// @param boardGameDto - Die Spieldaten ohne ID (da MongoDB die ID generiert).
// @returns Das neu erstellte BoardGame inklusive der vom Backend generierten ID.
export const addBoardGame = (boardGameDto: BoardGameDto): Promise<BoardGame> => {
    return axios.post<BoardGame>(API_URL, boardGameDto)
        .then(response => response.data);
};


// PUT: Aktualisiert ein bestehendes Brettspiel.
// @param id Die ID des zu bearbeitenden Spiels.
// @param boardGameDto Die aktualisierten Spieldaten.
export const updateBoardGame = (id: string, boardGameDto: BoardGameDto): Promise<BoardGame> => {
    return axios.put<BoardGame>(`${API_URL}/${id}`, boardGameDto)
        .then(response => response.data);
};


// DELETE: Löscht ein Brettspiel aus der Datenbank.
// @param id Die ID des zu löschenden Spiels
export const deleteBoardGame = (id: string): Promise<void> => {
    return axios.delete(`${API_URL}/${id}`)
        .then(() => undefined); // Nach erfolgter Löschung geben wir ein leeres void-Ergebnis zurück
};