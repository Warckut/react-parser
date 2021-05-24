import { useEffect, useState } from "react"
import './Pagination.css'

type Pagination = {
    page: number
    totalPages: number
    handleClick: (num: number) => void
}

const Pagination = ({ page, totalPages, handleClick }: Pagination) => {
    const pages = Array.from(new Array(totalPages).keys()).map(k => k + 1)

    return (
      <div className="pagination">
        { pages.map(num =>
            ( <button
                className={ num != page ? "pagination__buttom" : "pagination__buttom pagination__button_selected"} 
                key={num}
                onClick={() => handleClick(num)}
              >{num}</button> )
            )
        }
      </div>
    )
  }
  
  export default Pagination