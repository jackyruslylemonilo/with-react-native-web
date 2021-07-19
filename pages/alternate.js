import { useCallback } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native'
import Header from '../Header';
import NextLink from 'next/link'

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

  console.log('render')

  return (
    <View style={styles.container}>
      <Header />
      <Text accessibilityRole="header" style={styles.text}>
        Alternate Page
      </Text>

      <NextLink href="/" passHref>
        <a>
          <TouchableOpacity>
            <Text>Test HomePage</Text>
          </TouchableOpacity>
        </a>
      </NextLink>

      <TouchableOpacity onPress={() => console.log('onPress')} onLongPress={() => console.log('Long Press')}>
    <Text>Press Example</Text>
      </TouchableOpacity>

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
