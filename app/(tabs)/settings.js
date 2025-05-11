import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Switch,
  ScrollView,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, useSystemTheme } from '../../store/themeSlice';
import { Moon, Sun, Smartphone, Trash2, Archive } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { useFocusEffect } from '@react-navigation/native';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { mode, isSystemTheme } = useSelector((state) => state.theme);
  const archivedTasks = useSelector((state) => state.tasks.archivedTasks);
  
  // UseRef for fade animation
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Trigger animation on screen focus
  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [])
  );
  
  const handleToggleSystemTheme = (value) => {
    if (value) {
      dispatch(useSystemTheme());
    } else {
      dispatch(setTheme(mode));
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Animated.View 
        style={{
          flex: 1,
          opacity: fadeAnim,
        }}
      >
        <ScrollView>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
            
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelContainer}>
                  <Smartphone color={theme.colors.primary} size={22} />
                  <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                    Use system settings
                  </Text>
                </View>
                <Switch
                  value={isSystemTheme}
                  onValueChange={handleToggleSystemTheme}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              {!isSystemTheme && (
                <>
                  <View style={styles.divider} />
                  
                  <TouchableOpacity
                    style={[
                      styles.themeOption,
                      mode === 'light' && { backgroundColor: theme.colors.primary + '15' },
                    ]}
                    onPress={() => dispatch(setTheme('light'))}
                  >
                    <Sun 
                      color={mode === 'light' ? theme.colors.primary : theme.colors.subtext} 
                      size={22} 
                    />
                    <Text 
                      style={[styles.themeOptionText, { color: mode === 'light' ? theme.colors.primary : theme.colors.text }]}
                    >
                      Light
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.themeOption,
                      mode === 'dark' && { backgroundColor: theme.colors.primary + '15' },
                    ]}
                    onPress={() => dispatch(setTheme('dark'))}
                  >
                    <Moon 
                      color={mode === 'dark' ? theme.colors.primary : theme.colors.subtext} 
                      size={22} 
                    />
                    <Text 
                      style={[styles.themeOptionText, { color: mode === 'dark' ? theme.colors.primary : theme.colors.text }]}
                    >
                      Dark
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Task Archive</Text>
            
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
              <View style={styles.archiveInfo}>
                <Archive color={theme.colors.primary} size={22} />
                <Text style={[styles.archiveText, { color: theme.colors.text }]}>
                  {archivedTasks.length} archived tasks
                </Text>
              </View>
              
              <Text style={[styles.archiveDescription, { color: theme.colors.subtext }]}>
                Tasks completed for more than 24 hours are automatically archived
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
            
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.aboutTitle, { color: theme.colors.text }]}>
                TaskMaster
              </Text>
              <Text style={[styles.aboutVersion, { color: theme.colors.subtext }]}>
                Version 1.0.0
              </Text>
              <Text style={[styles.aboutDescription, { color: theme.colors.subtext }]}>
                A simple task management app built with React Native and Redux
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  themeOptionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  archiveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  archiveText: {
    fontSize: 16,
    marginLeft: 12,
  },
  archiveDescription: {
    fontSize: 14,
    marginLeft: 34,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
