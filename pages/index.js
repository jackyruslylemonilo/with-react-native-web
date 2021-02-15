import { useCallback } from 'react';
import { StyleSheet, FlatList, Text, View, Image } from 'react-native'
import Header from '../Header';

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
      <img src="https://ik.imagekit.io/10tn5i0v1n/dynamic-pages/wiranilo/Desktop-1-Banner-Header.jpg?tr=w-800,q-75" style={{ width: '500px', height: '500px' }} />
      {/* <Image
        source={{ uri: 'https://ik.imagekit.io/10tn5i0v1n/dynamic-pages/wiranilo/Desktop-1-Banner-Header.jpg?tr=w-800,q-75 '}}
        style={{ width: 500, height: 500 }}
      />
       */}
      <Header />
      <Text accessibilityRole="header" style={styles.text}>
        React Native for Web & Next.js
      </Text>

      <Text style={styles.link} accessibilityRole="link" href={`/alternate`}>
        A universal link
      </Text>

      <View style={styles.textContainer}>
        <Text accessibilityRole="header" aria-level="2" style={styles.text}>
          Subheader
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
