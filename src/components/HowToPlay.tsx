// src/components/HowToPlay.tsx
import React from 'react';
import { Target, Bomb, DollarSign, TrendingUp } from 'lucide-react';

export const HowToPlay: React.FC = () => {
    return (
        <div className="how-to-play">
            <h3 className="content-title">How to Play Mines</h3>

            <div className="instructions-grid">
                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Target size={24} />
                    </div>
                    <h4>Objective</h4>
                    <p>Reveal gems while avoiding bombs to multiply your bet amount.</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Bomb size={24} />
                    </div>
                    <h4>Bombs</h4>
                    <p>3-8 bombs are hidden on the grid depending on difficulty level.</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <DollarSign size={24} />
                    </div>
                    <h4>Betting</h4>
                    <p>Place your bet and click cells to reveal gems. Each safe cell increases your multiplier.</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <TrendingUp size={24} />
                    </div>
                    <h4>Cash Out</h4>
                    <p>Cash out anytime to secure your winnings. Hit a bomb and you lose your bet.</p>
                </div>
            </div>

            <div className="game-rules">
                <h4>Game Rules</h4>
                <ul>
                    <li>• Choose your bet amount before starting</li>
                    <li>• Select difficulty: Easy (3 bombs), Medium (5 bombs), Hard (8 bombs)</li>
                    <li>• Click cells to reveal gems or bombs</li>
                    <li>• Multiplier increases with each safe cell revealed</li>
                    <li>• Cash out to secure your winnings</li>
                    <li>• Revealing a bomb ends the game and you lose your bet</li>
                </ul>
            </div>
        </div>
    );
};