import { useRef, useState } from "react";
import { Provider } from "react-redux";
import './App.scss'
import store from "./redux/store";
import SearchContext from "./context/SearchValue";
import ModalOperations from "./context/modalOperations";
import CharacterType from "./interfaces/CharacterType";
import Home from "./components/Home";
import Modal from "./components/Modal";

const defaultCharacter: CharacterType = {
    id: "",
    name: "",
    vision: "",
    rarity: 0,
    title: "",
    description: "",
    gender: "",
    weapon: "", 
    nation: ""
  }

function App() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [modalStatus, setModalStatus] = useState<string>("hidden")
    const [currentChr, setCurrentChr] = useState<CharacterType>(defaultCharacter)
    const refGrayWindow  = useRef<HTMLDivElement>(null);

    const openModal = (character: CharacterType): void => {
        refGrayWindow.current!.style.display = "block";
        document.body.style.overflow = "hidden";
        setModalStatus("opened");
        setCurrentChr(character);
      }
    
    const closeModal = (): void => {
        refGrayWindow.current!.style.display = "none";
        document.body.style.overflow = "auto";
        setModalStatus("hidden");
        setCurrentChr(defaultCharacter);
      }

    return(
        <Provider store={store}>
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <ModalOperations.Provider value={{openModal, closeModal}}>
                    <Home />
                    <Modal character={currentChr} status={modalStatus}/>
                    <div className="gray-window" style={{display: 'none'}} ref={refGrayWindow} onClick={() => closeModal()}></div>
                </ModalOperations.Provider>
            </SearchContext.Provider>
        </Provider>
    )
}

export default App;