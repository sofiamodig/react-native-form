export const UPDATE_COUNTRIES = 'UPDATE_COUNTRIES';

const initialState = {
  countries: [],
};

export const updateCountries = countries => ({
  type: UPDATE_COUNTRIES,
  countries,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
      };
    default:
      return state;
  }
};