import React, { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar/Siedbar';
import ProductList from './components/products/ProductList';
import { ProductItem } from './components/products/ProductItem';
import Pagination from './components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, getVideocards, selectCountVideocards, selectStatus } from './redux/videocardReducer';
import { currentPageSelector, filteredTodos, limitPagesSelector} from './redux/selectors/selectVideocards'
import { changeShops } from './redux/videocardReducer'

function App() {
  const dispatch = useDispatch()
  const videocards = useSelector(filteredTodos)
  const limit = useSelector(limitPagesSelector)
  const page = useSelector(currentPageSelector)
  const startIndex = (page - 1)*limit
  let totalPages = Math.ceil(videocards.length/limit);

  useEffect(() => {
    dispatch(getVideocards())
  }, [dispatch])

  const HandleChangeShops = (changesShops: string[]) => {
    dispatch(changeShops(changesShops))
  }

  const HandleChangePage = (num: number) => {
    dispatch(changePage(num))
    window.scrollTo(0, 0)
  }

  const statusFetch = useSelector(selectStatus)
  return (
    <div className="App">
      <Sidebar onChangeShops={HandleChangeShops}/>
      { statusFetch == 'loading' ? <p>Loading...</p> : <>
      <ProductList >
      {/* <button onClick={HandleSortVideocards}>Сортировать по цене</button> */}
        {videocards.slice(startIndex, startIndex + limit).map( videocard => {
          return (<ProductItem 
            name={videocard.name}
            price={videocard.price}
            srcImage={videocard.srcImage}
            href={videocard.href}
            shop={videocard.shop}  
          />)
        })}
        <Pagination page={page} handleClick={HandleChangePage} totalPages={totalPages} />
        
      </ProductList>
      </> }
    </div>
  );
}

export default App;
