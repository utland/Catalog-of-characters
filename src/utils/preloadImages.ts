import CharacterType from "../interfaces/CharacterType";

const preloadCardImages = (characters: CharacterType[]) => {
    characters.forEach((character) => {
      const img = new Image();
      img.src = `https://genshin.jmp.blue/characters/${character.id.toLocaleLowerCase()}/icon-big`;
    });
  };

export default preloadCardImages;