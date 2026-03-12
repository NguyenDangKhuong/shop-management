import React, { useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue, useAnimatedStyle, withTiming, interpolate,
} from 'react-native-reanimated';
import { flashcards, type Flashcard } from '@/constants/flashcardData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;

export default function FlashcardsScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
    const [cards, setCards] = useState(flashcards);

    const flipProgress = useSharedValue(0);
    const isFlipped = flipProgress.value > 0.5;

    const card = cards[currentIndex];
    const progress = knownCards.size;
    const total = cards.length;

    // ── Flip animation ──
    const flipCard = () => {
        flipProgress.value = withTiming(flipProgress.value === 0 ? 1 : 0, { duration: 400 });
    };

    const frontStyle = useAnimatedStyle(() => ({
        transform: [{ rotateY: `${interpolate(flipProgress.value, [0, 1], [0, 180])}deg` }],
        backfaceVisibility: 'hidden',
    }));

    const backStyle = useAnimatedStyle(() => ({
        transform: [{ rotateY: `${interpolate(flipProgress.value, [0, 1], [180, 360])}deg` }],
        backfaceVisibility: 'hidden',
    }));

    // ── Navigation ──
    const goNext = useCallback(() => {
        flipProgress.value = withTiming(0, { duration: 200 });
        setTimeout(() => setCurrentIndex((i) => (i + 1) % cards.length), 200);
    }, [cards.length, flipProgress]);

    const goPrev = useCallback(() => {
        flipProgress.value = withTiming(0, { duration: 200 });
        setTimeout(() => setCurrentIndex((i) => (i - 1 + cards.length) % cards.length), 200);
    }, [cards.length, flipProgress]);

    const shuffle = useCallback(() => {
        setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        flipProgress.value = withTiming(0, { duration: 200 });
    }, [flipProgress]);

    const toggleKnown = useCallback(() => {
        setKnownCards((prev) => {
            const next = new Set(prev);
            if (next.has(card.id)) next.delete(card.id);
            else next.add(card.id);
            return next;
        });
    }, [card?.id]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text style={styles.headerTitle}>🃏 Flashcards</Text>
                <Text style={styles.headerSub}>Ôn thuật toán · {currentIndex + 1}/{cards.length}</Text>

                {/* Progress */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressLabel}>🧠 Đã thuộc: {progress}/{total}</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${(progress / total) * 100}%` }]} />
                    </View>
                </View>

                {/* Flashcard */}
                <TouchableOpacity activeOpacity={0.9} onPress={flipCard} style={[styles.cardContainer, { perspective: '1000' } as any]}>
                    {/* Front */}
                    <Animated.View style={[styles.card, frontStyle]}>
                        <View style={styles.cardBadge}>
                            <Text style={styles.cardBadgeText}>🤔 Bài toán này dùng thuật toán gì?</Text>
                        </View>
                        <Text style={styles.cardSignal}>{card?.front.signal}</Text>
                        <View style={styles.cardExample}>
                            <Text style={styles.exampleLabel}>Ví dụ:</Text>
                            <Text style={styles.exampleCode}>{card?.front.question}</Text>
                        </View>
                        <Text style={styles.tapHint}>👆 Tap để xem đáp án</Text>
                    </Animated.View>

                    {/* Back */}
                    <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
                        <View style={styles.patternRow}>
                            <Text style={{ fontSize: 24 }}>{card?.emoji}</Text>
                            <View style={[styles.patternBadge, { backgroundColor: `${card?.color}20`, borderColor: `${card?.color}40` }]}>
                                <Text style={[styles.patternName, { color: card?.color }]}>{card?.pattern}</Text>
                            </View>
                        </View>

                        <Text style={styles.backLabel}>CÁCH TIẾP CẬN</Text>
                        <Text style={[styles.backApproach, { color: card?.color }]}>{card?.back.approach}</Text>

                        <Text style={styles.backLabel}>TEMPLATE CODE</Text>
                        <View style={styles.codeBox}>
                            <Text style={styles.codeText}>{card?.back.template}</Text>
                        </View>

                        <View style={styles.metaRow}>
                            <View style={styles.metaBox}>
                                <Text style={styles.metaText}>⏱️ {card?.back.complexity}</Text>
                            </View>
                        </View>

                        <Text style={styles.backLabel}>BÀI LEETCODE</Text>
                        <Text style={styles.exampleText}>{card?.back.example}</Text>

                        <Text style={styles.tapHint}>👆 Tap để quay lại</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Controls */}
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.navBtn} onPress={goPrev}>
                        <Text style={styles.navText}>←</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.flipBtn} onPress={flipCard}>
                        <Text style={styles.flipText}>🔄 Lật</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shuffleBtn} onPress={shuffle}>
                        <Text style={styles.shuffleText}>🎲 Trộn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.knownBtn, knownCards.has(card?.id) && styles.knownBtnActive]}
                        onPress={toggleKnown}
                    >
                        <Text style={[styles.knownText, knownCards.has(card?.id) && styles.knownTextActive]}>
                            {knownCards.has(card?.id) ? '✅' : '☐'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navBtn} onPress={goNext}>
                        <Text style={styles.navText}>→</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0a' },
    content: { padding: 20, paddingBottom: 40 },

    headerTitle: { fontSize: 28, fontWeight: '800', color: '#e2e8f0', marginTop: 20 },
    headerSub: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 16 },

    progressContainer: { marginBottom: 20 },
    progressLabel: { fontSize: 12, color: '#64748b', marginBottom: 6 },
    progressBar: { height: 6, borderRadius: 3, backgroundColor: '#1e293b', overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 3, backgroundColor: '#4ade80' },

    cardContainer: { height: 400, marginBottom: 20 },
    card: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#1e293b', borderRadius: 20, padding: 24,
        borderWidth: 1, borderColor: '#334155', justifyContent: 'space-between',
    },
    cardBack: { backgroundColor: '#1e293b' },

    cardBadge: { backgroundColor: '#0f172a', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#334155' },
    cardBadgeText: { fontSize: 12, color: '#64748b' },

    cardSignal: { fontSize: 22, fontWeight: '700', color: '#e2e8f0', lineHeight: 30, marginVertical: 16 },
    cardExample: { backgroundColor: '#0f172a', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#334155' },
    exampleLabel: { fontSize: 11, color: '#64748b', marginBottom: 4 },
    exampleCode: { fontSize: 13, color: '#94a3b8', fontFamily: 'monospace' },
    tapHint: { textAlign: 'center', fontSize: 11, color: '#475569', marginTop: 8 },

    patternRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    patternBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
    patternName: { fontSize: 12, fontWeight: '700' },

    backLabel: { fontSize: 10, color: '#475569', letterSpacing: 1, marginBottom: 4, marginTop: 8 },
    backApproach: { fontSize: 14, fontWeight: '600', marginBottom: 4 },

    codeBox: { backgroundColor: '#0f172a', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#334155' },
    codeText: { fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', lineHeight: 16 },

    metaRow: { flexDirection: 'row', marginTop: 8 },
    metaBox: { backgroundColor: '#0f172a', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: '#334155' },
    metaText: { fontSize: 10, color: '#94a3b8' },

    exampleText: { fontSize: 12, color: '#94a3b8' },

    controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
    navBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
    navText: { fontSize: 20, color: '#e2e8f0' },
    flipBtn: { paddingHorizontal: 16, height: 46, borderRadius: 23, backgroundColor: 'rgba(56,189,248,0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(56,189,248,0.4)' },
    flipText: { fontSize: 14, color: '#38bdf8', fontWeight: '600' },
    shuffleBtn: { paddingHorizontal: 16, height: 46, borderRadius: 23, backgroundColor: 'rgba(251,191,36,0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(251,191,36,0.4)' },
    shuffleText: { fontSize: 14, color: '#fbbf24', fontWeight: '600' },
    knownBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
    knownBtnActive: { backgroundColor: 'rgba(74,222,128,0.2)', borderColor: 'rgba(74,222,128,0.5)' },
    knownText: { fontSize: 18, color: '#94a3b8' },
    knownTextActive: { color: '#4ade80' },
});
