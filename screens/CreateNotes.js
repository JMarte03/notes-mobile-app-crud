import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import React, { Component } from "react";

export default function CreateNotes() {
  return (
    <View style={styles.parentCtn}>
      <View style={styles.card} >
        <View style={styles.ctn}>
          <TextInput placeholder="Ingresa el título" style={styles.txtInput} />
          <TextInput placeholder="Ingresa descripción" multiline={true} numberOfLines={4} style={styles.txtInput} />

          {/* date container */}
          <View style={styles.dateCtn}>
            <TextInput placeholder="Fecha" style={styles.dateInput} />
            <TouchableOpacity style={styles.dateBtn}>
              <Text style={styles.subtitle}>Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentCtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flex: 1
  },
  ctn: {
    padding: 20,
    flex: 1,
    gap: 30
  },
  txtInput: {
    borderBottomWidth: .5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 10,
    borderRadius: 7
  },
  dateCtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },     
  dateInput: {
    flexBasis: '70%',
    borderBottomWidth: .5,
    paddingHorizontal: 15,
  },
  dateBtn: {
    backgroundColor: '#F0A8D0',
    borderRadius: 10,
    padding: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18
  }

});
