import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import Backbone from "backbone";
import NavBar from "./NavBar";
import "./styles/home.sass";

function Home() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    //As the fetch request is async we would need to use a callback
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/?page=${page}`,
      success: function () {
        allCharacters !== []
          ? setAllCharacters([...allCharacters, ...model.attributes.results])
          : setAllCharacters(model.attributes.results);

        setHasMore(page < model.attributes.info.pages);
      },
    });
  }, [page]);

  return (
    allCharacters !== [] && (
      <>
        <NavBar />
        <InfiniteScroll
          dataLength={allCharacters.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {allCharacters.map((character) => {
            return <CharacterCard key={character.id} character={character} />;
          })}
        </InfiniteScroll>
      </>
    )
  );
}

export default Home;
