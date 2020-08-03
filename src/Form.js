import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateSecurityNr, updatePhone, updateCountry, updateEmail, resetInfo } from './redux/form';
import { updateCountries } from './redux/countries';
import RNPickerSelect from 'react-native-picker-select';

class Form extends Component {
  state = {
    securityNr: this.props.form.securityNr || '',
    phone: this.props.form.phone || '',
    email: this.props.form.email || '',
    country: this.props.form.country || '',
    countriesList: this.props.countries.countries || [],
    securityNrError: '',
    phoneError: '',
    emailError: '',
    countryError: '',
    message: ''
  };

  componentDidMount() {
    if (Object.keys(this.state.countriesList).length < 1) {
      this.getCountries();
    }
  }

  getCountries() {
    fetch('https://restcountries.eu/rest/v2/all', {
      method: 'GET'
    })
    .then((response) => response.json())
      .then((responseJson) => {
        //Success 
        let list = [];
        Object.entries(responseJson).forEach(([key, value]) => {
          list.push(value.name);
        });

        this.setState({ countriesList: list });
        this.props.dispatch(updateCountries(list));
    })
    .catch((error) => {
        //Error 
        console.error(error);
    });
  }

  handleChange = (key, val) => {
    this.setState({ [key]: val },
      function() { 
        switch (key) {
          case 'securityNr':
            this.props.dispatch(updateSecurityNr(this.state.securityNr));
          case 'phone':
            this.props.dispatch(updatePhone(this.state.phone));
          case 'email':
            this.props.dispatch(updateEmail(this.state.email));
          default:
            return null;
        }
      }
    );
  }

  handleCountry = (val) => {
    this.setState({ country: val },
      function() { 
        this.props.dispatch(updateCountry(this.state.country));
      }
    );
  }
  
  validateFields = () => {
    // Social security number validation
    securityValidate = false;
    let month, date, shortYear, fullYear;
  
    if (this.state.securityNr.length == 12) {
      fullYear = parseInt(this.state.securityNr.substr(0,4));
      month = parseInt(this.state.securityNr.substr(4,2));
      date = parseInt(this.state.securityNr.substr(6,2));
  
      if (month < 13 && date < 32 && fullYear > (new Date().getFullYear() - 120) && fullYear < (new Date().getFullYear())) {
        securityValidate = true;
      } else {
        securityValidate = false;
      }
    }
    
    if (!this.state.securityNr) {
      this.setState({securityNrError: 'This field is required'});
    } else if (securityValidate == false) {
      this.setState({securityNrError: 'The social security number incorrect'});
    } else {
      this.setState({securityNrError: ''});
    }
  
    // Phone number validation
    const phoneRegex = /0([-\s]?\d){7,13}$/;
    if (this.state.phone && !(phoneRegex.test(this.state.phone))) {
      this.setState({phoneError: 'The number you have entered is incorrect'});
    } else if (!this.state.phone) {
      this.setState({phoneError: 'This field is required'});
    } else {
      this.setState({phoneError: ''});
    }
  
    // Email validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.email && !(emailRegex.test(this.state.email)) ) {
      this.setState({emailError: 'The email you entered is invalid'});
    } else if (!this.state.email) {
      this.setState({emailError: 'This field is required'});
    } else {
      this.setState({emailError: ''});
    }
  
    // Country validation
    if (!this.state.country) {
      this.setState({countryError: 'This field is required'});
    } else {
      this.setState({countryError: ''});
    }

    setTimeout(() => {
      this.validateForm(this.state.securityNrError, this.state.phoneError, this.state.emailError, this.state.countryError);
    }, 200)
  };

  validateForm = (security, phone, email, country) => {
    if (security.length < 1 && phone.length < 1 && email.length < 1 && country < 1) {
      console.log('Success');
      this.props.dispatch(resetInfo());

      this.setState({message: 'Your form was submitted successfully'});

      this.setState({ 
        securityNr: '',
        phone: '',
        email: '',
        country: ''
      });
    }
  }

  render() {
    const countriesItems = [];  
    Object.entries(this.state.countriesList).forEach(([key, item]) => {
      countriesItems.push({label: item, value: item, key: key});
    });

    return (
      <SafeAreaView style={styles.outerWrapper}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.container}>
            <Text style={styles.heading}>Application Form</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Fill in your social security number</Text>
              <TextInput 
                style={styles.input}
                placeholder='YYYYMMDDXXXX'
                keyboardType = 'numeric'
                onChangeText={val => this.handleChange('securityNr', val)}
                value={this.state.securityNr}
                />
              {this.state.securityNrError ? <Text style={styles.error}>{this.state.securityNrError}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Fill in your phone number</Text>
              <TextInput
                style={styles.input}
                placeholder='0709987766'
                keyboardType = 'numeric'
                onChangeText={val => this.handleChange('phone', val)}
                value={this.state.phone}
              />
              {this.state.phoneError ? <Text style={styles.error}>{this.state.phoneError}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Fill in your email</Text>
              <TextInput
                style={styles.input}
                placeholder='example@email.com'
                keyboardType='email-address'
                autoCapitalize = 'none'
                onChangeText={val => this.handleChange('email', val)}
                value={this.state.email}
              />
              {this.state.emailError ? <Text style={styles.error}>{this.state.emailError}</Text> : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Choose your country</Text>
              <RNPickerSelect
                onValueChange={val => this.handleCountry(val)}
                placeholder={{
                  label: 'Select country',
                  value: null,
                }}
                value={this.state.country}
                items={countriesItems}
                style={pickerSelectStyles}
                Icon={() => {
                  return <Text style={styles.arrow}>◣</Text>
                }}
              />
              {this.state.countryError ? <Text style={styles.error}>{this.state.countryError}</Text> : null}
            </View>

            {this.state.message ? <Text style={styles.success}>{this.state.message}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={this.validateFields}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  outerWrapper: {
    backgroundColor: '#f0f8fa',
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginVertical: 20
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 40,
    width: '100%'
  },
  field: {
    marginBottom: 30,
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'column',
    maxWidth: 500,
  },
  label: {
    color: '#1f1f1f',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    color: '#1f1f1f',
    width: '100%',
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  error: {
    color: '#ff0000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4
  },
  button: {
    backgroundColor: '#34a8ed',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 4,
    maxWidth: 500,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrow: {
    height: 30,
    position: 'absolute',
    right: 10,
    top: 14,
    fontSize: 12,
    color: '#9e9e9e',
    transform: [{ rotate: '-45deg' }]
  },
  success: {
    color: 'green',
    marginBottom: 20,
    fontWeight: 'bold'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    color: '#1f1f1f',
    backgroundColor: '#fff'
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    color: '#1f1f1f',
    backgroundColor: '#fff'
  },
});

const mapStateToProps = state => ({
  form: state.form,
  countries: state.countriesList,
});

export default connect(mapStateToProps)(Form);
