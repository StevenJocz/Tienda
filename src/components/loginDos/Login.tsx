

import { useState } from 'react';
import './Login.css'
import { ComponenteActual } from '../../models/Login';
import { Iniciar, Registro } from '../loginDos';


interface Props {
    mostrarInicio: () => void;
    onClose: () => void;
}

const Login: React.FC<Props> = (props) => {

    const [componenteActual, setComponenteActual] = useState(ComponenteActual.Iniciar);

    const mostrarIniciar = (componente : string) => {
        setComponenteActual(componente);
    };

    return (
        <div className='Login'>
            <div className='Login_content-cerrar' onClick={props.onClose}> </div>
            {componenteActual === ComponenteActual.Iniciar && (
                <div className="Login_content">
                    <Iniciar  mostrarRegistro={() => mostrarIniciar(ComponenteActual.Registro)} onClose={props.onClose} />
                </div>
            )}
            {componenteActual === ComponenteActual.Registro && (
                <div className="Login_content">
                    <Registro mostrarInicio={() => mostrarIniciar(ComponenteActual.Iniciar)} onClose={props.onClose} />
                </div>
            )}

        </div>
    )
}

export default Login