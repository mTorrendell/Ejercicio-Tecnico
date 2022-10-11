import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import Backbone from "backbone";

function Home() {
  const [allCharacters, setAllCharacters] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    //As the fetch request is async we would need to use a callback
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/?page=${page}`,
      success: function () {
        setAllCharacters(model.attributes.results);
      },
    });
  }, [page]);

  return (
    allCharacters && (
      <>
        {allCharacters.map((character) => {
          return <CharacterCard key={character.id} character={character} />;
        })}

        {/* <InfiniteScroll
        dataLength={allCharacters.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={
          // <div>
          //   <CircularProgressbar />
          // </div>
          <h4>Loading...</h4>
        }
      >
        <div>HOLA 1</div>
      </InfiniteScroll> */}
      </>
    )
  );
}

export default Home;
