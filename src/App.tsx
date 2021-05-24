import React, { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar/Siedbar';
import ProductList from './components/products/ProductList';
import { ProductItem } from './components/products/ProductItem';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [loading, setLoading] = useState(false);

  const shuffle = (arr: any) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }

  const [videocards, setVideocards] = useState<any[]>([]);

  const [shops, setShops] = useState<string[]>();

  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] = useState<number>(0);

  const startIndex = (page - 1) * 20;

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const responce = await fetch('http://localhost:5000/videocards');
      const data = await responce.json();
      setVideocards(shuffle(data));
      setTotalPages(Math.ceil(data.length/20))
      setLoading(false)
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

  let selectedVideocards = videocards.filter( (videocard) => shops?.includes(videocard.shop))
                              .slice(startIndex, startIndex + 20)
  
  return (
    <div className="App">
      <Sidebar onChangeShops={HandleChangeShops}/>
      { loading ? <p>Loading...</p> : <>
      <ProductList >
      {/* <button onClick={HandleSortVideocards}>Сортировать по цене</button> */}
        {selectedVideocards.map( videocard => {
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
