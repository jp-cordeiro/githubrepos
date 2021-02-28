import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../service/api';
import {Container, Form, Input, SubmitButton} from './styles';

const Main = () => {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);

  async function handleAddUser() {
    console.tron.log(newUser);

    const response = await api.get(`/users/${newUser}`);

    const {data} = response;

    setUsers([
      ...users,
      {
        name: data.name,
        login: data.login,
        bio: data.bio,
        avatar: data.avatar_url,
      },
    ]);
    setNewUser('');

    Keyboard.dismiss();
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
        />
        <SubmitButton onPress={handleAddUser}>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
};

Main.navigationOptions = {
  headerTitle: 'Usuários',
};

export default Main;
