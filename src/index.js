import React from 'react';
import './config/ReactotronConfig';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Routes from './routes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
    <Routes />
  </>
);

export default App;
