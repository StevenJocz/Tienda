import { configureStore } from '@reduxjs/toolkit';
import { UsuarioLogin } from '../models';
import userSliceReducer from './states/User';

export interface AppStore {
  user: UsuarioLogin;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSliceReducer
  }
});