import { useEffect, useState } from 'react';
import './Productos.css'
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddProductos from './AddProductos';
import { Table } from '../../dashboard/components/table';
import { api } from '../../../../services';

const Productos = () => {
    const [dataProductos, setDataProductos] = useState<any>(null);
    const [verAddProducto, setVerAddProducto] = useState(false);
    const [idProducto, setIdProducto] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetCProdcutos();
        }
    }, [loading]);


    const handleAddProducto = (id: number) => {
        setIdProducto(id);
        setVerAddProducto(true);
    }

    const hadleGetCProdcutos = () => {
        api.get<any>('Producto/Get_Productos', { accion: 1 }).then((response) => {
            const productos = response.data.map((producto: any) => ({
                id: producto.id,
                foto: producto.imagenes[0].imagenUno, 
                producto: producto.nombre,
                categoría: producto.categorias,
                descuento:producto.descuento > 0 ? producto.descuento + '%' : '0',
                Stock: producto.existencias,
                nuevo: producto.nuevo,
                activo: producto.activo
            }));
            setDataProductos(productos);
            setLoading(false);
        })
    };



    return (
        <div className='Productos'>
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    Dashboard
                </Link>
                {verAddProducto == true && (
                    <Link to="/Dashboard/Productos" onClick={() => setVerAddProducto(false)} color="inherit">
                        Productos
                    </Link>
                )}
                <Typography color="text.primary">{verAddProducto == true ? ('Crear Producto') : ('Productos')}</Typography>
            </Breadcrumbs>
            {verAddProducto == true ? (
                <AddProductos mostrarRegistro={() => setVerAddProducto(false)} idProducto={idProducto} actualizarDatos={hadleGetCProdcutos} />

            ) : (
                <>
                    <h2>Productos</h2>
                    <div className="Layout_contenedor">
                        {dataProductos && (
                            <Table
                                data={dataProductos}
                                mostrarRegistro={handleAddProducto}
                                verBotonEditar={true}
                                verBotonBuscador={true}
                                verBotonExportar={true}
                                verBotonRegistro={true}
                            />
                        )}
                    </div>
                </>
            )}

        </div>
    )
}

export default Productos