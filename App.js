import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Form from './src/Form';
import { store, persistor } from './src/store';

export default class App extends React.Component {
  renderLoading = () => (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <View style={styles.container}>
            <Form />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});