import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    ScrollView, FlatList, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { API } from '@/constants/api';

type Lang = 'vi' | 'en';
interface VocabItem {
    _id: string;
    original: string;
    translated: string;
    from: Lang;
    to: Lang;
    createdAt: string;
}

export default function TranslateScreen() {
    const [from, setFrom] = useState<Lang>('vi');
    const [to, setTo] = useState<Lang>('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [savedItems, setSavedItems] = useState<VocabItem[]>([]);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const langLabel: Record<Lang, string> = { vi: '🇻🇳 Tiếng Việt', en: '🇬🇧 English' };

    // ── Auto-translate with 2s debounce ──
    const translate = useCallback(async (text: string, fromLang: Lang, toLang: Lang) => {
        if (!text.trim()) { setOutput(''); return; }
        setLoading(true);
        try {
            const res = await fetch(API.translate, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, from: fromLang, to: toLang }),
            });
            const data = await res.json();
            setOutput(data.translated || '⚠️ Translation failed');
        } catch {
            setOutput('⚠️ Network error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!input.trim()) { setOutput(''); return; }
        debounceRef.current = setTimeout(() => translate(input, from, to), 2000);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [input, from, to, translate]);

    // ── Fetch saved vocabulary ──
    const fetchVocabulary = useCallback(async () => {
        try {
            const res = await fetch(API.vocabulary);
            const data = await res.json();
            if (data.items) setSavedItems(data.items);
        } catch { /* silent */ }
    }, []);

    useEffect(() => { fetchVocabulary(); }, [fetchVocabulary]);

    // ── Save vocabulary ──
    const saveVocabulary = async () => {
        if (!input.trim() || !output.trim() || saving) return;
        setSaving(true);
        try {
            const res = await fetch(API.vocabulary, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ original: input, translated: output, from, to }),
            });
            const data = await res.json();
            if (data.success) {
                setSavedItems((prev) => [data.item, ...prev]);
                Alert.alert('✅ Saved!', 'Đã lưu vào vocabulary');
            }
        } catch {
            Alert.alert('Error', 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    // ── Delete vocabulary ──
    const deleteVocabulary = async (id: string) => {
        try {
            const res = await fetch(`${API.vocabulary}?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) setSavedItems((prev) => prev.filter((i) => i._id !== id));
        } catch { /* silent */ }
    };

    // ── Swap languages ──
    const swapLanguages = () => {
        setFrom(to); setTo(from);
        setInput(output); setOutput(input);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text style={styles.headerTitle}>🌐 Translate</Text>
                <Text style={styles.headerSub}>Dịch tiếng Việt ↔ English</Text>

                {/* Language selector */}
                <View style={styles.langRow}>
                    <View style={styles.langBadge}><Text style={styles.langText}>{langLabel[from]}</Text></View>
                    <TouchableOpacity style={styles.swapBtn} onPress={swapLanguages}>
                        <Text style={styles.swapText}>⇄</Text>
                    </TouchableOpacity>
                    <View style={styles.langBadge}><Text style={styles.langText}>{langLabel[to]}</Text></View>
                </View>

                {/* Input */}
                <TextInput
                    style={styles.textInput}
                    value={input}
                    onChangeText={setInput}
                    placeholder={from === 'vi' ? 'Nhập văn bản tiếng Việt...' : 'Type English text...'}
                    placeholderTextColor="#475569"
                    multiline
                    textAlignVertical="top"
                />

                {/* Translate button */}
                <TouchableOpacity
                    style={[styles.translateBtn, (!input.trim() || loading) && styles.translateBtnDisabled]}
                    onPress={() => translate(input, from, to)}
                    disabled={!input.trim() || loading}
                >
                    <Text style={styles.translateBtnText}>{loading ? 'Translating...' : '🌐 Translate'}</Text>
                </TouchableOpacity>

                {/* Output */}
                <View style={styles.outputBox}>
                    {loading ? (
                        <ActivityIndicator color="#38bdf8" />
                    ) : output ? (
                        <Text style={styles.outputText}>{output}</Text>
                    ) : (
                        <Text style={styles.placeholder}>
                            {to === 'vi' ? 'Bản dịch sẽ hiện ở đây...' : 'Translation will appear here...'}
                        </Text>
                    )}
                </View>

                {/* Action buttons */}
                {output && !loading && (
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionBtn} onPress={saveVocabulary} disabled={saving}>
                            <Text style={styles.actionText}>{saving ? '...' : '🔖 Save'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => { Clipboard.setStringAsync(output); Alert.alert('📋 Copied!'); }}>
                            <Text style={styles.actionText}>📋 Copy</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={styles.hint}>Auto-translate after 2s</Text>

                {/* Saved vocabulary */}
                {savedItems.length > 0 && (
                    <View style={styles.savedSection}>
                        <Text style={styles.savedTitle}>🔖 Saved Vocabulary ({savedItems.length})</Text>
                        {savedItems.map((item) => (
                            <View key={item._id} style={styles.savedCard}>
                                <View style={styles.savedContent}>
                                    <Text style={styles.savedOriginal}>{item.from === 'vi' ? '🇻🇳' : '🇬🇧'} {item.original}</Text>
                                    <Text style={styles.savedArrow}>→</Text>
                                    <Text style={styles.savedTranslated}>{item.to === 'vi' ? '🇻🇳' : '🇬🇧'} {item.translated}</Text>
                                </View>
                                <TouchableOpacity onPress={() => deleteVocabulary(item._id)} style={styles.deleteBtn}>
                                    <Text style={styles.deleteText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0a' },
    content: { padding: 20, paddingBottom: 40 },

    headerTitle: { fontSize: 28, fontWeight: '800', color: '#e2e8f0', marginTop: 20 },
    headerSub: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 16 },

    langRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
    langBadge: { flex: 1, backgroundColor: '#1e293b', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
    langText: { color: '#e2e8f0', fontWeight: '600', fontSize: 14 },
    swapBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
    swapText: { color: '#fff', fontSize: 20, fontWeight: '700' },

    textInput: {
        backgroundColor: '#1e293b', borderRadius: 14, padding: 16, color: '#e2e8f0',
        fontSize: 15, minHeight: 120, borderWidth: 1, borderColor: '#334155', marginBottom: 12,
    },

    translateBtn: { backgroundColor: '#2563eb', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 12 },
    translateBtnDisabled: { backgroundColor: '#334155' },
    translateBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },

    outputBox: {
        backgroundColor: '#1e293b', borderRadius: 14, padding: 16, minHeight: 100,
        borderWidth: 1, borderColor: '#334155', marginBottom: 8, justifyContent: 'center',
    },
    outputText: { color: '#e2e8f0', fontSize: 15, lineHeight: 22 },
    placeholder: { color: '#475569', fontSize: 15 },

    actionRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
    actionBtn: { backgroundColor: '#1e293b', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: '#334155' },
    actionText: { color: '#94a3b8', fontSize: 13 },

    hint: { textAlign: 'center', fontSize: 11, color: '#475569', marginBottom: 24 },

    savedSection: { marginTop: 8 },
    savedTitle: { fontSize: 16, fontWeight: '700', color: '#e2e8f0', marginBottom: 12 },
    savedCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b',
        borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#ffffff08',
    },
    savedContent: { flex: 1, gap: 4 },
    savedOriginal: { fontSize: 13, color: '#94a3b8' },
    savedArrow: { fontSize: 11, color: '#475569' },
    savedTranslated: { fontSize: 13, color: '#e2e8f0', fontWeight: '500' },
    deleteBtn: { paddingHorizontal: 8, paddingVertical: 4 },
    deleteText: { color: '#64748b', fontSize: 14 },
});
