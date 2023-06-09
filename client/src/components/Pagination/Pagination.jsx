import s from "./Pagination.css"

export function Pagination(props){
    return(
        <div className="paginateList">
      {props.currentPage !== 1? <button className="page-button" onClick={() => props.setCurrentPage(props.currentPage - 1)}>Previous</button>: null}
          {Array.from({ length: Math.ceil(props.countries?.length / 10) }, (v, i) => (
            props.currentPage === i+1 ? 
            <button key={i} id="active" className="page-button" onClick={() => props.setCurrentPage(i + 1)}>{i + 1}</button> 
            : <button className="page-button" key={i} onClick={() => props.setCurrentPage(i + 1)}>{i + 1}</button>)
)}
          {props.currentPage !== Array.from({ length: Math.ceil(props.countries?.length / 10) }).length ? <button className="page-button" onClick={() => props.setCurrentPage(props.currentPage + 1)}>Next</button>: null}
          </div>
    )
}