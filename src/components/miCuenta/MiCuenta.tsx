import './MiCuenta.css'
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { api } from '../../services';
import { Usuario } from '../../models';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/Store';
import InformacionPersonal from './InformacionPersonal';
import CambiarDireccion from './CambiarDireccion';
import CambioClave from './CambioClave';

interface Props {
    onClose: () => void;
}

const MiCuenta: React.FC<Props> = (props) => {
    const [menu, setMenu] = useState(1);

    const usuario = useSelector((store: AppStore) => store.user);
    const [datosUsuarios, setDatosUsuarios] = useState<Usuario>();

    useEffect(() => {
        hadleGetUsuarios();

    }, []);

    const hadleGetUsuarios = async () => {

        const response = await api.get<Usuario[]>('Usuario/Get_UsuarioID', { IdUsuario: usuario.idUsuario });
        if (response.data.length > 0) {
            setDatosUsuarios({
                idUsuario: response.data[0].idUsuario,
                idTipoUsuario: response.data[0].idTipoUsuario,
                nombre: response.data[0].nombre,
                apellido: response.data[0].apellido,
                idTipoDocumento: response.data[0].idTipoDocumento,
                documento: response.data[0].documento,
                fechaNacimiento: response.data[0].fechaNacimiento,
                celular: response.data[0].celular,
                idPais: response.data[0].idPais,
                idDepartamento: response.data[0].idDepartamento,
                idMunicipio: response.data[0].idMunicipio,
                direccion: response.data[0].direccion,
                correo: response.data[0].correo,
                password: response.data[0].password,
                fechaRegistro: response.data[0].fechaRegistro,
            });
        }
    }

    const handdleMenu = (valor: number) => {
        setMenu(valor);
    }


    return (
        <div className='MiCuenta'>
            <div className='Favoritos--cerrar' onClick={props.onClose}></div>
            <div className='Favoritos_Content'>
                <div className='Favoritos_Content--Encabezado'>
                    <h4>Mi Cuenta</h4>
                    <IonIcon
                        className="icono"
                        onClick={props.onClose}
                        icon={closeOutline}
                    />
                </div>
                <ul>
                    <li className={menu == 1 ? 'Activo' : ''} onClick={() => handdleMenu(1)}>Información personal</li>
                    <li className={menu == 2 ? 'Activo' : ''} onClick={() => handdleMenu(2)}>Residencia</li>
                    <li className={menu == 3 ? 'Activo' : ''} onClick={() => handdleMenu(3)}>Cambio de contraseña</li>
                    <li className={menu == 4 ? 'Activo' : ''} onClick={() => handdleMenu(4)}>Mis compras</li>
                </ul>
                <div className='MiCuenta_Content'>
                    {menu == 1 &&
                        datosUsuarios && (
                            <InformacionPersonal data={datosUsuarios} />
                        )
                    }
                    {menu == 2 &&
                        datosUsuarios && (
                            <CambiarDireccion data={datosUsuarios} />
                        )
                    }
                    {
                        menu == 3 && 
                        <CambioClave/>
                    }
                </div>
            </div>
        </div>
    )
}

export default MiCuenta