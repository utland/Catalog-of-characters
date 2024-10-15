import React from "react";

interface SearchContextType {
    searchValue: string,
    setSearchValue: (value: string) => void
}

const defaultValue: SearchContextType = {
    searchValue: '',
    setSearchValue: () => {},
};

const SearchContext = React.createContext<SearchContextType>(defaultValue);

export default SearchContext;