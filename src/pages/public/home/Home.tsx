
import { Categorias } from '../../../components/categoria'
import { Footer } from '../../../components/footer'
import { Garantia } from '../../../components/garantia'
import { Header } from '../../../components/header'
import { Informativo } from '../../../components/informativo'
import { Nav } from '../../../components/nav'
import { Productos } from '../../../components/productos'
import './Home.css'

const Home = () => {
    return (
        <div className='Home' >
            <div className='Home_nav'>
                <Nav />
            </div>
            <div className='Home_main' id='Home_main'>
                <Header />
                <Categorias />
                <Garantia />
                <Informativo />
                <Productos 
                    titulo="Productos más vendidos"
                    descripcion="Explora nuestros favoritos: los productos más populares de la temporada."
                    filtros={{ categoria: ''}}
                />
                <Footer />
            </div>
        </div>
    )
}

export default Home