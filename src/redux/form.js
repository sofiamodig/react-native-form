export const UPDATE_SECURITYNR = 'UPDATE_SECURITYNR';
export const UPDATE_PHONE = 'UPDATE_PHONE';
export const UPDATE_COUNTRY = 'UPDATE_COUNTRY';

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

export const updateCountry = country => ({
  type: UPDATE_COUNTRY,
  country,
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
    case UPDATE_COUNTRY:
      return {
        ...state,
        country: action.country,
      };
    default:
      return state;
  }
};