import { Breadcrumbs, Grid, Typography } from '@mui/material'
import './Configuracion.css'
import { Link, Route } from 'react-router-dom'
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { layersOutline} from 'ionicons/icons';
import { RoutesWithNotFound } from '../../../../utilities';
import { Categorias } from './categorias';

const Configuracion = () => {
    const [menuConfiguracion, setMenuConfiguracion] = useState(1);
    return (
        <div className='Configuracion'>
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                <Typography color="text.primary">Configuración</Typography>
            </Breadcrumbs>
            <h2>Configuración</h2>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <div className='Configuracion_menu'>
                        <ul>
                            <Link to='/Dashboard/Configuracion/Categorias'>
                                <li
                                    className={`${menuConfiguracion == 3 ? 'LiActive' : ''}`}
                                    onClick={() => setMenuConfiguracion(3)}
                                >
                                    <IonIcon className='icono' icon={layersOutline} />
                                    Categorías
                                </li>
                            </Link>
                            <Link to='/Dashboard/Configuracion/TipoCursos'>
                                <li
                                    className={`${menuConfiguracion == 4 ? 'LiActive' : ''}`}
                                    onClick={() => setMenuConfiguracion(4)}
                                >
                                    <IonIcon className='icono' icon={layersOutline} />
                                    Modalidad
                                </li>
                            </Link>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='Configuracion_Content'>
                        <RoutesWithNotFound>
                            <Route path="/" element={<div>Configuración inicio</div>} />
                            <Route path="/Categorias" element={<Categorias/>} />
                        </RoutesWithNotFound>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Configuracion