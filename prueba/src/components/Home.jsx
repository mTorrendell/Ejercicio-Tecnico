import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import _ from "lodash";
import CharacterCard from "./CharacterCard";
import Backbone from "backbone";
import NavBar from "./NavBar";
import ScrollToTop from "react-scroll-to-top";
import "./styles/home.sass";

function Home() {
  const [allCharacters, setAllCharacters] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [genreFilter, setGenreFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  const [filterBy, setFilterBy] = useState(null);
  const [categoryFIlter, setCategoryFilter] = useState(null);

  //Infinite Scroll
  useEffect(() => {
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/?page=${page + 1}`,
      success: function () {
        allCharacters !== null
          ? setAllCharacters([...allCharacters, ...model.attributes.results])
          : setAllCharacters(model.attributes.results);

        setHasMore(page < model.attributes.info.pages);
      },
    });
  }, [page]);

  //Filters
  useEffect(() => {
    if (categoryFIlter) {
      if (categoryFIlter === "name") {
        const nuevo = _.sortBy(allCharacters, [
          function (one) {
            return one.name;
          },
        ]);
        console.log(nuevo);
        setAllCharacters([...nuevo]);
      } else {
        console.log({ filterBy });
        const newCharacters = allCharacters.filter((character) => {
          return (character.categoryFIlter = filterBy);
        });
        setAllCharacters(newCharacters);
      }
    }
  }, [categoryFIlter, page]);

  return (
    allCharacters && (
      <>
        <NavBar />
        {/* <h5 className="color-white">Filter By</h5> */}
        <section className="fit-content d-flex flex-sm-row flex-column justify-content-around align-items-sm-start">
          {" "}
          <section className="filters">
            <h1
              className="buttonFilter"
              onClick={() => {
                setCategoryFilter("name");
              }}
            >
              NAME
            </h1>
          </section>
          <section className="filters">
            {" "}
            <h1
              className="buttonFilter"
              onClick={() => {
                setCategoryFilter("status");
                if (statusFilter) {
                  setStatusFilter(false);
                } else {
                  setStatusFilter(true);
                }
              }}
            >
              STATUS
            </h1>
            {statusFilter && (
              <div className="listItems">
                {" "}
                <h2 className="listItem buttonFilter">Alive</h2>
                <h2 className="listItem buttonFilter">Dead</h2>
                <h2 className="listItem buttonFilter">Unknown</h2>
              </div>
            )}
          </section>
          <section className="filters">
            {" "}
            <h1
              className="buttonFilter"
              onClick={() => {
                setCategoryFilter("genre");
                if (genreFilter) {
                  setGenreFilter(false);
                } else {
                  setGenreFilter(true);
                }
              }}
            >
              GENRE
            </h1>
            {genreFilter && (
              <div className="listItems">
                {" "}
                <h2 className="listItem buttonFilter">Female</h2>
                <h2 className="listItem buttonFilter">Male</h2>
                <h2 className="listItem buttonFilter">Genderless</h2>
                <h2 className="listItem buttonFilter">Unknown</h2>
              </div>
            )}
          </section>
        </section>

        <InfiniteScroll
          dataLength={allCharacters.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="containers generalDiv">
            {" "}
            {allCharacters.map((character) => {
              return <CharacterCard key={character.id} character={character} />;
            })}
          </div>
        </InfiniteScroll>
        <ScrollToTop />
      </>
    )
  );
}

export default Home;
