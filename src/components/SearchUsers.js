import React from 'react'

export const SearchUsers = ({setFilter,setPageno}) => {
  let debounceTimeout = 0;

  const debounceSearch = (value) => {

    if(debounceTimeout)
      clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout( () =>{ 
      setPageno(1);
      setFilter(value.toLowerCase());
      }, 300);
  };

  return (
    <>  
      <input type="text" 
        className="w-100 px-2 mb-2"
        placeholder="Search by name, email or role"
        onChange={(e)=>debounceSearch(e.target.value)}
      />    
    </>
  )
}
