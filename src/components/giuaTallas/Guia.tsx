import { useEffect } from 'react';
import './Guia.css'

const Guia = () => {

    useEffect(() => {
        const mainContainer = document.getElementById('Home_main_Pruduct');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
            console.log(mainContainer)
        }
    }, []);
    return (
        <div className='Guia'>
            <div className='Guia_Content'>
                
            </div>

        </div>
    )
}

export default Guia