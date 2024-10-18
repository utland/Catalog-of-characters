import orderEnum from "../enums/orderEnum";
import sortByEnum from "../enums/sortByEnum";
import CharacterType from "../interfaces/CharacterType";

const sortCharacters = (characters: CharacterType, searchValue: string, order: orderEnum, sortBy: sortByEnum): CharacterType[] => {
    return characters
    .filter((e: CharacterType) => e.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
    .sort((a: CharacterType, b: CharacterType) => {
      const response = order === "asc" ? a[sortBy] <= b[sortBy] : a[sortBy] >= b[sortBy]
      return response ? 1 : -1;
    })
}

export default sortCharacters;

