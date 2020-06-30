import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { updateSecurityNr, updatePhone } from './redux/form';

class Form extends Component {
  state = {
    securityNr: this.props.form.securityNr || '',
    phone: this.props.form.phone || '',
  };

  handleChange = (key, val) => {
    this.setState({ [key]: val });

    switch (key) {
      case 'securityNr':
        this.props.dispatch(updateSecurityNr(this.state.securityNr));
      case 'phone':
          this.props.dispatch(updatePhone(this.state.phone));
      default:
        return null;
    }
  }
  
  handleSubmit = () => {
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Fill in your social security number</Text>
        <TextInput
          placeholder="Social security number"
          keyboardType = 'numeric'
          onChangeText={val => this.handleChange('securityNr', val)}
          value={this.state.securityNr}
        />

        <Text>Fill in your phone number</Text>
        <TextInput
          placeholder="Phone number"
          keyboardType = 'numeric'
          onChangeText={val => this.handleChange('phone', val)}
          value={this.state.phone}
        />

        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
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

const mapStateToProps = state => ({
  form: state.form,
});

export default connect(mapStateToProps)(Form);