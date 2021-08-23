import { SAVE_IMAGE } from './actions';

const initState = {};

//REDUCER
const reducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return action.image;
    default:
      return state;
  }
};

export default reducer;
