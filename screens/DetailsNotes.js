import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import appFirebase from "../Credenciales";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct } from "firebase/firestore";
const db = getFirestore(appFirebase)


export default function DetailsNotes(props) {
  
  const [nota, setNota] = useState({})
  
  const getOneNote = async(id) => {
    try {
      const docRef = doc(db, 'notas', id)
      const docSnap = await getDoc(docRef)
      setNota(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getOneNote(props.route.params.notaId)
  },[])

  const deleteNote = async(id) => {
    await deleteDoc(doc(db, 'notas', id))
    Alert.alert('Éxito','Nota eliminada con éxito')
    props.navigation.navigate('Notas')
  }

  return (
      <ScrollView style={styles.mainCtn}>
        <View style={styles.contenedor}>
          <Text style={styles.texto}>Título: {nota.titulo}</Text>
          <Text style={styles.texto}>{nota.detalle}</Text>
          <Text style={styles.texto}>Fecha: {nota.fecha}</Text>
          <Text style={styles.texto}>Hora: {nota.hora}</Text>

          <TouchableOpacity style={styles.botonEliminar} onPress={()=>deleteNote(props.route.params.notaId)}>
            <Text style={styles.textoEliminar}>ELIMINAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  mainCtn: {
    backgroundColor: 'white'
  },
  contenedor: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  texto: {
    fontSize: 17,
    color: 'gray',
    fontWeight: '400',
    paddingBottom: 25
  },
  botonEliminar: {
    width: '100%',
    backgroundColor: '#F7B5CA',
    borderRadius: 10,
    marginTop: 10
  },
  textoEliminar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  }
})