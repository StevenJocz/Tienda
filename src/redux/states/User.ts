import { createSlice } from '@reduxjs/toolkit';
import { UsuarioLogin } from '../../models';
import { clearLocalStorage, persistLocalStorage } from '../../utilities';

export const EmptyUserState: UsuarioLogin = {
    idUsuario: 0,
    nombre: '',
    correo: '',
    foto: '',
    tipoUsuario: 0,
    exp: '',
    iat: '',
    nbf: '',

};

export const UserKey = 'user';
export const TokenKey = 'token';

export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : EmptyUserState,
    reducers: {
        createUser: (_state, action) => {
            persistLocalStorage<UsuarioLogin>(UserKey, action.payload);
            return action.payload;
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload };

            persistLocalStorage<UsuarioLogin>(UserKey, result);
            return result;
        },
        resetUser: () => {
            clearLocalStorage(UserKey);
            return EmptyUserState;
        }
    }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
