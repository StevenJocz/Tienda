
import { Nav } from '../../../components/nav'
import img1 from '../../../assets/img/imagen1.png'
import './Shop.css'
import { useEffect, useState } from 'react';
import { Slider, Switch } from '@mui/material';
import { Productos } from '../../../components/productos';
import { Link, useLocation } from 'react-router-dom';
import { Categoria } from '../../../models/categoria';
import { api } from '../../../services';


const Shop = () => {

    const MIN = 800;
    const MAX = 1000;
    const [data, setData] = useState<Categoria>();
    const [values, setValues] = useState<[number, number]>([MIN, MAX]);
    const [idCategoria, setIdCategoria] = useState('0');
    const [oferta, setOferta] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const location = useLocation();

    const handleChange = (newValue: number | number[]) => {
        setValues(newValue as [number, number]);
    };
    useEffect(() => {
        setIdCategoria(location.pathname.split("/")[2]);
        if(parseInt(idCategoria) != 0) {
            hadleGetId();
        }
    }, [location.pathname]);


    const hadleGetId = async () => {
        try {
            const response = await api.get<Categoria[]>('Categoria/Get_Id_Categoria', {idCategoria: parseInt(idCategoria) });
            if (response.data.length > 0) {
                setData({
                    idCategoria: response.data[0].idCategoria,
                    nombre: response.data[0].nombre,
                    titulo: response.data[0].titulo,
                    descripcion: response.data[0].descripcion,
                    imagen: response.data[0].imagen,
                    activo: response.data[0].activo, 
                    idTercero: response.data[0].idTercero,
                    fechaCreacion: response.data[0].fechaCreacion,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className='Home'>
            <div className='Home_nav'>
                <Nav />
            </div>
            <div className='Home_main' id='Home_main_Pruduct'>
                <div className='Shop'>
                    <div className='Shop_Categoria'>
                        <div className='Shop_Categoria--titulo'>
                            <h1>TIENDA <span>UNAC</span></h1>
                            <img src={img1} alt="" />
                        </div>
                        <div className='Shop_Categoria--info'>
                            <h3>{data?.titulo}</h3>
                            <h2>{data?.descripcion}</h2>
                            <h1>{data?.nombre}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis autem delectus eum reiciendis.</p>
                        </div>
                    </div>
                    <div className='Shop_body'>
                        <div className="Shop_body--filter">
                            <div className='Shop_body--filter-Categoria'>
                                <h3>Categorías</h3>
                                <ul>
                                    <Link to='/Shop/0/TodasCategorias'>
                                        <li className={`${idCategoria == '0' ? 'active' : ''}`}>
                                            Todas
                                        </li>
                                    </Link>
                                    <Link to='/Shop/1/Estudio'>
                                        <li className={`${idCategoria == '2' ? 'active' : ''}`}>
                                            Estudio
                                        </li>
                                    </Link>
                                    <Link to='/Shop/2/TiempoLibre'>
                                        <li className={`${idCategoria == '3' ? 'active' : ''}`}>
                                            Tiempo libre
                                        </li>
                                    </Link>
                                    <Link to='/Shop/3/Ropa'>
                                        <li className={`${idCategoria == '4' ? 'active' : ''}`}>
                                            Ropa
                                        </li>
                                    </Link>
                                    <Link to='/Shop/4/Tegnologia'>
                                        <li className={`${idCategoria == '5' ? 'active' : ''}`}>
                                            Tecnología
                                        </li>
                                    </Link>
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
                            <div className='Shop_body--filter-Categoria'>
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
                            </div>

                        </div>
                        <div className="Shop_body--card">
                            <Productos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop