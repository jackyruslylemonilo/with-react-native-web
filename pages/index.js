import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native'
import NextLink from 'next/link';
import Header from '../Header';
import DemoService from '../src/DemoService';
import usePagination from '../src/usePagination';
import Link from 'next/link';

const demoService = new DemoService();

const data = [1, 2, 3, 4, 5];

export default function App() {
  const firstRender = useRef(true);
  // const data = usePagination(demoService.getData);

  useEffect(() => {
    dataLayer.push({ 'event': 'optimize.activate' });
  }, []);
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
  console.log('render')

  return (
    <View style={styles.container}>
      {/* <img src="https://ik.imagekit.io/10tn5i0v1n/dynamic-pages/wiranilo/Desktop-1-Banner-Header.jpg?tr=w-800,q-75" style={{ width: '500px', height: '500px' }} /> */}
      <Image
        source={{ uri: 'https://ik.imagekit.io/10tn5i0v1n/dynamic-pages/wiranilo/Desktop-1-Banner-Header.jpg?tr=w-800,q-75 ' }}
        style={{ width: 500, height: 500 }}
      />

      <Link href="/alternate">
        <button onClick={() => console.log('Clicked 1')}>
          <button onClick={(e) => {
            e.stopPropagation();
            console.log('Clicked 2')
          }}>
            Button 2
          </button>
        </button>
      </Link>

      <Text style={{ margin: 10 }}>
        Test
      </Text>

      <View onMouseEnter={() => console.log('testing')}>
        <TouchableOpacity onPress={() => console.log('test Press')}>
          <Text>Test Press</Text>
        </TouchableOpacity>
      </View>



      <NextLink href="/alternate" passHref>
        <a onClick={(e) => e.preventDefault()}>
          <div>
            <TouchableOpacity>
              <Text>Test Alternate</Text>
            </TouchableOpacity>
          </div>
        </a>

      </NextLink>

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
