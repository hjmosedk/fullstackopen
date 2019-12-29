const initialState = { filterValue: '' };

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filterValue: action.data.value };
    default:
      return state;
  }
};

export const newFilter = value => {
  return { type: 'SET_FILTER', data: { value } };
};

export default filterReducer;
