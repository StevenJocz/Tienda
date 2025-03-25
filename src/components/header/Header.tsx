import './Header.css'
import img1 from '../../assets/img/right-img.webp'

const Header = () => {
    return (
        <div className='Header'>
            <div className='Header_Content'>
                <div className='Header_Content--text'>
                    <h3>Expresar tu orgullo</h3>
                    <h2>Universitario</h2>
                    <h1>Tienda unac</h1>
                </div>
                <img src={img1} alt="Tienda UNAC" />
                <img className='svg' src="https://congreso.unac.edu.co/assets/bg_dots-CqYKVHww.svg" alt="" />
            </div>
        </div>
    )
}

export default Header