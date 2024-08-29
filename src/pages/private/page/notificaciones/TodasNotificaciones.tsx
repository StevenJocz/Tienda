import { Breadcrumbs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppStore } from "../../../../redux/Store";
import { useEffect, useState } from "react";
import { Notificacion } from "../../../../models/Notificaciones";
import { api } from "../../../../services";
import { IconoComponet } from "../../dashboard/components/iconoComponet";
import { IonIcon } from "@ionic/react";
import { timeOutline } from 'ionicons/icons';
import './TodasNotificaciones.css';

const TodasNotificaciones = () => {
    const usuario = useSelector((store: AppStore) => store.user);
    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

    useEffect(() => {
        hadleGetNotifiaciones();
    }, []);

    const hadleGetNotifiaciones = async () => {
        try {
            const response = await api.get<Notificacion[]>('Notificacion/Get_Notifiaciones', {accion: 3, idUsuario: usuario.idUsuario });
            if (response.data.length > 0) {
                setNotificaciones(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const hadlePutNotifiaciones = async (idNotificacion: number) => {
        try {
            const objeto: Notificacion = {
                idNotificacion: idNotificacion,
                idTipoNotificacion: 0,
                deIdUsuario: 0,
                paraIdUsuario: 0,
                leida: false,
                icono: '0',
                notificacion: '0',
                idRelacion: 0,
                orden: 0,
                fecha: "2024-08-26T19:29:02.117Z",
                categoriaFecha: '0',
            };
            var response = await api.put<any>('Notificacion/Put_Actualizar_Estado', objeto);
            const data = response.data as { resultado: boolean; mensaje: string };

            if (data.resultado) {
                hadleGetNotifiaciones();
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Agrupar notificaciones por categoriaFecha
    const groupedNotifications = notificaciones.reduce((acc, notificacion) => {
        const category = notificacion.categoriaFecha;
        if (!acc[category]) acc[category] = [];
        acc[category].push(notificacion);
        return acc;
    }, {} as Record<string, Notificacion[]>);

    // Verificar si hay notificaciones para alguna categoría
    const hasNotifications = Object.keys(groupedNotifications).length > 0;

    return (
        <div className="TodasNotificaciones">
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                <Typography color="text.primary">Notificaciones</Typography>
            </Breadcrumbs>
            <h2>Notificaciones</h2>
            <div className="TodasNotificaciones_Content">
                {hasNotifications ? (
                    Object.entries(groupedNotifications).map(([category, notifications]) => (
                        <div key={category}>
                            <h3>{category}</h3>
                            {notifications.map((notificacion, index) => (
                                <Link
                                    to={notificacion.idTipoNotificacion !== 14 ? (
                                        `/Dashboard/Pedidos/` + notificacion.idRelacion
                                    ) : (
                                        "/Dashboard/Comentarios"
                                    )}
                                    key={index}
                                    onClick={() => hadlePutNotifiaciones(notificacion.idNotificacion)}
                                >
                                    <div className={`TodasNotificaciones_content-items TodasNotificaciones_${notificacion.idTipoNotificacion} ${notificacion.leida ? '' : 'TodasNotificaciones_Nueva'}`}>
                                        <IconoComponet name={notificacion.icono} />
                                        <div className='TodasNotificaciones_content-items-content'>
                                            <p>{notificacion.notificacion}<span> {notificacion.idTipoNotificacion !== 14 ? "Orden #" + notificacion.orden : ""}</span></p>
                                            <p className='items_fecha'> <IonIcon className='iconoFecha' icon={timeOutline} />{notificacion.fecha}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))
                ) : (
                    <Typography variant="body1">Sin notificaciones</Typography>
                )}
            </div>
        </div>
    );
};

export default TodasNotificaciones;
