import { REHYDRATE } from 'redux-persist';
import { LOGOUT, SET_CURRENT_USER } from '../constants/constants';

const initialState = {
  loading: true,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case SET_CURRENT_USER:
      const c = { ...state, ...action.user };
      console.log('>>>>>>>>>>>>>>>>>>>>>>', c);
      return c;
    case LOGOUT:
      return { loading: false, ...action.user };
    case REHYDRATE:
      console.log('REHYDRATINGGG');
      if (!action.payload || !action.payload.auth || !action.payload.auth.jwt) {
        return { state };
      }
      return { ...action.payload.auth, loading: false };

    default:
      return state;
  }
};

export default auth;
