import Recipe from './Recipe';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const APP_ID="48c26288";
  const APP_KEY="91968af94511f7912949e14c07bfa482";
  
  const [recipe,setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(()=>{
   getRecipes();
  },[query]);
   
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
   setSearch(e.target.value);
  //  console.log(search);
  }


  const handleSubmit = e =>{
    e.preventDefault();
    setQuery(search)
     setSearch('');
  }

  return (
  
      <div className='App'>
        <form onSubmit={handleSubmit} className='search-form'>
          <input className='search-bar' type="text" value={search} onChange={updateSearch}/>
          <button className='search-button' type='submit' >Search</button>
        </form>
    <div className='recipes'>
        {recipe.map(recipe => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image= {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
        ))}
        </div>
      </div>
   
  );
}

export default App;


