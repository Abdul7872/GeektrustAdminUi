import React from 'react'

export const Pagination = ({totalPages,pageno,setPageno,deleteMulti}) => {
    const pageNo =[];

    for(let i=1; i<=totalPages; i++){
        pageNo.push(i);
    }
    const backBtn=()=>{
          if(pageno !== 1)
           setPageno(pageno-1);
    }
    const nextBtn=()=>{
      if(pageno < totalPages)
           setPageno(pageno+1);
    }
    return (
        <nav className="d-flex justify-content-between">
            <button className="btn-danger rounded-2 mb-3" onClick={()=>deleteMulti()}>
                <span>Delete Selected</span>
            </button>
            <ul className="pagination ">
                <li className="page-item mx-2">
                    <button onClick={()=>backBtn()} className="page-link ">
                        <i className="fas fa-angle-left"></i>
                    </button>
                </li>
                {pageNo.map(num => (
                    <li key={num} className={num===pageno? "page-item mx-2 active" :"page-item mx-2"}>
                        <button onClick={()=>setPageno(num)} className="page-link ">
                            {num}
                        </button>
                    </li>
                ))}
                <li className="page-item mx-2">
                    <button onClick={()=>nextBtn()} className="page-link" active="true">
                        <i className="fas fa-angle-right"></i>
                    </button>
                </li>
            </ul>
            <div></div>
        </nav>
    )
}