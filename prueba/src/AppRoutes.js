import { Router, history, Backbone } from "backbone";
import Home from "./components/Home.jsx";
import Character from "./components/InfoCharacter";
import { useState, useEffect } from "react";

function Routes(root) {
   //states for infinite scroll

   //const [hasMore, setHasMore] = useState(true);

   // useEffect(() => {
   //    // const getMovies = async () => {
   //    //    const response = await axios.get(
   //    //       `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
   //    //    );
   //    //    allCharacters !== []
   //    //       ? setAllCharacters([...allCharacters, ...response.data.results])
   //    //       : setAllCharacters(response.data.results);

   //    //    setHasMore(page < response.data.total_pages);
   //    // };
   //    getMovies();
   // }, [page]);




   //Routes using the router from backbone
   const AppRouter =
      Router.extend({
         routes: {
            "": "home",
            "character/:id": "character",
         },
         home: () => root.render(<Home
         //allCharacters={allCharacters} 
         />),
         character: id => root.render(<Character characterId={id} />),
      });

   new AppRouter();
   history.start({ pushState: true });
}

export default Routes;

