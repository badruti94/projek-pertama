import React, { useState } from 'react'
import styles from '../styles'
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { ScrollView, Text, View, Button, Alert } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';





const ItemTes = ({ id, judul, onPress, getAllNotes }) => {

    const hapusButtonHandler = () => {
        Alert.alert('Hapus', 'Anda yakin akan menghapus?', [
            {
                text: 'Ya',
                onPress: async () => {
                    const notesString = await AsyncStorage.getItem('notes')
                    const notes = JSON.parse(notesString)
                    const newNotes = notes.filter(note => note.id !== id)
                    AsyncStorage.setItem('notes', JSON.stringify(newNotes))
                        .then(res => {
                            getAllNotes()
                        })
                }
            },
            {
                text: 'Tida',
                onPress: () => { }
            },
        ])
    }

    return (
        <View style={styles.item}>
            <Text style={styles.itemText} onPress={() => { onPress(id) }} >
                {judul}
            </Text>
            <View style={{ justifyContent: "flex-end", marginLeft: 1 }} >
                <Button style={{ flex: 1 }} title="hapus" color="orange"
                    onPress={hapusButtonHandler}
                />
            </View>
        </View>
    )
}


const Home = ({ navigation }) => {
    const [notes, setNotes] = useState([])
    const isFocused = useIsFocused()

    const getAllNotes = () => {
        AsyncStorage.getItem('notes')
            .then(notesString => {
                if (notesString) {
                    const notes = JSON.parse(notesString).sort((a, b) => b.tanggal - a.tanggal)

                    setNotes(notes)
                }
            })
            .catch(err => console.log('error', err))
    }
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            getAllNotes()
            navigation.setOptions({
                headerRight: () => (
                    <Button
                        onPress={() => { navigation.navigate('Add') }}
                        title="Tambah Note"
                    />
                ),
            })

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    useEffect(() => {
        navigation.addListener(
            'didFocus',
            payload => {
                //call some action here
            }
        );
        navigation.setOptions({

        })
        getAllNotes()
    }, [])

    const itemPressHandler = id => {
        navigation.navigate('Detail', {
            id: id
        })
    }

    return (
        <View>
            <ScrollView>
                {
                    notes.map(note => <ItemTes
                        key={note.judul}
                        id={note.id}
                        judul={note.judul}
                        onPress={itemPressHandler}
                        getAllNotes={getAllNotes}
                    />
                    )
                }


            </ScrollView>
        </View>
    )
}

export default Home