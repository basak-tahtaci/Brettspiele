export type BoardGame = {
    id: string;
    title: string;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    category: string;
    imageUrl: string;
};

export type BoardGameDto = Omit<BoardGame, 'id'>;
// dto wird exact wie boardgame erstellt nur ohne id, mit Omit bekommt  dto alles was in boardgame hinzugefügt wird