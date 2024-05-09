
import './Informativo.css'
import img1 from '../../assets/img/Ecommerce.png'

const Informativo = () => {
  return (
    <div className="Informativo">
        <img src={img1} alt="" />
        <div className='Informativo_Text'>
            <h2>Estilo que inspira</h2>
            <h3>Tu esencia universitaria en cada prenda.</h3>
            <p>Tú espíritu académico se fusiona con la moda. Desde camisetas hasta accesorios exclusivos, encuentra todo lo que necesitas para expresar tu orgullo universitario con estilo.</p>
        </div>
    </div>
  )
}

export default Informativo