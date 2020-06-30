export const UPDATE_SECURITYNR = 'UPDATE_SECURITYNR';
export const UPDATE_PHONE = 'UPDATE_PHONE';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_COUNTRY = 'UPDATE_COUNTRY';
export const RESET_INFO = 'RESET_INFO';

const initialState = {
  securityNr: '',
  phone: '',
  country: '',
};

export const updateSecurityNr = securityNr => ({
  type: UPDATE_SECURITYNR,
  securityNr,
});

export const updatePhone = phone => ({
  type: UPDATE_PHONE,
  phone,
});

export const updateEmail = email => ({
  type: UPDATE_EMAIL,
  email,
});

export const updateCountry = country => ({
  type: UPDATE_COUNTRY,
  country,
});

export const resetInfo = () => ({
  type: RESET_INFO,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SECURITYNR:
      return {
        ...state,
        securityNr: action.securityNr,
      };
    case UPDATE_PHONE:
      return {
        ...state,
        phone: action.phone,
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case UPDATE_COUNTRY:
      return {
        ...state,
        country: action.country,
      };
    case RESET_INFO:
      state = [];
    default:
      return state;
  }
};