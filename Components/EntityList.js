import axios from 'axios';

useEffect(() => {
    axios
      .get('http://localhost:4000/entities')
      .then((response) => {
        const entities = response.data;
        // Atualize o estado ou faça qualquer manipulação necessária com os registros retornados
      })
      .catch((error) => {
        console.error('Erro ao obter os registros:', error);
      });
  }, []);
  