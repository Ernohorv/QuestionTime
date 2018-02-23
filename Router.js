import React from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux';
import { LoginForm } from './components/scenes/LoginForm';
import { App } from './App';

const RouterComponent = () => {
    return (

      <Router sceneStyle={{ paddingTop: 65 }}>
          <Stack key = "root">
             <Scene key="login" component={LoginForm} title="Login" />
             <Scene key="app" component={App} title = "Welcome" />
          </Stack>
      </Router>
    );
};

export default RouterComponent;