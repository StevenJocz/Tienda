import { useEffect, useState } from 'react';
import './Productos.css'
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddProductos from './AddProductos';
import { Table } from '../../dashboard/components/table';

const Productos = () => {
    const [dataProductos, setDataProductos] = useState<any>(null);
    const [verAddProducto, setVerAddProducto] = useState(false);
    const [idProducto, setIdProducto] = useState(0);

    useEffect(() => {
        hadleGetCProdcutos()

    }, []);


    const handleAddProducto = (id: number) => {
        setIdProducto(id);
        setVerAddProducto(true);
    }

    const hadleGetCProdcutos = () => {
        setDataProductos(producto);
    };


    const producto = [
        {
            "id": 1,
            "nombre": "001 - Camiseta negra manga corta para mujer",
            "categorias": "Ropa",
            "aplica_descuento": true,
            "descuento": "20",
            "activo": true,
        },
        {
            "id": 2,
            "nombre": "002 - Polo azul con raqueta malla para hombre",
            "categorias": "Ropa",
            "aplica_descuento": false,
            "descuento": "0",
            "activo": true,
        }
        ,
        {
            "id": 3,
            "nombre": "003 - Camiseta blanco manga corta para hombre",
            "categorias": "Ropa",
            "aplica_descuento": false,
            "descuento": "0",
            "activo": true,
        }
        ,
        {
            "id": 4,
            "nombre": "004 - Camiseta café con escote bandeja para mujer",
            "categorias": "Ropa",
            "aplica_descuento": false,
            "descuento": "0",
            "activo": true,
        }
        ,
        {
            "id": 5,
            "nombre": "005 - Camiseta negra estampada en frente para hombre",
            "categorias": "Ropa",
            "aplica_descuento": false,
            "descuento": "0",
            "activo": true,
        }
    ];


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