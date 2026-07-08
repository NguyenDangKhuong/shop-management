import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.greeting}>Xin chào, tôi là</Text>
          <Text style={styles.name}>Khương</Text>
          <Text style={styles.role}>Front-End Developer · 8+ Năm · React Specialist</Text>
          <Text style={styles.purpose}>
            Dự án này là sân chơi cá nhân — được xây dựng để học hỏi, nạp thêm kiến thức và cập nhật bản thân mỗi ngày. 🚀
          </Text>
        </View>

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.linksGrid}>
          <TouchableOpacity style={[styles.linkCard, { borderColor: '#a78bfa40' }]} onPress={() => router.push('/blog')}>
            <Text style={styles.linkEmoji}>📝</Text>
            <Text style={styles.linkLabel}>Blog</Text>
            <Text style={styles.linkDesc}>Bài viết kỹ thuật</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.linkCard, { borderColor: '#60a5fa40' }]} onPress={() => router.push('/translate')}>
            <Text style={styles.linkEmoji}>🌐</Text>
            <Text style={styles.linkLabel}>Translate</Text>
            <Text style={styles.linkDesc}>VI ↔ EN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.linkCard, { borderColor: '#fbbf2440' }]} onPress={() => router.push('/flashcards')}>
            <Text style={styles.linkEmoji}>🃏</Text>
            <Text style={styles.linkLabel}>Flashcards</Text>
            <Text style={styles.linkDesc}>Ôn thuật toán</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.linkCard, { borderColor: '#4ade8040' }]} onPress={() => Linking.openURL('https://thetaphoa.store')}>
            <Text style={styles.linkEmoji}>🌍</Text>
            <Text style={styles.linkLabel}>Website</Text>
            <Text style={styles.linkDesc}>thetaphoa.store</Text>
          </TouchableOpacity>
        </View>

        {/* Tech Stack */}
        <Text style={styles.sectionTitle}>Tech Stack</Text>
        <View style={styles.techRow}>
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Expo'].map((tech) => (
            <View key={tech} style={styles.techBadge}>
              <Text style={styles.techText}>{tech}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>© 2026 TheTapHoa. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },

  hero: { marginBottom: 32, marginTop: 20 },
  greeting: { fontSize: 16, color: '#94a3b8', marginBottom: 4 },
  name: { fontSize: 40, fontWeight: '800', color: '#c084fc', marginBottom: 4 },
  role: { fontSize: 14, color: '#64748b', marginBottom: 12 },
  purpose: { fontSize: 13, color: '#94a3b8', fontStyle: 'italic', lineHeight: 20 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#e2e8f0', marginBottom: 12 },

  linksGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  linkCard: {
    width: '47%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  linkEmoji: { fontSize: 28, marginBottom: 8 },
  linkLabel: { fontSize: 16, fontWeight: '600', color: '#e2e8f0', marginBottom: 2 },
  linkDesc: { fontSize: 12, color: '#64748b' },

  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 },
  techBadge: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  techText: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },

  footer: { textAlign: 'center', fontSize: 11, color: '#475569', marginTop: 20 },
});
