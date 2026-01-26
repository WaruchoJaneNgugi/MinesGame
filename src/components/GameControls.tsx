import React from 'react';
import type {GameState} from "../types/game.ts";

interface GameControlsProps {
    gameState: GameState;
    onStart: () => void;
    onCashOut: () => void;
    onReset: () => void;
    onChangeLevel: (level: 'easy' | 'medium' | 'hard') => void;
    onChangeBet: (points: number) => void;
    onAdjustBet: (increment: boolean) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
                                                       gameState,
                                                       onStart,
                                                       onCashOut,
                                                       onReset,
                                                       onChangeLevel,
                                                       onChangeBet,
                                                       onAdjustBet
                                                   }) => {
    const betPoints = [10, 50, 100, 250, 500];

    return (
        <div className="game-controls">
            <div className="control-section">
                <div className="section-title">Bet Amount</div>
                <div className="main-bet-amounts">
                    <div className="bet-amount-selector">
                        {betPoints.map(points => (
                            <div
                                key={points}
                                className={`bet-amount-btn ${gameState.betPoints === points ? 'active' : ''}`}
                                onClick={() => onChangeBet(points)}
                                title={`Bet ${points} pts`}
                            >
                                {points}
                            </div>
                        ))}
                    </div>
                    <div className="bet-adjuster">
                        <div
                            className="bet-adjust-btn"
                            onClick={() => onAdjustBet(false)}
                            title="Decrease bet"
                        >
                            -
                        </div>
                        <div className="current-bet">{gameState.betPoints}</div>
                        <div
                            className="bet-adjust-btn"
                            onClick={() => onAdjustBet(true)}
                            title="Increase bet"
                        >
                            +
                        </div>
                    </div>
                </div>
            </div>

            <div className="control-section">
                <div className="section-title">Level</div>
                <div className="level-active">
                    <div className="level-selector">
                        {(gameState.gameStatus === 'idle' ? ['easy', 'medium', 'hard'] : [gameState.level]).map(level => (
                            <button
                                key={level}
                                className={`level-btn ${gameState.level === level ? 'active' : ''}`}
                                onClick={() => onChangeLevel(level as 'easy' | 'medium' | 'hard')}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                        ))}
                    </div>
                    {gameState.gameStatus === 'playing' && (
                        <div className="multiplier-section">
                            <div className="multiplier-display">
                                <span className="multiplier-label">Multiplier</span>
                                <span className="multiplier-value">×{gameState.multiplier.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="action-buttons">
                {{
                    idle: (
                        <div
                            className="action-btn start-btn"
                            onClick={onStart}
                        >
                            START GAME
                        </div>
                    ),
                    playing: (
                        <div
                            className="action-btn cashout-btn"
                            onClick={onCashOut}
                        >
                            CASH OUT {(gameState.betPoints * gameState.multiplier).toFixed(1)} pts
                        </div>
                    ),
                    win: (
                        <div
                            className="action-btn reset-btn"
                            onClick={onReset}
                        >
                            PLAY AGAIN
                        </div>
                    ),
                    lose: (
                        <div
                            className="action-btn reset-btn"
                            onClick={onReset}
                        >
                            PLAY AGAIN
                        </div>
                    )
                }[gameState.gameStatus]}
            </div>

            {gameState.gameStatus === 'lose' && (
                <div className="game-over-message">
                    Game Over! You hit a bomb.
                </div>
            )}

            {gameState.gameStatus === 'win' && (
                <div className="win-message">
                    Congratulations! You won {gameState.totalWinnings} pts
                </div>
            )}
        </div>
    );
};

export default GameControls;