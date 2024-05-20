import './Header.css'
import img1 from '../../assets/img/camiseta1.png'

const Header = () => {

    return (
        <div className='Header'>
            <div className='Header_Content'>
                <div className='Header_Content--text'>
                    <h3>Expresar tu orgullo</h3>
                    <h2>Universitario</h2>
                    <h1>Tienda unac</h1>
                </div>
                <div className='Header_Content--description'>
                    <button>Shop Now Category</button>
                    <div>
                        <h4>Description</h4>
                        <p>Descubre una experiencia de compra única en Tienda UNAC. Con una amplia selección de productos, facilidades de compra,  Explora nuestro catálogo y benefíciate de ofertas exclusivas.</p>
                    </div>
                </div>
                <img src={img1} alt="" />
            </div>
        </div>
    )
}

export default Header