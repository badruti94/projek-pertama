import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { useState } from 'react'
import { Button, TextInput, ToastAndroid, View } from 'react-native'
import { useEffect } from 'react/cjs/react.development'

const Form = ({ type, ...rest }) => {
    const [judul, onChangeJudul] = useState('')
    const [isi, onChangeIsi] = useState('')
    const [buttonTitle, setButtonTitle] = useState('simpan')

    const buttonHandler = async () => {
        if (type === 'simpan') {
            const note = {
                id: Math.floor(Math.random() * 1000000),
                judul,
                isi,
                tanggal: Date.now()
            }

            const notesString = await AsyncStorage.getItem('notes')
            const notes = notesString ? JSON.parse(notesString) : []
            notes.push(note)
            AsyncStorage.setItem('notes', JSON.stringify(notes))
            .then(res => {
                ToastAndroid.show('Berhasil disimpan', 1000)
            })
        } else {
            const note = {
                id: Math.floor(Math.random() * 1000000),

            }

            const notesString = await AsyncStorage.getItem('notes')
            const notes = JSON.parse(notesString)
            const newNotes = notes.map(note => {
                if (note.id === rest.id) {
                    return {
                        ...note,
                        judul,
                        isi,
                        tanggal: Date.now()
                    }
                } else {
                    return note;
                }
            })
            AsyncStorage.setItem('notes', JSON.stringify(newNotes))
            .then(res => {
                ToastAndroid.show('Berhasil diubah', 1000)
            })
        }
    }

    useEffect(async () => {
        if (type === 'update') {
            setButtonTitle('update')

            const notesString = await AsyncStorage.getItem('notes')
            const notes = JSON.parse(notesString)
            const currentNote = notes.filter((note) => note.id === rest.id)[0];

            onChangeJudul(currentNote.judul)
            onChangeIsi(currentNote.isi)


        }



    }, [])

    return (
        <View>
            <TextInput
                value={judul}
                onChangeText={onChangeJudul}
                placeholder="Masukan Judul"
                

            />
            <TextInput
                style={{
                    borderColor: 'red',
                    backgroundColor: 'orange',
                    justifyContent: 'space-evenly',
                    color: 'white',
                    textAlign: 'left',
                    textAlignVertical: 'top',
                    maxHeight: 252
                }}
                value={isi}
                onChangeText={onChangeIsi}
                placeholder="Masukan Isi"
                multiline={true}
                numberOfLines={14}
            />
            <Button title={buttonTitle} onPress={buttonHandler} />
        </View>
    )
}

export default Form
