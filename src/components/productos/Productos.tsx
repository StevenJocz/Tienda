import './Productos.css'
import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const Productos = () => {
    const producto = [
        {
            "id": 1,
            "nombre": "Camiseta negra manga corta para mujer",
            "categorias": "Ropa",
            "imagenes": [
                {
                    "imagenUno": "https://tennis.vtexassets.com/arquivos/ids/2414705-800-auto?v=638496787580270000&width=800&height=auto&aspect=true",
                    "imagenDos": "https://tennis.vtexassets.com/arquivos/ids/2414709-500-auto?v=638496787586830000&width=500&height=auto&aspect=true"
                }
            ],
            "Bitdescuento": true,
            "descuento": "20",
            "nuevo": true,
        },
        {
            "id": 2,
            "nombre": "Polo azul con raqueta malla para hombre",
            "categorias": "Ropa",
            "imagenes": [
                {
                    "imagenUno": "https://tennis.vtexassets.com/arquivos/ids/2329426-800-auto?v=638465804564770000&width=800&height=auto&aspect=true",
                    "imagenDos": "https://tennis.vtexassets.com/arquivos/ids/2329429-800-auto?v=638465804577500000&width=800&height=auto&aspect=true"
                }
            ],
            "Bitdescuento": false,
            "descuento": "0",
            "nuevo": true,
        }
        ,
        {
            "id": 3,
            "nombre": "Camiseta blanco manga corta para hombre",
            "categorias": "Ropa",
            "imagenes": [
                {
                    "imagenUno": "https://tennis.vtexassets.com/arquivos/ids/2418481-800-auto?v=638501164074900000&width=800&height=auto&aspect=true",
                    "imagenDos": "https://tennis.vtexassets.com/arquivos/ids/2418486-800-auto?v=638501164086200000&width=800&height=auto&aspect=true"
                }
            ],
            "Bitdescuento": false,
            "descuento": "0",
            "nuevo": false,
        }
        ,
        {
            "id": 4,
            "nombre": "Camiseta café con escote bandeja para mujer",
            "categorias": "Ropa",
            "imagenes": [
                {
                    "imagenUno": "https://tennis.vtexassets.com/arquivos/ids/2420950-800-auto?v=638502956262200000&width=800&height=auto&aspect=true",
                    "imagenDos": "https://tennis.vtexassets.com/arquivos/ids/2420958-800-auto?v=638502956274700000&width=800&height=auto&aspect=true"
                }
            ],
            "Bitdescuento": false,
            "descuento": "0",
            "nuevo": false,
        }
        ,
        {
            "id": 5,
            "nombre": "Camiseta negra estampada en frente para hombre",
            "categorias": "Ropa",
            "imagenes": [
                {
                    "imagenUno": "https://tennis.vtexassets.com/arquivos/ids/2416876-800-auto?v=638497717613370000&width=800&height=auto&aspect=true",
                    "imagenDos": "https://tennis.vtexassets.com/arquivos/ids/2417137-800-auto?v=638497757842600000&width=800&height=auto&aspect=true"
                }
            ],
            "Bitdescuento": false,
            "descuento": "0",
            "nuevo": false,
        }
    ];

    return (
        <div className='Productos'>
            <h1>Productos más vendidos</h1>
            <p>Explora nuestros favoritos: los productos más populares de la temporada.</p>
            <div className='Productos_Content'>
                {producto.map((producto, index) => (
                    <div className='Productos_Card' key={index}>
                        <Link to={`/Producto/${producto.id}/${encodeURIComponent(producto.nombre.toLowerCase().replace(/ /g, '-'))}`}>
                            <div className='Productos_Card--img'>
                                {producto.Bitdescuento &&
                                    <h5>En oferta</h5>
                                }
                                {producto.nuevo &&
                                    <h6>Nuevo</h6>
                                }
                                {producto.imagenes.map((imagen, imgIndex) => (
                                    <>
                                        <img className='Productos_Card--img-Uno' src={imagen.imagenUno} alt={`Imagen ${imgIndex}`} />
                                        <img className='Productos_Card--img-Dos' src={imagen.imagenDos} alt={`Imagen ${imgIndex}`} />
                                    </>
                                ))}
                                {producto.Bitdescuento &&
                                    <h3>{producto.descuento}% de descuento</h3>
                                }
                            </div>
                        </Link>
                        <div className='Productos_Card--info'>
                            <Link to={'/Producto/1'}>
                                <h3>{producto.nombre}</h3>
                            </Link>
                            <div className='Productos_Card--info-valor'>
                                <h5>{producto.categorias}</h5>
                                <IonIcon className='icono' icon={heartOutline} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Productos