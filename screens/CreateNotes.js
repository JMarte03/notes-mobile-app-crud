import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert} from "react-native";
import React, { Component, useState, useEffect } from "react";
import DateTimePicker  from "@react-native-community/datetimepicker";
import appFirebase from "../Credenciales";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct } from "firebase/firestore";
const db = getFirestore(appFirebase)

export default function CreateNotes(props) {
  
  const initialState = { //captura lo del formulario
    title: '',
    detail: ''
  }

  // Datetime picker states
  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [text, setText] = useState('empty')

  // Other
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [estado, setEstado] = useState(initialState)

  const onChange = (event, selectedDate) => {
    setShow(false); // Close the picker immediately
  
    if (selectedDate) {
      const currentDate = selectedDate instanceof Date ? selectedDate : new Date();
      setDate(currentDate);
  
      let tempDate = new Date(currentDate);
      let fDate = 
        tempDate.getDate() +
        "/" + 
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      let fTime = 
        tempDate.getHours() + ":" + tempDate.getMinutes();
      
      setFecha(fDate);
      setHora(fTime);
    }
  };
  

  const showMode = (currentDate) => {
    setShow(true)
    setMode(currentDate)
  }

  const handleChangeText = (value, name) => {
    setEstado({...estado, [name]:value}) // Para poder guardar las variables sin que se sobreescriban
  }

  const saveNote = async()=>{
    try {
      if(estado.title === '' || estado.title === ''){
        Alert.alert('mensaje importante', 'debes rellenar el campo requerido')
      } else {
          const nota = {
            titulo: estado.title,
            detalle: estado.detail,
            fecha: fecha,
            hora: hora
        }
        await addDoc(collection(db, 'notas'), {
          ...nota
        })
        Alert.alert('Exito', 'guardado con éxtio')
        props.navigation.navigate('Notas') //redirigir a la sección de notas
      }
    } catch (error) {
      console.log(error)
    }
    
    // console.log(nota)
  }

  return (
    <View style={styles.parentCtn}>
      <View style={styles.card} >
        <View style={styles.ctn}>

          {/* handleChangeText captura el valor introducido en el input */}
          <TextInput placeholder="Ingresa el título" style={styles.txtInput} value={estado.title} onChangeText={(value)=>handleChangeText(value, 'title')}  /> 
          <TextInput placeholder="Ingresa descripción" multiline={true} numberOfLines={4} style={styles.txtInput} value={estado.detail} onChangeText={(value)=>handleChangeText(value, 'detail')} />

          {/* date container */}
          <View style={styles.dateTimeCtn}>
            <TextInput placeholder="Fecha" style={styles.dateTimeInput} value={fecha} />
            <TouchableOpacity style={styles.dateTimeBtn} onPress={()=>showMode('date')}>
              <Text style={styles.subtitle}>Date</Text>
            </TouchableOpacity>
          </View>

          {/* time container */}
          <View style={styles.dateTimeCtn}>
            <TextInput placeholder="Hora" style={styles.dateTimeInput} value={hora} />
            <TouchableOpacity style={styles.dateTimeBtn} onPress={()=>showMode('time')}>
              <Text style={styles.subtitle}>Hour</Text>
            </TouchableOpacity>
          </View>

          { show && (
            <DateTimePicker 
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimunDate={new Date("2024-1-1")}
            />
          )}

          {/* Submit button */}
          <View>
            <TouchableOpacity style={styles.submitButton} onPress={saveNote} >
              <Text style={styles.submitBtnTxt}>Guardar</Text>
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
  dateTimeCtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },     
  dateTimeInput: {
    flexBasis: '70%',
    borderBottomWidth: .5,
    paddingHorizontal: 15,
  },
  dateTimeBtn: {
    backgroundColor: '#F0A8D0',
    borderRadius: 10,
    padding: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18
  },
  submitButton: {
    backgroundColor: '#B71375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  submitBtnTxt: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  }

});