import { useContext, useEffect} from 'react'
import Catalog from './Catalog'
import SearchContext from '../context/SearchValue';
import SearchInput from './SearchInput';
import Sort from './Sort';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setCharacters, setCurrentPage } from '../redux/slices/charactersSlide';
import SkeletonCard from './Skeleton';
import { IRootState, ThunkDispatch } from '../interfaces/ReduxDefaultTypes';
import Pagination from './Pagination';
import sortCharacters from '../utils/sortCharacters';

function Home() {
  const {sortBy, order} = useSelector((state: IRootState) => state.filter)
  const {characters, status} = useSelector((state: IRootState) => state.characters)
  const {searchValue} = useContext(SearchContext);
  const dispatch = useDispatch<ThunkDispatch>();
  
  useEffect(() => {
    dispatch(fetchCharacters())
  }, [])

  useEffect(() => {
    const renewedList = sortCharacters(characters, searchValue, order, sortBy);
    dispatch(setCharacters(renewedList))
    dispatch(setCurrentPage(1))
  }, [searchValue, characters, sortBy, order])

  return (
    status === "error" ? "Oops, something went wrong..." :
    <>
        <div className="filter">
          <SearchInput />
          <Sort sortBy={sortBy} order={order}/>
        </div>
        {status === "loading" ? <SkeletonCard/> : <Catalog/>} 
        <Pagination />
      </>
    )
  
}

export default Home
