import React, { useEffect, useState } from 'react';
import './Nav.css';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { IconoComponet } from '../iconoComponet';
import { api } from '../../../../../services';
import { AppStore } from '../../../../../redux/Store';

interface NavLink {
  id: number;
  path: string;
  icon: any;
  title: string;
}

interface Props {
  isOpen: boolean;
}

const Nav: React.FC<Props> = ({ isOpen }) => {
  const location = useLocation();
  const ruta = location.pathname;
  const [dataPermisos, setDataPermisos] = useState<NavLink[]>([]);
  const usuario = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    hadleGetCursos();
  }, []);

  const hadleGetCursos = () => {
    // Solicitud GET
    api.get<any>('User/GetUserPermission', { id: usuario.tipoUsuario }).then((response) => {
      const Filtrados = response.data.map((permiso: any) => ({
        id: permiso.id,
        path: permiso.path,
        icon: permiso.icon,
        title: permiso.title
      }));
      setDataPermisos(Filtrados);
    });
  };

  return (
    <div className='Nav'>
      {isOpen ?  <h1>T</h1> : <h1>TIENDA<span>UNAC</span></h1>}
      <ul>
        {dataPermisos.map((permiso, index) => {
          let isActive = false;
          if (permiso.path === '/Dashboard/Configuracion') {
            isActive = ruta.startsWith(permiso.path);
          } else {
            isActive = ruta === permiso.path;
          }
          const iconClass = isActive ? 'icon_active' : '';
          const navClass = isActive ? 'active' : '';
          return (
            <li key={index} className='Nav_List'>
              <div className={`Nav_List_Content ${navClass}`}>
                <b></b>
                <b></b>
                <Link to={permiso.path}>
                  <span className={`icon ${iconClass} ${isOpen ? 'isOpen' : ''}`}><IconoComponet name={permiso.icon} /></span>
                  {!isOpen && (<span className="Nav_List_Content_Title">{permiso.title}</span>)}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Nav;
