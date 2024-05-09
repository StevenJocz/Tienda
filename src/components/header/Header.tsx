import './Header.css'
import img1 from '../../assets/img/camiseta1.png'

const Header = () => {
    return (
        <div className='Header'>
            <div className='Header_Content'>
                <div className='Header_Content--text'>
                    <h3>Beats Solo</h3>
                    <h2>Wireless</h2>
                    <h1>headphone</h1>
                </div>
                <div className='Header_Content--description'>
                    <button>Shop Now Category</button>
                    <div>
                        <h4>Description</h4>
                        <p>There are many variations passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                    </div>
                </div>
                <img src={img1} alt="" />
            </div>
        </div>
    )
}

export default Header