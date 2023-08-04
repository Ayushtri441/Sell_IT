import React,{useState, useEffect} from 'react'

import SearchIcon from "..//../assets/SearchIcon"


function SearchML() {
 
  const [filteredData, setFilteredData] = useState([]);

  const [name ,setName]  = useState('');
    const handleSearchClick = async () => {
      if(name==''){
        alert('Enter Some Name');
        return
      }
      try {
        const url = "http://127.0.0.1:8000/recomand"
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
          'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer', 
          body: JSON.stringify({
            "name": name,
          }) 
        });

        const data = await response.json();
        setFilteredData(data.data);
        if(data.length==0)  alert("No prooduct found")
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const findproduct=()=>{
      alert("Thank you for Selecting");
    }
   
 
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Find Cars Useing ML"
      
          onChange={(e)=>{
            setName(e.target.value)
          }}
        />
        <div className="searchIcon">
           <div onClick={handleSearchClick}> <SearchIcon /></div>
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <div key={key} className="dataItem" onClick={findproduct}>
                <p>{value} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchML
