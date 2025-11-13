import {useEffect, useCallback, useMemo} from "react";
import cashOutClickSnd from "../MinesAudio/cashout.mp3";
import betClickSnd from "../MinesAudio/bet.mp3";
import cellSelectSnd from "../MinesAudio/select.mp3";
import bombClickSnd from "../MinesAudio/bombClick.mp3";
import minesBackgroundSound from "../MinesAudio/MINES.mp3";

export const useAudioControl = (isMuted: boolean, loop: boolean) => {
    const audioInstances = useMemo(() => {
        return {
            cashOutClickSnd: new Audio(cashOutClickSnd),
            betClickSnd: new Audio(betClickSnd),
            cellSelectSnd: new Audio(cellSelectSnd),
            bombClickSnd: new Audio(bombClickSnd),
        };
    }, []);

    const backgroundSound = useMemo(() => {
        const bgSound = new Audio(minesBackgroundSound);
        bgSound.loop = loop;
        return bgSound;
    }, [loop]);

    useEffect(() => {
        if (!isMuted) {
            backgroundSound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        }

        return () => {
            backgroundSound.pause();
            backgroundSound.currentTime = 0;
        };
    }, [backgroundSound, isMuted]);

    const playSound = useCallback(
        (soundKey: keyof typeof audioInstances) => {
            if (isMuted) return;

            const sound = audioInstances[soundKey];
            if (!sound.paused) {
                sound.pause();
                sound.currentTime = 0;
            }
            sound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    // console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        },
        [audioInstances, isMuted]
    );
    return {playSound};
};