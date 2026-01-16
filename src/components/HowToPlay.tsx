// src/components/HowToPlay.tsx
import React from 'react';
import { Target, Bomb, Coins, TrendingUp, Gem, Shield } from 'lucide-react';

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
                    <p>Reveal gems while avoiding bombs to multiply your points. Collect as many points as you can!</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Bomb size={24} />
                    </div>
                    <h4>Bombs</h4>
                    <p>4-8 bombs are hidden on the grid depending on difficulty level. Avoid them at all costs!</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Coins size={24} />
                    </div>
                    <h4>Points Bet</h4>
                    <p>Place your points bet and click cells to reveal gems. Each safe gem increases your multiplier.</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <TrendingUp size={24} />
                    </div>
                    <h4>Cash Out</h4>
                    <p>Cash out anytime to secure your points. Hit a bomb and you lose your bet points.</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Gem size={24} />
                    </div>
                    <h4>Gems</h4>
                    <p>Find safe gem cells to increase your multiplier. More gems = bigger point rewards!</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Shield size={24} />
                    </div>
                    <h4>Strategy</h4>
                    <p>Balance risk vs reward. Higher difficulty means more bombs but bigger multipliers!</p>
                </div>
            </div>

            <div className="game-rules">
                <h4>Game Rules</h4>
                <ul>
                    <li>Choose how many points to bet before starting</li>
                    <li>Select difficulty: Easy (4 bombs), Medium (6 bombs), Hard (8 bombs)</li>
                    <li>Click cells to reveal gems (safe) or bombs (lose)</li>
                    <li>Multiplier increases with each safe gem revealed</li>
                    <li>Cash out to secure your points winnings</li>
                    <li>Revealing a bomb ends the game and you lose your bet points</li>
                    <li>The more gems you find, the higher your points multiplier becomes</li>
                    <li>Start with 1000 points - use them wisely!</li>
                </ul>
            </div>

            <div className="multiplier-info">
                <h4>Difficulty Levels & Points Multiplier</h4>
                <div className="multiplier-list">
                    <div className="multiplier-item">
                        <div className="color-dot" style={{ backgroundColor: '#00ff88' }}></div>
                        <span>Easy (4 bombs): Base multiplier starts at 1.2x</span>
                    </div>
                    <div className="multiplier-item">
                        <div className="color-dot" style={{ backgroundColor: '#ffaa00' }}></div>
                        <span>Medium (6 bombs): Base multiplier starts at 1.5x</span>
                    </div>
                    <div className="multiplier-item">
                        <div className="color-dot" style={{ backgroundColor: '#ff4444' }}></div>
                        <span>Hard (8 bombs): Base multiplier starts at 2.0x</span>
                    </div>
                </div>
                <p className="rule-note">Note: Multiplier increases with each safe cell you reveal!</p>
            </div>

            <div className="points-tips">
                <h4>Points Strategy Tips</h4>
                <ul>
                    <li> Start with smaller point bets to learn the game mechanics</li>
                    <li>Higher difficulty = higher risk but greater point rewards</li>
                    <li>Don't get greedy - cash out when you have a good points multiplier</li>
                    <li>Keep track of your total points and manage them wisely</li>
                    <li>The goal is to maximize your points, not just win individual games</li>
                </ul>
            </div>
        </div>
    );
};