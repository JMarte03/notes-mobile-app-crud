import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component, useState, useEffect } from 'react'

import appFirebase from "../Credenciales";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct } from "firebase/firestore";
import { ListItem, Avatar } from '@rneui/themed';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';
const db = getFirestore(appFirebase)

export default function Notes(props) { // para el enrutamiento
    
  const [lista, setLista] = useState([])
  
  //lógica para llamar la lista de documentos
  useEffect(()=>{
    const getLista = async()=>{
      try {
        const querySnapshot = await getDocs(collection(db, 'notas'))
        const docs = []
        querySnapshot.forEach((doc)=>{
          const {titulo, detalle, fecha, hora} = doc.data()
          docs.push({
            id:doc.id,
            titulo,
            detalle,
            fecha,
            hora
          })
        })
        setLista(docs)
      } catch (error) {
          console.log(error)
      }
    }
    getLista()
  }, [lista])

  return (
      <ScrollView style={styles.mainCtn}>
        <View style={styles.contenedor}>
          {lista.map((note)=>(
            <ListItem bottomDivider key={note.id} onPress={()=>{props.navigation.navigate('Detalles', {
              notaId: note.id
            })}}>
              <ListItemChevron />

              <ListItemContent>
                <ListItemTitle style={styles.titulo}>{note.titulo}</ListItemTitle>
                <ListItemSubtitle style={styles.subtitulo}>{note.fecha}</ListItemSubtitle>
              </ListItemContent>
            </ListItem>
          ))}
        </View>
        <View>
          {/* the line below takes us to 'CreateNotes' screen. It contains a form to create a new note. */}
          <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Crear')}>
            <Text style={styles.btnText}>Agregar nota</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    )
}

const styles = StyleSheet.create({
  mainCtn: {
    backgroundColor: 'white'
  },
  btn: {
    backgroundColor: '#F7B5CA',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5
  },
  btnText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  },
  contenedor: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  titulo: {
    fontSize: 22,
    color: 'gray'
  },
  subtitulo: {
    color: 'gray'
  }
})