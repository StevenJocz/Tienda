import { Alert, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { api } from "../../../../services";
import { useEffect, useState } from "react";
import { Table } from "../../dashboard/components/table";
import { services } from "../../../../models";
import { IonIcon } from '@ionic/react';
import { closeOutline, helpOutline } from "ionicons/icons";
import './TodosComentarios.css'
import { Comentario } from "../../../../models/Comentario";


const TodosComentarios = () => {
    const [data, setData] = useState<any>(null);
    const [comentarios, setComentarios] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState('');
    const [idComentario, setIdComentario] = useState(0);

    useEffect(() => {
        if (loading) {
            handleGetComentarios();
        }
    }, [loading]);

    const handleGetComentarios = async () => { // Cambié hadleGetcomentarios a handleGetComentarios
        try {
            const response = await api.get<any>('Comentario/Get_ComentariosAdmin');
            const PedidoFiltrados = response.data.map((comentario: any) => ({
                id: comentario.idComentario,
                imagen: comentario.imagen,
                producto: comentario.producto,
                cliente: comentario.cliente,
                calificacion: comentario.calificacion,
                comentario: comentario.comentario,
                fecha: new Date(comentario.fecha).toISOString().split('T')[0],
                imagenes: comentario.imagenes.length > 0 ? true : false,
                "Visto": comentario.vistoAdmin,
            }));

            setData(PedidoFiltrados);
            setComentarios(response.data);
        } catch (error) {
            console.error("Error al obtener comentarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const handdleMostrarFotos = (id: number) => {
        const comentario = comentarios.find((c: any) => c.idComentario === id);
        if (comentario && comentario.imagenes.length > 0) {
            setSelectedImages(comentario.imagenes.map((img: any) => img.imagen));
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImages([]);
    };

    const handleEliminarComentario = async () => {
        try {
            const comentario = await api.delete<any>(`Comentario/Eliminar_Comentario?idComentario=${idComentario}`);
            const data = comentario.data as { resultado: boolean; mensaje: string; orden: number };

            setMsg(data.mensaje);
            setOpenSnackbar(true);
            handleGetComentarios();
            setIdComentario(0);
            handleClose();
        } catch (error) {
            console.error("Error al eliminar comentario:", error);
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = (id: number) => {
        setOpen(true);
        setIdComentario(id);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleCambiarEstado = async (idComentario: number) => {

        const Objcomentario: Comentario = {
            idComentario: idComentario,
            idProducto: 0,
            idUsuario: 0,
            comentario: "0",
            fecha: new Date(),
            calificacion: 0,
            imagenes: [{
                idComentarioImagen: 0,
                idComentario: 0,
                imagen: "0",
            }],
        };

        try {

            // Solicitud put
            const response = await api.put<any>('Comentario/Put_Actualizar_Comentario', Objcomentario);
            if (response.data.resultado === true) {
                setMsg(data.mensaje);
                setOpenSnackbar(true);
                handleGetComentarios();
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="TodosComentarios">
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                <Typography color="text.primary">Comentarios</Typography>
            </Breadcrumbs>
            <h2>Todas los comentarios</h2>
            <div className="Layout_contenedor">
                {data && (
                    <Table
                        data={data}
                        botonEstado={true}
                        verBotonEliminar={true}
                        verBotonBuscador={true}
                        mostrarFotos={handdleMostrarFotos}
                        eliminarRegistro={handleClickOpen}
                        mostrarRegistro={handleCambiarEstado}
                    />
                )}
            </div>
            {openModal &&
                <div className="TodosComentarios_Modal">
                    <div className="TodosComentarios_Modal_Content" >
                        <div className="TodosComentarios_Modal_Content_Encabezado">
                            <IonIcon
                                className="icono"
                                onClick={handleCloseModal}
                                icon={closeOutline}
                            />
                        </div>
                        <div className="TodosComentarios_Modal_Content_img">
                            {selectedImages && selectedImages.map((img, index) => (
                                img ? <img key={index} src={`${services.url}/${img}`} alt={`Imagen ${index}`} /> : null
                            ))}
                        </div>

                    </div>
                </div>
            }
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="divDialogo">
                    <IonIcon
                        className="iconoDialogo"
                        onClick={handleCloseModal}
                        icon={helpOutline}
                    />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este comentario? Esta acción es irreversible y el comentario será eliminado de forma permanente. Si estás seguro, haz clic en 'Eliminar'. De lo contrario, selecciona 'Cancelar'.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <div>
                        <Button onClick={handleEliminarComentario} autoFocus>
                            Eliminar
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TodosComentarios