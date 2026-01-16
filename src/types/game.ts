export interface GameState {
    board: Cell[];
    bombs: number;
    revealed: number;
    gameStatus: 'idle' | 'playing' | 'win' | 'lose';
    level: 'easy' | 'medium' | 'hard';
    betPoints: number;
    multiplier: number;
    totalWinnings: number;
    points: number;
}

export interface Cell {
    x: number;
    y: number;
    isBomb: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
}

export interface Position {
    x: number;
    y: number;
}