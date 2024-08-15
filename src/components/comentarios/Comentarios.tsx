import { Rating } from "@mui/material"
import './Comentarios.css'
import { useState } from "react";
import AddComentario from "./AddComentario";

interface Props {
    idProducto: number;
}

const Comentarios : React.FC<Props> = (props) => {
    const [value, setValue] = useState<number | null>(4);
    const [verAddComentario, setVerAddComentario] = useState(false);

    const handleVerAddComentario = () => {
        setVerAddComentario(!verAddComentario);
    };

    return (
        <div className='Comentarios'>
            <div className="Comentarios_Ranting">
                <h3>4 <span> /5</span></h3>
                <Rating
                    name="half-rating-read"
                    max={5}
                    size="large"
                    readOnly
                    value={value}
                />
                <h4>6548 valoraciones y 567 reseñas</h4>
            </div>
            <div className="Comentarios_buton">
                <button onClick={handleVerAddComentario}>Califica este producto</button>
            </div>
            <div className="Comentarios_Content">
                <div className="Comentarios_Content_Card">
                    <div className="Comentarios_Content_Card_Head">
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <h4>Por Pierre Auguste Renoir</h4>
                    </div>
                    <h3>21 de octubre, 12:00 horas</h3>
                    <p>A lo largo de los años, he preferido los productos de Apple. Mi trabajo me ha permitido utilizar productos de Windows en ordenadores portátiles y de sobremesa. En el pasado, he tenido ordenadores portátiles y de sobremesa con Windows para uso doméstico y nunca los volveré a utilizar.</p>
                    <div className="Comentarios_Content_Card_Imagenes">
                        <img src="https://prium.github.io/phoenix/v1.18.1/assets/img/e-commerce/review-14.jpg" alt="" />
                        <img src="https://prium.github.io/phoenix/v1.18.1/assets/img/e-commerce/review-15.jpg" alt="" />
                        <img src="https://prium.github.io/phoenix/v1.18.1/assets/img/e-commerce/review-13.jpg" alt="" />
                    </div>
                </div>
                <div className="Comentarios_Content_Card">
                    <div className="Comentarios_Content_Card_Head">
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <h4>Por Pierre Auguste Renoir</h4>
                    </div>
                    <h3>21 de octubre, 12:00 horas</h3>
                  
                    
                </div>
                <div className="Comentarios_Content_Card">
                    <div className="Comentarios_Content_Card_Head">
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <h4>Por Anonimo</h4>
                    </div>
                    <h3>21 de octubre, 12:00 horas</h3>
                    <p>A lo largo de los años, he preferido los productos de Apple. Mi trabajo me ha permitido utilizar productos de Windows en ordenadores portátiles y de sobremesa. En el pasado, he tenido ordenadores portátiles y de sobremesa con Windows para uso doméstico y nunca los volveré a utilizar.</p>
                    
                </div>
            </div>

            {verAddComentario && <AddComentario onClose={handleVerAddComentario} idProducto={props.idProducto}/>}
            
        </div>
    )
}

export default Comentarios