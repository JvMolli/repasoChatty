import { LOGOUT, SET_CURRENT_USER } from '../constants/constants';

const initialState = {
  loading: true,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case SET_CURRENT_USER:
      const c = { ...state, ...action.user };
      return c;
    case LOGOUT:
      return { loading: false, ...action.user };
    default:
      return state;
  }
};

export default auth;
