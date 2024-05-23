import './Categorias.css';
import { useEffect, useState } from 'react';
import { api } from '../../services';
import { Categoria } from '../../models/categoria';
import { services } from '../../models';

const Categorias = () => {
    const [categoria, setCategoria] = useState<Categoria[] | null>(null);
    const Imagenes_URL = services.url;

    useEffect(() => {
        handleGetCategorias();
    }, []);

    const handleGetCategorias = () => {
        // Solicitud GET
        api.get<any>('Categoria/Get_Categoria', { accion: 2 }).then((response) => {
            setCategoria(response.data);
        });
    };

    // Divide la matriz en submatrices de 3 elementos
    const chunkArray = (array: Categoria[], size: number): Categoria[][] => {
        const result: Categoria[][] = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const categoriasChunks = categoria ? chunkArray(categoria, 3) : [];

    return (
        <div className='Categorias'>
            {categoriasChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className={`Categorias_Content--${chunkIndex % 2 === 0 ? 'Dos' : 'Uno'}`}>
                    {chunk.map((cat, index) => (
                        <div className="" key={index}>
                            <h3>{cat.titulo}</h3>
                            <h2>{cat.descripcion}</h2>
                            <h1>{cat.nombre}</h1>
                            <button>Ver categoría</button>
                            <img src={Imagenes_URL + '/' + cat.imagen} alt="" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Categorias;
