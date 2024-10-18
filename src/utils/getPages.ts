import CharacterType from "../interfaces/CharacterType";

const getPages = (list: CharacterType[]): number[] => {
    const pagesAmount = Math.ceil(list.length / 24);
    const pagesArray = Array.from({length: pagesAmount}, (_, i) => i + 1)

    return pagesArray;
}

export default getPages;