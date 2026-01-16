import React, {useState, useCallback, useEffect} from 'react';
import CanvasBoard from './CanvasBoard';
import GameControls from './GameControls';
import '../styles/mines.css';
import type {Cell, GameState} from "../types/game.ts";
import GameHeader from "./GameHeader.tsx";
import {useAudioControl} from "../Hooks/useSound.ts";

const GRID_SIZE = 5;


const MinesGame: React.FC = () => {

    const INITIAL_STATE: GameState = {
        board: [],
        bombs: 3,
        revealed: 0,
        gameStatus: 'idle',
        level: 'medium',
        betPoints: 10,
        multiplier: 1.00,
        totalWinnings: 0,
        points: 200
    };
    const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
    const [showAllCells, setShowAllCells] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const {playSound}=useAudioControl(isMuted,true);


    const getBombsCount = useCallback((level: string): number => {
        switch (level) {
            case 'easy':
                return 4;
            case 'medium':
                return 6;
            case 'hard':
                return 8;
            default:
                return 3;
        }
    }, []);

    const initializeBoard = useCallback((): Cell[] => {
        const totalCells = GRID_SIZE * GRID_SIZE;
        const bombsCount = getBombsCount(gameState.level);
        const board: Cell[] = [];

        // Create empty board
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                board.push({
                    x,
                    y,
                    isBomb: false,
                    isRevealed: false,
                    isFlagged: false
                });
            }
        }

        // Place bombs randomly
        let bombsPlaced = 0;
        while (bombsPlaced < bombsCount) {
            const randomIndex = Math.floor(Math.random() * totalCells);
            if (!board[randomIndex].isBomb) {
                board[randomIndex].isBomb = true;
                bombsPlaced++;
            }
        }

        return board;
    }, [gameState.level, getBombsCount]);

    const startGame = useCallback(() => {
        if (gameState.points < gameState.betPoints) return;

        const newBoard = initializeBoard();

        setGameState(prev => ({
            ...prev,
            board: newBoard,
            gameStatus: 'playing',
            revealed: 0,
            multiplier: 1.00,
            totalWinnings: 0,
            points: prev.points - prev.betPoints // Deduct bet points from points
        }));

        setShowAllCells(false);
        playSound('betClickSnd');
    }, [gameState.points, gameState.betPoints, initializeBoard, playSound]);

    const resetToIdleState = useCallback(() => {
        const newBoard = initializeBoard();
        setGameState(prev => ({
            ...prev,
            board: newBoard,
            gameStatus: 'idle',
            revealed: 0,
            multiplier: 1.00
        }));
        setShowAllCells(false);
    }, [initializeBoard]);

    const revealCell = useCallback((cellIndex: number) => {
        if (gameState.gameStatus !== 'playing' || showAllCells) return;

        setGameState(prev => {
            const newBoard = [...prev.board];
            const cell = newBoard[cellIndex];

            if (cell.isRevealed || cell.isFlagged) return prev;

            cell.isRevealed = true;
            const newRevealed = prev.revealed + 1;

            let newGameStatus = prev.gameStatus;
            let newMultiplier = prev.multiplier;
            let newTotalWinnings = prev.totalWinnings;
            let newPoints = prev.points;

            if (cell.isBomb) {
                newGameStatus = 'lose';
                newTotalWinnings = 0;
                setShowAllCells(true);
                playSound('bombClickSnd');
                setTimeout(() => {
                    resetToIdleState();
                }, 2000);

            } else {
                const bombsCount = getBombsCount(prev.level);
                const safeCells = (GRID_SIZE * GRID_SIZE) - bombsCount;
                const risk = newRevealed / safeCells;

                const baseMultiplier = prev.level === 'easy' ? 1.2 : prev.level === 'medium' ? 1.5 : 2.0;
                newMultiplier = Number((baseMultiplier * (1 + risk)).toFixed(2));
                playSound('cellSelectSnd');

                if (newRevealed === safeCells) {
                    newGameStatus = 'win';
                    newTotalWinnings = prev.betPoints * newMultiplier;
                    newPoints = prev.points + newTotalWinnings;

                    setShowAllCells(true);

                    setTimeout(() => {
                        resetToIdleState();
                    }, 2000);
                }
            }

            return {
                ...prev,
                board: newBoard,
                revealed: newRevealed,
                gameStatus: newGameStatus,
                multiplier: newMultiplier,
                totalWinnings: newTotalWinnings,
                points: newPoints
            };
        });
    }, [gameState.gameStatus, showAllCells, playSound, resetToIdleState, getBombsCount]);

    const cashOut = useCallback(() => {
        if (gameState.gameStatus !== 'playing' || gameState.revealed === 0) return;

        const winnings = gameState.betPoints * gameState.multiplier;

        setShowAllCells(true);
        playSound('cashOutClickSnd');
        setTimeout(() => {
            setGameState(prev => {
                const newBoard = initializeBoard();
                return {
                    ...prev,
                    board: newBoard,
                    gameStatus: 'idle',
                    revealed: 0,
                    multiplier: 1.00,
                    totalWinnings: winnings,
                    points: prev.points + winnings
                };
            });
            setShowAllCells(false);
        }, 2000);

    }, [gameState.gameStatus, gameState.revealed, gameState.betPoints, gameState.multiplier, playSound, initializeBoard]);

    const changeLevel = useCallback((level: 'easy' | 'medium' | 'hard') => {
        setGameState(prev => {
            const newBoard = initializeBoard();
            return {
                ...prev,
                level,
                bombs: getBombsCount(level),
                board: newBoard,
                revealed: 0,
                multiplier: 1.00
            };
        });
        playSound('betClickSnd');
    }, [getBombsCount, initializeBoard, playSound]);

    const changeBetPoints = useCallback((points: number) => {
        setGameState(prev => ({
            ...prev,
            betPoints: points
        }));
        playSound('betClickSnd');
    }, [playSound]);

    const adjustBetPoints = useCallback((increment: boolean) => {
        setGameState(prev => {
            const currentBet = prev.betPoints;
            let newBetPoints;

            if (increment) {
                newBetPoints = currentBet + 10;
            } else {
                newBetPoints = Math.max(10, currentBet - 10); // Minimum bet is 10
            }

            return {
                ...prev,
                betPoints: newBetPoints
            };
        });
        playSound('betClickSnd');
    }, [playSound]);

    const resetGame = useCallback(() => {
        setGameState(INITIAL_STATE);
        setShowAllCells(false);
        playSound('betClickSnd');
    }, [playSound]);

    useEffect(() => {
        const newBoard = initializeBoard();
        setGameState(prev => ({...prev, board: newBoard}));
    }, [initializeBoard]);

    return (
        <div className="mines-game">
            <GameHeader
                points={gameState.points}
                onMuteToggle={() => setIsMuted(!isMuted)}
                isMuted={isMuted}
            />

            <div className="right-panel">
                <CanvasBoard
                    board={gameState.board}
                    onRevealCell={revealCell}
                    gameStatus={gameState.gameStatus}
                    showAllCells={showAllCells}
                />
            </div>
            <GameControls
                gameState={gameState}
                onStart={startGame}
                onCashOut={cashOut}
                onReset={resetGame}
                onChangeLevel={changeLevel}
                onChangeBet={changeBetPoints}
                onAdjustBet={adjustBetPoints}
            />
        </div>
    );
};

export default MinesGame;