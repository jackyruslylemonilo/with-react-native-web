import { useCallback } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native'

const data = [1, 2, 3, 4, 5];

export default function Alternate() {
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
      <Text accessibilityRole="header" style={styles.text}>
        Alternate Page
      </Text>

      <Text style={styles.link} accessibilityRole="link" href={`/`}>
        Go Back
      </Text>

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
  text: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
  link: {
    color: 'blue',
  },
})
