import './Categorias.css'
import img1 from '../../assets/img/imagen1.png'
import img2 from '../../assets/img/imagen3.png'
import img3 from '../../assets/img/imagen4.png'
import img4 from '../../assets/img/imagen2.png'
import img5 from '../../assets/img/imagen5.png'

const Categorias = () => {
    return (
        <div className='Categorias'>
            <div className="Categorias_Content--Dos">
                <div className="">
                    <h3>Beats Solo</h3>
                    <h2>Wireless</h2>
                    <h1>Estudio</h1>
                    <button>Ver categoría</button>
                    <img src={img1} alt="" />
                </div>
                <div className="">
                    <h3>Beats Solo</h3>
                    <h2>Wireless</h2>
                    <h1>Tiempo libre</h1>
                    <button>Ver categoría</button>
                    <img src={img2} alt="" />
                </div>
                <div className="">
                    <h3>Beats Solo</h3>
                    <h2>Wireless</h2>
                    <h1>Ropa</h1>
                    <button>Ver categoría</button>
                    <img src={img3} alt="" />
                </div>
            </div>
            <div className="Categorias_Content--Uno">
                <div className="">
                    <h3>Beats Solo</h3>
                    <h2>Wireless</h2>
                    <h1>Tegnología</h1>
                    <button>Ver categoría</button>
                    <img src={img4} alt="" />
                </div>
                <div className="">
                    <h3>Beats Solo</h3>
                    <h2>Wireless</h2>
                    <h1>Papeleria</h1>
                    <button>Ver categoría</button>
                    <img src={img5} alt="" />
                </div>
                <div className="">
                    <h3>Beats Solo</h3>
                    <h2>Wireless</h2>
                    <h1>Accesorios</h1>
                    <button>Ver categoría</button>
                    <img src={img2} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Categorias