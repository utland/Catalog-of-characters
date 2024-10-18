import { useContext } from "react";
import CharacterType from "../interfaces/CharacterType";
import ModalOperations from "../context/modalOperations";
import { useSelector } from "react-redux";
import { IRootState } from "../interfaces/ReduxDefaultTypes";

interface CharacterCardType {
    character: CharacterType
}

function CharacterCard({character}: CharacterCardType) {
    const {id, name, vision, rarity}: CharacterType = character;
    const img = useSelector((state: IRootState) => state.characters.images[name])

    const {openModal} = useContext(ModalOperations);
    return(
    <div className="character" onClick={() => openModal(character)}>
        <div className="img-wrapper">
            <img 
            src={img}
            style={{backgroundColor: rarity === 5 ? "rgb(200,124,36" : "rgb(148,112,187)"}}
            />
        </div>
        <h2 className="name">{!id.includes("traveler") ? name : `Traveler (${vision})`}</h2>
    </div>
    )
}

export default CharacterCard