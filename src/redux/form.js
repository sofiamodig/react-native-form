export const UPDATE_SECURITYNR = 'UPDATE_SECURITYNR';
export const UPDATE_PHONE = 'UPDATE_PHONE';

const initialState = {
  securityNr: '',
  phone: '',
};

export const updateSecurityNr = securityNr => ({
  type: UPDATE_SECURITYNR,
  securityNr,
});

export const updatePhone = phone => ({
  type: UPDATE_PHONE,
  phone,
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
    default:
      return state;
  }
};