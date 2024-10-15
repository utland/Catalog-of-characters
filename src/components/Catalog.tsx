import CharacterType from "../interfaces/CharacterType";
import CharacterCard from "./CharacterCard";

interface CatalogList {
    list: CharacterType[];
}

function Catalog({list}: CatalogList) {
    return <div className="list">
    {list.map((e, i) => <CharacterCard key={i} character={e}/>)}
    </div> 
}

export default Catalog;