import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, Picker, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const genreList = [
  {id: '1' ,name: 'Action and adventure', category: 'Fiction', count: 0},
  {id: '2' ,name: 'Alternate history', category: 'Fiction', count: 0},
  {id: '3' ,name: 'Anthology', category: 'Fiction', count: 0},
  {id: '4' ,name: 'Chick lit', category: 'Fiction', count: 0},
  {id: '5' ,name: 'Children', category: 'Fiction', count: 0},
  {id: '6' ,name: 'Classic', category: 'Fiction', count: 0},
  {id: '7' ,name: 'Comic book', category: 'Fiction', count: 0},
  {id: '8' ,name: 'Coming-of-age', category: 'Fiction', count: 0},
  {id: '9' ,name: 'Crime', category: 'Fiction', count: 0},
  {id: '10' ,name: 'Drama', category: 'Fiction', count: 0},
  {id: '11' ,name: 'Fairytale', category: 'Fiction', count: 0},
  {id: '12' ,name: 'Fantasy', category: 'Fiction', count: 0},
  {id: '13' ,name: 'Graphic novel', category: 'Fiction', count: 0},
  {id: '14' ,name: 'Historical fiction', category: 'Fiction', count: 0},
  {id: '15' ,name: 'Horror', category: 'Fiction', count: 0},
  {id: '16' ,name: 'Mystery', category: 'Fiction', count: 0},
  {id: '17' ,name: 'Paranormal romance', category: 'Fiction', count: 0},
  {id: '18' ,name: 'Picture book', category: 'Fiction', count: 0},
  {id: '19' ,name: 'Poetry', category: 'Fiction', count: 0},
  {id: '20' ,name: 'Political thriller', category: 'Fiction', count: 0},
  {id: '21' ,name: 'Romance', category: 'Fiction', count: 0},
  {id: '22' ,name: 'Satire', category: 'Fiction', count: 0},
  {id: '23' ,name: 'Science fiction', category: 'Fiction', count: 0},
  {id: '24' ,name: 'Short story', category: 'Fiction', count: 0},
  {id: '25' ,name: 'Suspense', category: 'Fiction', count: 0},
  {id: '26' ,name: 'Thriller', category: 'Fiction', count: 0},
  {id: '27' ,name: 'Western', category: 'Fiction', count: 0},
  {id: '28' ,name: 'Young adult', category: 'Fiction', count: 0},
  {id: '29' ,name: 'Art/architecture', category: 'Non-fiction', count: 0},
  {id: '30' ,name: 'Autobiography', category: 'Non-fiction', count: 0},
  {id: '31' ,name: 'Biography', category: 'Non-fiction', count: 0},
  {id: '32' ,name: 'Business/economics', category: 'Non-fiction', count: 0},
  {id: '33' ,name: 'Crafts/hobbies', category: 'Non-fiction', count: 0},
  {id: '34' ,name: 'Cookbook', category: 'Non-fiction', count: 0},
  {id: '35' ,name: 'Diary', category: 'Non-fiction', count: 0},
  {id: '36' ,name: 'Dictionary', category: 'Non-fiction', count: 0},
  {id: '37' ,name: 'Encyclopedia', category: 'Non-fiction', count: 0},
  {id: '38' ,name: 'Guide', category: 'Non-fiction', count: 0},
  {id: '39' ,name: 'Health/fitness', category: 'Non-fiction', count: 0},
  {id: '40' ,name: 'History', category: 'Non-fiction', count: 0},
  {id: '41' ,name: 'Home and garden', category: 'Non-fiction', count: 0},
  {id: '42' ,name: 'Humor', category: 'Non-fiction', count: 0},
  {id: '43' ,name: 'Journal', category: 'Non-fiction', count: 0},
  {id: '44' ,name: 'Math', category: 'Non-fiction', count: 0},
  {id: '45' ,name: 'Memoir', category: 'Non-fiction', count: 0},
  {id: '46' ,name: 'Philosophy', category: 'Non-fiction', count: 0},
  {id: '47' ,name: 'Prayer', category: 'Non-fiction', count: 0},
  {id: '48' ,name: 'Religion, spirituality, and new age', category: 'Non-fiction', count: 0},
  {id: '49' ,name: 'Textbook', category: 'Non-fiction', count: 0},
  {id: '50' ,name: 'True crime', category: 'Non-fiction', count: 0},
  {id: '51' ,name: 'Review', category: 'Non-fiction', count: 0},
  {id: '52' ,name: 'Science', category: 'Non-fiction', count: 0},
  {id: '53' ,name: 'Self help', category: 'Non-fiction', count: 0},
  {id: '54' ,name: 'Sports and leisure', category: 'Non-fiction', count: 0},
  {id: '55' ,name: 'Travel', category: 'Non-fiction', count: 0},
  {id: '56' ,name: 'True crime', category: 'Non-fiction', count: 0}
 ];
 

