import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { updateSecurityNr, updatePhone, updateCountry } from './redux/form';
import RNPickerSelect from 'react-native-picker-select';

class Form extends Component {
  state = {
    securityNr: this.props.form.securityNr || '',
    phone: this.props.form.phone || '',
    country: this.props.form.country || '',
  };

  handleChange = (key, val) => {
    this.setState({ [key]: val });

    console.log(key)
    switch (key) {
      case 'securityNr':
        this.props.dispatch(updateSecurityNr(this.state.securityNr));
      case 'phone':
        this.props.dispatch(updatePhone(this.state.phone));
      default:
        return null;
    }
  }

  handleCountry = (val) => {
    this.setState({ country: val },
      function() { 
        this.props.dispatch(updateCountry(this.state.country));
      }
    );
  }
  
  handleSubmit = () => {
    console.log('success')
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Fill in your social security number</Text>
        <TextInput
          placeholder='Social security number'
          keyboardType = 'numeric'
          onChangeText={val => this.handleChange('securityNr', val)}
          value={this.state.securityNr}
        />

        <Text>Fill in your phone number</Text>
        <TextInput
          placeholder='Phone number'
          keyboardType = 'numeric'
          onChangeText={val => this.handleChange('phone', val)}
          value={this.state.phone}
        />

        <Text>Choose your country</Text>
        <RNPickerSelect
            onValueChange={val => this.handleCountry(val)}
            placeholder={{
              label: 'Select a country...',
              value: null,
            }}
            value={this.state.country}
            items={[
                { label: 'Sweden', value: 'sweden', key: '1' },
                { label: 'Norway', value: 'norway', key: '2' },
                { label: 'Denmark', value: 'denmark', key: '3' },
            ]}
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