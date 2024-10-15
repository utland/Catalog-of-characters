import { useEffect, useRef, useState } from 'react'
import Catalog from './components/Catalog'
import './App.scss'
import SearchContext from './context/SearchValue';
import SearchInput from './components/SearchInput';
import Modal from './components/Modal';
import CharacterType from './interfaces/CharacterType';
import ModalOperations from './context/modalOperations';
import sortByEnum from './enums/sortByEnum';
import orderEnum from './enums/orderEnum';
import Sort from './components/Sort';

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
  const [names, setNames] = useState<string[]>([]);
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [sortedList, setSortedList] = useState<CharacterType[]>([]);
  const [currentChr, setCurrentChr] = useState<CharacterType>(defaultCharacter)
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortBy, setSortBy] = useState<sortByEnum>(sortByEnum.NAME)
  const [order, setOrder] = useState<orderEnum>(orderEnum.DESCENDENT)
  const [isError, setIsError] = useState<boolean>(false)
  const [modalStatus, setModalStatus] = useState<string>("hidden")
  const refGrayWindow  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchNames() {
      try {
        const response = await fetch("https://genshin.jmp.blue/characters");
        const data = await response.json()
  
        setNames(data);
      } catch (error) {
        setIsError(true);
      }
    }

    fetchNames();
  }, []);
  
  useEffect(() => {
    async function fetchData(name: string) {
      try {
        const response = await fetch(`https://genshin.jmp.blue/characters/${name}`);
        const list = await response.json();

        setCharacters((els) => els.some(e => e.id === list.id) ? els : [...els, list])
      } catch (error) {
        setIsError(true)
      }
    }

    if (!isError) {
      names.forEach((name) => {
        fetchData(name)
      })
    }
  }, [names])

  useEffect(() => {
    const renewedList = sortCharacters();
    setSortedList(renewedList)
  }, [searchValue, characters, sortBy, order])

  const sortCharacters = (): CharacterType[] => {
    return characters
    .filter((e) => e.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    .sort((a, b) => {
      const response = order === "asc" ? a[sortBy] <= b[sortBy] : a[sortBy] >= b[sortBy]
      return response ? 1 : -1;
    })
  }

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

  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <ModalOperations.Provider value={{openModal, closeModal}}>
        {isError ? "Oops, something went wrong..." :
        <>
        <div className="filter">
          <SearchInput />
          <Sort sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
        </div>
        <Catalog list={sortedList.length ? sortedList : []}/> 
        <Modal character={currentChr} status={modalStatus}/>
        <div className="gray-window" style={{display: 'none'}} ref={refGrayWindow} onClick={() => closeModal()}></div>
        </>
        }
      </ModalOperations.Provider>
    </SearchContext.Provider>
  )
}

export default App
