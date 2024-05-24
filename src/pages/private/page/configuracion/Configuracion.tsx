import { Breadcrumbs, Grid, Typography } from '@mui/material'
import './Configuracion.css'
import { Link, Route, useLocation } from 'react-router-dom'
import { IonIcon } from '@ionic/react';
import { layersOutline, bookmarkOutline } from 'ionicons/icons';
import { RoutesWithNotFound } from '../../../../utilities';
import { Categorias } from './categorias';
import Tag from './tag/Tag';
import img from '../../../../assets/img/configuracion.png'

const Configuracion = () => {
    const location = useLocation();
    const ruta = location.pathname.split("/")[3];

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
                                    className={`${ruta == 'Categorias' ? 'LiActive' : ''}`}
                                >
                                    <IonIcon className='icono' icon={layersOutline} />
                                    Categorías
                                </li>
                            </Link>
                            <Link to='/Dashboard/Configuracion/Tag'>
                                <li
                                    className={`${ruta == 'Tag' ? 'LiActive' : ''}`}
                                >
                                    <IonIcon className='icono' icon={bookmarkOutline} />
                                    Tags
                                </li>
                            </Link>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='Configuracion_Content'>
                        <RoutesWithNotFound>
                            <Route path="/" element={
                                <div className='Configuracion_Content-Img'>
                                    <p>En esta sección, puedes personalizar y ajustar los aspectos clave de tu tienda virtual. Configura opciones como las categorías, los tag, entre otras opciones. ¡Asegúrate de revisar y guardar tus cambios para ofrecer la mejor experiencia a tus clientes!</p>
                                    <img src={img} alt="" />
                                </div>} />
                            <Route path="/Categorias" element={<Categorias />} />
                            <Route path="/Tag" element={<Tag />} />
                        </RoutesWithNotFound>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Configuracion