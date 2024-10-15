import { useRef } from "react";
import CharacterType from "../interfaces/CharacterType";

interface ModalType {
    character: CharacterType,
    status: string
}

function Modal({character, status}: ModalType) { 
    if (status.includes("hidden")) return <></>;
    
    const refImg = useRef<HTMLDivElement>(null);
    const {id, vision, rarity, title, description, gender, weapon, nation} = character
    return(
        <div className="modal-block">
            <div ref={refImg}>
                <img src={`https://genshin.jmp.blue/characters/${id.toLowerCase()}/card`} 
                onError={(e) => e.currentTarget.src = "error.jpg"} />
            </div>
            <div className="info">
                <h1 className="titletext">{title}</h1>
                <h2 className="description-text">{description}</h2>
                <div className="statistics">{`Gender: ${gender}`}<br />{`Weapon: ${weapon}`}<br />{`Rarity: ${rarity} stars`}<br />{`Element: ${vision}`}<br />{`City: ${nation}`}</div>
            </div>
            <div className="images">
                <div className="element-img">
                <img src={`https://genshin.jmp.blue/elements/${vision.toLowerCase()}/icon`}
                onLoad={e => e.currentTarget.style.backgroundColor = "white"}/>
                </div>
                {Array(rarity).fill(null).map((_, i) => <img key={i} src="star.png"/>)}
            </div>
        </div>
    )
}

export default Modal;