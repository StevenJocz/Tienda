
import { Nav } from '../../../components/nav'
import './Shop.css'
import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import { Productos } from '../../../components/productos';
import { Link, useLocation } from 'react-router-dom';
import { Categoria } from '../../../models/categoria';
import { api } from '../../../services';
import { services } from '../../../models';
import img from '../../../assets/img/Logo.png'


const Shop = () => {

    // const MIN = 800;
    // const MAX = 1000;
    const [data, setData] = useState<Categoria[]>([]);
    const [idData, setIdData] = useState<Categoria[]>([]);
    // const [values, setValues] = useState<[number, number]>([MIN, MAX]);
    const [idCategoria, setIdCategoria] = useState(0);
    const [oferta, setOferta] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const location = useLocation();

    // const handleChange = (newValue: number | number[]) => {
    //     setValues(newValue as [number, number]);
    // };
    useEffect(() => {
        setIdCategoria(parseInt(location.pathname.split("/")[2]));
        hadleGetCategorias();
        hadleGetId(parseInt(location.pathname.split("/")[2]));
    }, [location.pathname]);

    const hadleGetCategorias = async () => {
        // Solicitud GET
        await api.get<any>('Categoria/Get_Categoria', { accion: 2 }).then((response) => {
            const categoriasFiltradas = response.data.map((categoria: any) => ({
                idCategoria: categoria.idCategoria,
                foto: categoria.imagen,
                nombre: categoria.nombre,
                activo: categoria.activo
            }));
            setData(categoriasFiltradas);
        })
    };

    const hadleGetId = async (idCategoria: number) => {
        if (idCategoria === 0) {
            setIdData([]);
        } else {
            await api.get<any>('Categoria/Get_Id_Categoria', { idCategoria: idCategoria }).then((response) => {
                const categoriasFi = response.data.map((categoria: any) => ({
                    idCategoria: categoria.idCategoria,
                    imagen: categoria.imagen,
                    nombre: categoria.nombre,
                    descripcion: categoria.descripcion,
                    titulo: categoria.titulo,
                    activo: categoria.activo
                }));
                setIdData(categoriasFi);
            })
        }

    };


    return (
        <div className='Home'>
            <div className='Home_nav'>
                <Nav />
            </div>
            <div className='Home_main' id='Home_main_Pruduct'>
                <div className='Shop'>
                    {idData.length === 0 ? (
                        <div className='Shop_Categoria'>
                            <div className='Shop_Categoria--titulo'>
                                <h1>TIENDA UNAC</h1>
                                <img src={`${img}`} alt="" />
                            </div>
                            <div className='Shop_Categoria--info'>
                                <h3>ESTILO QUE INSPIRA</h3>
                                <h2>TU ESENCIA UNIVERSITARIA EN CADA PRENDA.</h2>
                                <p>Tú espíritu académico se fusiona con la moda. Desde camisetas hasta accesorios exclusivos, encuentra todo lo que necesitas para expresar tu orgullo universitario con estilo.</p>
                            </div>
                        </div>
                    ) : (
                        idData.map((idCategoria, index) => (
                            <div className={`Shop_Categoria Shop_Categoria${idCategoria.idCategoria}`} key={index}>
                                <div className='Shop_Categoria--titulo'>
                                    <h1>{idCategoria.nombre}</h1>
                                    <img src={`${services.url}/${idCategoria.imagen}`} alt="" />
                                </div>
                                <div className='Shop_Categoria--info'>
                                    <h3>{idCategoria.titulo}</h3>
                                    <h2>{idCategoria.descripcion}</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis autem delectus eum reiciendis.</p>
                                </div>
                            </div>
                        ))
                    )}
                    <div className='Shop_body'>
                        <div className="Shop_body--filter">
                            <div className='Shop_body--filter-Categoria'>
                                <h3>Categorías</h3>
                                <ul>
                                    <Link to='/Shop/0/TodasCategorias'
                                        onClick={() => hadleGetId(0)}
                                    >
                                        <li className={`${idCategoria == 0 ? 'active' : ''}`}>
                                            Todas
                                        </li>
                                    </Link>
                                    {data && data.map((categorias, index) => (
                                        <Link
                                            to={`/Shop/${categorias.idCategoria}/${encodeURIComponent(categorias.nombre.toLowerCase().replace(/ /g, '-'))}`}
                                            key={index}
                                            onClick={() => hadleGetId(categorias.idCategoria)}
                                        >
                                            <li className={`${categorias.idCategoria == idCategoria ? 'active' : ''}`}>
                                                {categorias.nombre}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                            <div className='Shop_body--filter-Categoria'>
                                <h3>Filtros</h3>
                                <div>
                                    <Switch
                                        checked={nuevo}
                                        color="warning"
                                        onChange={() => setNuevo(!nuevo)}
                                    />
                                    <label className={nuevo ? 'Activo' : ''}>Nuevo</label>
                                </div>
                                <div>
                                    <Switch
                                        checked={oferta}
                                        color="warning"
                                        onChange={() => setOferta(!oferta)}
                                    />
                                    <label className={oferta ? 'Activo' : ''}>En oferta</label>
                                </div>
                            </div>
                            {/* <div className='Shop_body--filter-Categoria'>
                                <h3>Rango de precios</h3>
                                <Slider
                                    value={values}
                                    onChange={(_, newValue) => handleChange(newValue)}
                                    valueLabelDisplay="auto"
                                    min={MIN}
                                    max={MAX}
                                    step={1}
                                    color="warning"
                                    valueLabelFormat={(value) => `$${value}`}
                                />
                                <div className='filter-valor'>
                                    <p>${values[0]}</p>
                                    <p>${values[1]}</p>
                                </div>
                            </div> */}

                        </div>
                        <div className="Shop_body--card">
                            <Productos
                                titulo=""
                                descripcion=""
                                filtros={{ categoria: idData.length > 0 ? idData[0].nombre : '', nuevo: nuevo, enOferta: oferta }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop