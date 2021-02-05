import { useCallback } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native'

const data = [1, 2, 3, 4, 5];

export default function App() {
  const keyExtractor = useCallback((item) => {
    return `${item}`;
  }, [])

  const renderItem = useCallback(({ item }) => {
    return (
      <div>
        {item}
      </div>
    )
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text accessibilityRole="header" aria-level="2" style={styles.text}>
          Header
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
})
