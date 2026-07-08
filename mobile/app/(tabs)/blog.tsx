import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { blogPosts, getBlogUrl, type BlogPostMeta } from '@/constants/blogData';

export default function BlogScreen() {
    const openPost = (slug: string) => {
        WebBrowser.openBrowserAsync(getBlogUrl(slug));
    };

    const renderPost = ({ item }: { item: BlogPostMeta }) => (
        <TouchableOpacity style={[styles.card, { borderColor: `${item.color}30` }]} onPress={() => openPost(item.slug)}>
            <View style={styles.cardHeader}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <View style={styles.cardMeta}>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </View>
            <Text style={styles.title}>{item.title.vi}</Text>
            <Text style={styles.description}>{item.description.vi}</Text>
            <View style={styles.tagsRow}>
                {item.tags.map((tag) => (
                    <View key={tag} style={[styles.tag, { backgroundColor: `${item.color}15`, borderColor: `${item.color}30` }]}>
                        <Text style={[styles.tagText, { color: item.color }]}>{tag}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>📝 Blog</Text>
                <Text style={styles.headerSub}>Bài viết kỹ thuật & algorithm patterns</Text>
            </View>
            <FlatList
                data={blogPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.slug}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0a' },
    header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
    headerTitle: { fontSize: 28, fontWeight: '800', color: '#e2e8f0' },
    headerSub: { fontSize: 13, color: '#64748b', marginTop: 4 },

    list: { padding: 20, paddingTop: 8, gap: 14 },

    card: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    emoji: { fontSize: 32 },
    cardMeta: { alignItems: 'flex-end' },
    date: { fontSize: 12, color: '#64748b' },

    title: { fontSize: 18, fontWeight: '700', color: '#e2e8f0', marginBottom: 6 },
    description: { fontSize: 13, color: '#94a3b8', lineHeight: 18, marginBottom: 12 },

    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    tag: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1 },
    tagText: { fontSize: 11, fontWeight: '600' },
});
