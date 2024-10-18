import CharacterType from "../interfaces/CharacterType";

const arrayByRange = (currentPage: number, array: CharacterType[]): CharacterType[] => {
    const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * 24;
    const endIndex = (currentPage - 1) * 24 + 24;

    return array.slice(startIndex, endIndex)
}

export default arrayByRange;