function HomeScreen({ navigation, totalPagesRead, averagePages, lastBookInfo }) {
  return (
    <View style={styles.container}>
      <Button title="Enter Book" onPress={() => navigation.navigate('Genre')} />
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.name}>Monde Mkhize</Text>
      <Text>Total Pages Read: {totalPagesRead}</Text>
      <Text>Average Pages per Book: {averagePages}</Text>
      <Text>Last Book Info:</Text>
      <Text>Title: {lastBookInfo.Title}</Text>
      <Text>Author: {lastBookInfo.Author}</Text>
      <Text>Genre: {lastBookInfo.Genre}</Text>
      <Text>Number of Pages: {lastBookInfo.Numberofpages}</Text>
    </View>
  );
}

function GenreScreen({ navigation, updateHomeScreenData }) {
  const [Title, setTitle] = useState('');
  const [Author, setAuthor] = useState('');
  const [Genre, setGenre] = useState('');
  const [Numberofpages, setNumberofpages] = useState('');
  const [bookInfo, setBookInfo] = useState({});
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    loadBookInfo();
  }, []);

  async function loadBookInfo() {
    try {
      const storedBookInfo = await AsyncStorage.getItem('BOOK_INFO');
      if (storedBookInfo) {
        setBookInfo(JSON.parse(storedBookInfo));
      }
    } catch (e) {
      console.error('Failed to load book info.');
    }
  }

  async function saveBookInfo() {
    const bookData = {
      Title,
      Author,
      Genre,
      Numberofpages,
    };
    try {
      await AsyncStorage.setItem('BOOK_INFO', JSON.stringify(bookData));
      setBookInfo(bookData);
      updateHomeScreenData(Numberofpages);
      updateGenreCount(Genre);
    } catch (e) {
      console.error('Failed to save book info.');
    }
  }

  const updateGenreCount = (selectedGenre) => {
    const updatedGenreList = genreList.map((genre) => {
      if (genre.id === selectedGenre) {
        genre.count += 1;
      }
      return genre;
    });
    AsyncStorage.setItem('GENRE_LIST', JSON.stringify(updatedGenreList));
  };

  const handleGenreSelection = (genre) => {
    setGenre(genre);
    setSelectedGenre(genre);
  };

  return (
    <View style={styles.containerGenre}>
      <Button title="Homepage" onPress={() => navigation.navigate('Home')} />
      <Text style={styles.enterbook}>Enter your latest Book</Text>
      <TextInput
        style={styles.TitleEntry}
        placeholder="Title"
        onChangeText={(newText) => setTitle(newText)}
      />
      <TextInput
        style={styles.TitleEntry}
        placeholder="Author"
        onChangeText={(newText) => setAuthor(newText)}
      />
      <Picker
        selectedValue={selectedGenre}
        onValueChange={handleGenreSelection}
      >
        <Picker.Item label="Select Genre" value="" />
        {genreList.map((genre) => (
          <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.TitleEntry}
        placeholder="Number of pages"
        onChangeText={(newText) => setNumberofpages(newText)}
      />
      <Button title="Save Book Info" onPress={saveBookInfo} />
      <Text style={styles.bookInfoText}>Book Info:</Text>
      <Text>Title: {bookInfo.Title}</Text>
      <Text>Author: {bookInfo.Author}</Text>
      <Text>Genre: {bookInfo.Genre}</Text>
      <Text>Number of Pages: {bookInfo.Numberofpages}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const [booksRead, setBooksRead] = useState(0);
  const [lastBookInfo, setLastBookInfo] = useState({});

  const updateHomeScreenData = (pages) => {
    setTotalPagesRead((prevTotal) => prevTotal + parseInt(pages));
    setBooksRead((prevBooks) => prevBooks + 1);
  };

  const averagePages = booksRead > 0 ? totalPagesRead / booksRead : 0;

  useEffect(() => {
    loadLastBookInfo();
  }, []);

  async function loadLastBookInfo() {
    try {
      const storedBookInfo = await AsyncStorage.getItem('BOOK_INFO');
      if (storedBookInfo) {
        setLastBookInfo(JSON.parse(storedBookInfo));
      }
    } catch (e) {
      console.error('Failed to load last book info.');
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {() => <HomeScreen totalPagesRead={totalPagesRead} averagePages={averagePages} lastBookInfo={lastBookInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Genre">
          {({ navigation }) => <GenreScreen navigation={navigation} updateHomeScreenData={updateHomeScreenData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerGenre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 20,
  },
  enterbook: {
    fontSize: 18,
    marginBottom: 10,
  },
  TitleEntry: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  bookInfoText: {
    fontSize: 16,
    marginTop: 20,
  },
});
