import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component, useState, useEffect } from 'react'

import appFirebase from "../Credenciales";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct } from "firebase/firestore";
import { ListItem, Avatar } from '@rneui/themed';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
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
  }, [])

  return (
      <ScrollView>
        <View>
          {/* the line below takes us to 'CreateNotes' screen. It contains a form to create a new note. */}
          <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Crear')}>
            <Text style={styles.btnText}>Agregar nota</Text>
          </TouchableOpacity>
        </View>
        <View>
          {lista.map((not)=>{
            <ListItem bottomDivider key={not.id}>
              <ListItemChevron></ListItemChevron>
            </ListItem>
          })}
        </View>


      </ScrollView>
    )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#F7B5CA',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  btnText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  }
})