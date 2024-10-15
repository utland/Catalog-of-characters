import React from "react";
import CharacterType from "../interfaces/CharacterType";

interface modalOperationsType {
    openModal: (character: CharacterType) => void,
    closeModal: () => void
}

const defaultValue: modalOperationsType = {
    openModal: () => {},
    closeModal: () => {}
};

const ModalOperations = React.createContext<modalOperationsType>(defaultValue)

export default ModalOperations;