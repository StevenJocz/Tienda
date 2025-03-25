import { createSlice } from '@reduxjs/toolkit';
import { UsuarioLogin } from '../../models';
import { clearLocalStorage, persistLocalStorage } from '../../utilities';

export const EmptyUserState: UsuarioLogin = {
    idUsuario: 0,
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    documento: '',
    correo: '',
    telefono: '',
    genero: 0,
    tipoUsuario: 0,
    pais: 0,
    departamento: 0,
    ciudad: 0,
    tipoVia: 0,
    numero1: '',
    numero2: '',
    numero3:'',
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
