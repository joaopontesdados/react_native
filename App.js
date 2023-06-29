import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FormScreen">
        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
          options={{
            headerShown: true,
            title: "Inscrição",
            headerStyle: { backgroundColor: '#ff6c00' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            title: 'Editar Dados',
            headerStyle: { backgroundColor: '#ff6c00' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{
            title: 'Lista de Inscritos',
            headerStyle: { backgroundColor: '#ff6c00' },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTel] = useState('');
  const [cpf, setCpf] = useState('');
  const [description, setDescription] = useState('');
  const [dadosFormulario, setDadosFormulario] = useState({});
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    fetch('http://192.168.100.82:4000/entities')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setDadosFormulario(data[0]);
          setShowEditButton(true);
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
      });
  }, []);

  const handleAgeChange = (text) => {
    const limitedText = text.slice(0, 4);
    const numericText = limitedText.replace(/[^0-9]/g, '');
    setAge(numericText);
  };

  const handleSend = () => {
    const dados = {
      name,
      age,
      email,
      telefone,
      cpf,
      description,
    };
    setName('');
    setAge('');
    setEmail('');
    setTel('');
    setCpf('');
    setDescription('');
    setDadosFormulario(dados);
    setShowEditButton(true);

    fetch('http://192.168.100.82:4000/entities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados enviados:', data);
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao enviar os dados. Por favor, tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscrição - Show de Talentos em Recife!</Text>
      <Text style ={styles.titles}>Preencha seus dados:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={handleAgeChange}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTel}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listButton}
        onPress={() => navigation.navigate('ListScreen')}
      >
        <Text style={styles.listButtonText}>Ver Lista de Inscritos</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

function EditScreen({ route, navigation }) {
  const { id, name, age, email, telefone, cpf, description } = route.params;

  const [editedName, setEditedName] = useState(name);
  const [editedAge, setEditedAge] = useState(age.toString());
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedTelefone, setEditedTel] = useState(telefone);
  const [editedCpf, setEditedCpf] = useState(cpf);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleAgeChange = (text) => {
    const limitedText = text.slice(0, 4);
    const numericText = limitedText.replace(/[^0-9]/g, '');
    setEditedAge(numericText);
  };

  const handleSave = () => {
    const editedData = {
      id,
      name: editedName,
      age: parseInt(editedAge),
      email: editedEmail,
      telefone: editedTelefone,
      cpf: editedCpf,
      description: editedDescription,
    };

    fetch(`http://192.168.100.82:4000/entities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados atualizados:', data);
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.');
      });
      alert('Novos Dados Atualizados com Sucesso!');
  };

    const handleDelete = () => {
    fetch(`http://192.168.100.82:4000/entities/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Dados excluídos com sucesso');
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao excluir os dados. Por favor, tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Dados</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={editedName}
        onChangeText={setEditedName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={editedAge}
        onChangeText={handleAgeChange}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={editedEmail}
        onChangeText={setEditedEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={editedTelefone}
        onChangeText={setEditedTel}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={editedCpf}
        onChangeText={setEditedCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={editedDescription}
        onChangeText={setEditedDescription}
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  );
}

function ListScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.100.82:4000/entities')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao excluir o dado.')
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://192.168.100.82:4000/entities/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Dados excluídos com sucesso');
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao excluir os dados. Por favor, tente novamente.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Inscritos</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.listItem}>
            <TouchableOpacity
              style={styles.listItemButton}
              onPress={() => navigation.navigate('EditScreen', item)}
            >
              <Text style={styles.listItemText}>Nome: {item.name}</Text>
              <Text style={styles.listItemText}>Idade: {item.age}</Text>
              <Text style={styles.listItemText}>Talento: {item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ff6c00',
    padding: 10,
    borderRadius: 5,
    //marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listButton: {
    backgroundColor: '#ff6c00',
    padding: 10,
    borderRadius: 5,
    marginTop: 24,
  },
  listButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItem: {
    Direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemButton: {
    flex: 1,
    //marginRight: 1,
    padding: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  listItemText: {
   // marginBottom: 1,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

