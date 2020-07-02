# React native form
This is a react native application that uses typeScript and redux. The entered data is saved in redux persist to be able to reload the app. The storage is emptied upon succesful submit. The form has the following fields: Social security number, Phone number, Email address and Country. 

The Social security number is validated with the following criterias:
1. The number is 12 digits 
2. The year is not in the future and not more than 120 years ago
3. The month is between 1-12.
4. The date is between 1-31

The inputed phone number is validated using regex, which checks if the number is 7-13 digits and starts with a 0. 

The inputed email has a regex validation to check if there is an "@" and ".". 

The countries are fetched from https://restcountries.eu/rest/v2/all and is displayed in a drop-down. 

All the fields are required.

### Improvements
- For an application that is going to use social security number it would be good to look for an API to check if the security number exists. 


### Installation
**project setup**
```
npm install
```

** Run project **
```
npx react-native-start
npx react-native run-ios
```
