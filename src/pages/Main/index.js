import React, {useState, useEffect} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../service/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

const Main = ({navigation}) => {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  function findUser() {
    const exists = users.find((user) => user.login === newUser);
    return exists;
  }

  async function handleAddUser() {
    console.tron.log(newUser);
    setLoading(true);

    const response = await api.get(`/users/${newUser}`);

    const {data} = response;

    setLoading(false);

    if (findUser()) {
      return;
    }

    const allUsers = [
      ...users,
      {
        name: data.name,
        login: data.login,
        bio: data.bio,
        avatar: data.avatar_url,
      },
    ];

    setUsers(allUsers);
    setNewUser('');
    await AsyncStorage.setItem('users', JSON.stringify(allUsers));
    const usersStorage = await AsyncStorage.getItem('users');
    console.tron.log(usersStorage);

    Keyboard.dismiss();
  }

  function handleNavigate(user) {
    navigation.navigate('User', {user});
  }

  useEffect(() => {
    async function loadUsers() {
      let usersStorage = await AsyncStorage.getItem('users');
      if (usersStorage) {
        usersStorage = JSON.parse(usersStorage);

        setUsers(usersStorage);
      }
    }
    loadUsers();
  }, []);

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
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={(user) => user.login}
        renderItem={({item}) => (
          <User>
            <Avatar source={{uri: item.avatar}} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
};

Main.navigationOptions = {
  headerTitle: 'Usuários',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Main;
