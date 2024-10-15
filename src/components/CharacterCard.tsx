import { useContext } from "react";
import CharacterType from "../interfaces/CharacterType";
import ModalOperations from "../context/modalOperations";

interface CharacterCardType {
    character: CharacterType
}

function CharacterCard({character}: CharacterCardType) {
    const {id, name, vision, rarity}: CharacterType = character;

    const {openModal} = useContext(ModalOperations);
    return(
    <div className="character" onClick={() => openModal(character)}>
        <img src={`https://genshin.jmp.blue/characters/${id.toLocaleLowerCase()}/icon-big`} style={{backgroundColor: rarity === 5 ? "rgb(200,124,36" : "rgb(148,112,187)"}} />
        <h2 className="name">{!id.includes("traveler") ? name : `Traveler (${vision})`}</h2>
    </div>
    )
}

export default CharacterCard