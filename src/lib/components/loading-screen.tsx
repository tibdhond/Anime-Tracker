import {View, StyleSheet, TextProps, StyleProp, TextStyle, useWindowDimensions, Pressable} from "react-native";
import {useEffect} from "react";
import Animated, {
    cancelAnimation,
    SharedValue,
    useAnimatedStyle,
    useSharedValue, withDelay, withRepeat, withSequence,
    withTiming,
    Easing, withDecay, useFrameCallback
} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {easterEggClicker} from "@/lib/helpers/easter-egg-clicker";
import {router} from "expo-router";

type WaveLetterProps = TextProps & {
    char: string;
    index: number;
    letterCount: number;
    style?: StyleProp<TextStyle>;
    jumpHeight: number;
    staggerMs: number;
    pauseMs: number;
};

const BOUNCE_MS = 250; // time to go up (and the same again to come down)
const IMAGE_SIZE = 100;
const RESTITUTION = 0.7; // fraction of speed kept after a bounce (1 = perfectly bouncy)
const FRICTION = 1.2;    // higher = slows down faster
const MIN_SPEED = 5;     // px/s below which it stops

const WaveLetter = ({
                        char,
                        index,
                        letterCount,
                        style,
                        jumpHeight,
                        staggerMs,
                        pauseMs,
                    }: WaveLetterProps) => {
    const translateY = useSharedValue(0);

    useEffect(() => {
        // Full length of one wave, from the first letter starting
        // to the last letter landing, plus the pause
        const cycleMs = (letterCount - 1) * staggerMs + BOUNCE_MS * 2 + pauseMs;
        // How long this letter sits still before its next bounce
        const idleMs = cycleMs - BOUNCE_MS * 2;

        translateY.value = withDelay(
            index * staggerMs, // this is what staggers the wave
            withRepeat(
                withSequence(
                    withTiming(-jumpHeight, {
                        duration: BOUNCE_MS,
                        easing: Easing.out(Easing.quad),
                    }),
                    withTiming(0, {
                        duration: BOUNCE_MS,
                        easing: Easing.in(Easing.quad),
                    }),
                    // Hold at 0 so every letter's loop stays the same length
                    withDelay(idleMs, withTiming(0, { duration: 0 }))
                ),
                -1 // repeat forever
            )
        );

        return () => cancelAnimation(translateY);
    }, [index, letterCount, jumpHeight, staggerMs, pauseMs, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.Text style={[styles.letter, style, animatedStyle]}>
            {/* Non-breaking space so spaces keep their width */}
            {char === " " ? "\u00A0" : char}
        </Animated.Text>
    );
};

type WaveTextProps = TextProps & {
    text: string;
    style?: StyleProp<TextStyle>;
    jumpHeight?: number;
    staggerMs?: number;
    pauseMs?: number;
};

const WaveText = ({
                      text = "Loading...",
                      style,
                      jumpHeight = 12,
                      staggerMs = 100,
                      pauseMs = 400,
                  }: WaveTextProps) => {
    const letters = text.split("");

    return (
        <View style={styles.row}>
            {letters.map((char, i) => (
                <WaveLetter
                    key={i}
                    char={char}
                    index={i}
                    letterCount={letters.length}
                    style={style}
                    jumpHeight={jumpHeight}
                    staggerMs={staggerMs}
                    pauseMs={pauseMs}
                />
            ))}
        </View>
    );
};

function DraggableSpinningLogo() {
    const onEasterEggReached: () => void  = easterEggClicker(() => {
        router.replace('/(app)/current');
    });
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    // Spin
    const rotation = useSharedValue(0);

    // Drag
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const velX = useSharedValue(0);
    const velY = useSharedValue(0);
    const isDragging = useSharedValue(false);

    const usableHeight = height - insets.top - insets.bottom;

    // Bounds live in shared values so the frame callback always sees current values
    const boundsX = useSharedValue(0);
    const bottomY = useSharedValue(0);
    const topY = useSharedValue(0);

    useEffect(() => {
        boundsX.value = (width - IMAGE_SIZE) / 2;
        const yBound: number = (height - insets.top - insets.bottom - IMAGE_SIZE) / 2;
        bottomY.value = yBound;
        topY.value = -yBound - 70;
    }, [width, height, insets, boundsX, bottomY, topY]);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 1500, easing: Easing.linear }),
            -1,
            false
        );
        return () => cancelAnimation(rotation);
    }, [rotation]);

    // Runs on the UI thread every frame
    useFrameCallback((frame) => {
        if (isDragging.value) return;
        if (velX.value === 0 && velY.value === 0) return;

        const dt = (frame.timeSincePreviousFrame ?? 16) / 1000; // seconds

        offsetX.value += velX.value * dt;
        offsetY.value += velY.value * dt;

        // Friction (exponential, so it's frame-rate independent)
        const damping = Math.exp(-FRICTION * dt);
        velX.value *= damping;
        velY.value *= damping;

        // Bounce off the edges
        if (offsetX.value > boundsX.value) {
            offsetX.value = boundsX.value;
            velX.value = -velX.value * RESTITUTION;
        } else if (offsetX.value < -boundsX.value) {
            offsetX.value = -boundsX.value;
            velX.value = -velX.value * RESTITUTION;
        }

        if (offsetY.value > bottomY.value) {
            offsetY.value = bottomY.value;
            velY.value = -velY.value * RESTITUTION;
        } else if (offsetY.value < topY.value) {
            offsetY.value = topY.value;
            velY.value = -velY.value * RESTITUTION;
        }

        // Come to rest
        if (Math.hypot(velX.value, velY.value) < MIN_SPEED) {
            velX.value = 0;
            velY.value = 0;
        }
    });

    const pan = Gesture.Pan()
        .onStart(() => {
            isDragging.value = true;
            velX.value = 0; // grabbing it stops any motion
            velY.value = 0;
            startX.value = offsetX.value;
            startY.value = offsetY.value;
        })
        .onUpdate((e) => {
            offsetX.value = Math.min(
                boundsX.value,
                Math.max(-boundsX.value, startX.value + e.translationX)
            );
            offsetY.value = Math.min(
                bottomY.value,
                Math.max(topY.value, startY.value + e.translationY)
            );
        })
        .onEnd((e) => {
            velX.value = e.velocityX; // hand over to the frame loop
            velY.value = e.velocityY;
            isDragging.value = false;
        })
        .onFinalize(() => {
            isDragging.value = false; // covers cancelled gestures
        });

    const dragStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
    }));

    const spinStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={dragStyle}>
                <Pressable onPress={onEasterEggReached}>
                    <Animated.Image style={[styles.logo, spinStyle]} source={require('@/assets/images/tanjonion.png')} />
                </Pressable>
            </Animated.View>
        </GestureDetector>
    );
}

export function LoadingScreen() {
    return (
        <View style={styles.container}>
            <WaveText style={styles.waveText} text="Loading..." />
            <DraggableSpinningLogo />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'black'},
    logo: {
        width: 100,
        height: 100,
        zIndex: 100
    },
    row: { flexDirection: "row" },
    letter: { fontSize: 28, fontWeight: 700, color: "#95b6d0"},
    waveText: {marginTop: 40}
})