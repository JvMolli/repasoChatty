import { REHYDRATE } from 'redux-persist';
import { LOGOUT, SET_CURRENT_USER } from '../constants/constants';

const initialState = {
  loading: true,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const c = { ...state, ...action.user };
      console.log('>>>>>>>>>>>>>>>>>>>>>>', c);
      return c;
    case LOGOUT:
      return { loading: false, ...action.user };
    case REHYDRATE:
      if (!action.payload || !action.payload.auth || !action.payload.auth.jwt) {
        return { state };
      } else {
        return { ...action.payload.auth, loading: false }
      }

    default:
      return state;
  }
};

export default auth;
