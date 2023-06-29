import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const EntityDetail = ({ entityId }) => {
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    // Função para obter os detalhes da entidade pelo ID
    const fetchEntityDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/entities/${entityId}`);
        setEntity(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntityDetails();
  }, [entityId]);

  if (!entity) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name: {entity.name}</Text>
      <Text>Age: {entity.age}</Text>
      <Text>Email: {entity.email}</Text>
      <Text>Telefone: {entity.telefone}</Text>
      <Text>CPF: {entity.cpf}</Text>
    </View>
  );
};

export default EntityDetail;
