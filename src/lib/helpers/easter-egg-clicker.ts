import {Ref, RefObject, useCallback, useEffect, useRef} from "react";

const RESET_MS = 1000;
const TARGET_TAPS = 20;

export function easterEggClicker(onReached: () => void) {
    const tapCount: RefObject<number> = useRef(0);
    const timeoutId: RefObject<number | null> = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        };
    }, []);

    return useCallback(() => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        tapCount.current += 1;

        if (tapCount.current >= TARGET_TAPS) {
            tapCount.current = 0;
            timeoutId.current = null;
            onReached?.();
            return;
        }

        timeoutId.current = setTimeout(() => {
            tapCount.current = 0;
            timeoutId.current = null;
        }, RESET_MS);
    }, [onReached]);
}