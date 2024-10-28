import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default function Notes(props) { // para el enrutamiento
    return (
      <ScrollView>
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