import { useSelector } from "react-redux";
import CharacterType from "../interfaces/CharacterType";
import CharacterCard from "./CharacterCard";
import { IRootState } from "../interfaces/ReduxDefaultTypes";
import arrayByRange from "../utils/arrayByRange";

function Catalog() {
    const {currentPage, sortedList} = useSelector((state: IRootState) => state.characters)
    const list: CharacterType[] = arrayByRange(currentPage, sortedList);

    return <div className="list">
    {list.map((e: CharacterType, i: number) => <CharacterCard key={i} character={e}/>)}
    </div> 
}

export default Catalog;