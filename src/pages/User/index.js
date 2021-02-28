import React, {useEffect} from 'react';
import {useState} from 'react/cjs/react.development';
import PropTypes from 'prop-types';

import api from '../../service/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Author,
  Title,
} from './styles';

const User = ({navigation}) => {
  const [user, setUser] = useState({});
  const [stars, setStars] = useState([]);

  useEffect(() => {
    async function loadStarreds() {
      const userObj = navigation.getParam('user');

      const response = await api.get(`/users/${userObj.login}/starred`);
      setStars([...response.data]);
      setUser(userObj);
    }
    loadStarreds();
  }, []);
  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar}} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      <Stars
        data={stars}
        keyExtractor={(star) => String(star.id)}
        renderItem={({item}) => (
          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
};

User.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default User;
