import React, { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar/Siedbar';
import ProductList from './components/products/ProductList';
import { ProductItem } from './components/products/ProductItem';
import Pagination from './components/Pagination';

function App() {
  const [loading, setLoading] = useState(false);
  const [videocards, setVideocards] = useState<any[]>([]);
  const [shops, setShops] = useState<string[]>();
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0);
  const startIndex = (page - 1) * 20;
  let selectedVideocards = videocards.filter( (videocard) => shops?.includes(videocard.shop))
                              .slice(startIndex, startIndex + 20)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const responce = await fetch('http://localhost:5000/videocards');
      const data = await responce.json();
      setLoading(false)
      setTotalPages(Math.ceil(data.length/20))
      setVideocards(data);
    } 
    fetchData();
  }, []);

  const HandleChangeShops = (changeShops: string[]) => {
    setShops(changeShops)
    setPage(1)
    setTotalPages(Math.ceil(videocards.filter((videocard) => changeShops?.includes(videocard.shop)).length/20))
  }

  const HandleChangePage = (num: number) => {
    setPage(num)
    window.scrollTo(0, 0)
  }

  // const HandleSortVideocards = () => {
  //   if (sort)
  //     setVideocards( selectedVideocards.sort((a, b) => a.price > b.price ? 1 : -1))
  //   else
  //     setVideocards( selectedVideocards.sort((a, b) => a.price < b.price ? 1 : -1))
  //   setSort(!sort)
  // }
  
  return (
    <div className="App">
      <Sidebar onChangeShops={HandleChangeShops}/>
      { loading ? <p>Loading...</p> : <>
      <ProductList >
      {/* <button onClick={HandleSortVideocards}>Сортировать по цене</button> */}
        {selectedVideocards.map( videocard => {
          // if (shops?.includes(videocard.shop))
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
