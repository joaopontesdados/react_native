import axios from 'axios';

const handleSave = () => {
    const data = {
      name: 'Bruno Times',
      age: 19,
      email: 'brunotimes@gmail.com',
      telefone: '81996362484',
      cpf: '14479901420'
      // Outros campos do registro
    };
  
    axios
      .post('http://localhost:4000/entities', data)
      .then((response) => {
        // O registro foi criado com sucesso
      })
      .catch((error) => {
        console.error('Erro ao criar o registro:', error);
      });
  };
  