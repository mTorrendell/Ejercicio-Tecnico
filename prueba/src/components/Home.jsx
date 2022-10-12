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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterBy, setFilterBy] = useState(null);
  const [categoryFIlter, setCategoryFilter] = useState(null);

  //Infinite Scroll
  useEffect(() => {
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/?page=${page}`,
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
    console.log({ categoryFIlter });
    if (categoryFIlter) {
      if (categoryFIlter === "name") {
        const nuevo = _.sortBy(allCharacters, [
          function (one) {
            return one.name;
          },
        ]);
        setAllCharacters(nuevo);
      } else {
        console.log({ filterBy });
        const newCharacters = allCharacters.filter((character) => {
          return (character.categoryFIlter = filterBy);
        });
        console.log(newCharacters);
        setAllCharacters(newCharacters);
      }
    }
  }, [categoryFIlter]);

  return (
    allCharacters && (
      <>
        <NavBar />
        {/* <p className="name">FILTER BY</p> */}
        <section className="fit-content d-flex justify-content-around">
          {" "}
          <section className="filters">
            <lable
              className="buttonFilter"
              onClick={() => {
                setCategoryFilter("name");
              }}
            >
              Name
            </lable>
            <ul className=""></ul>
          </section>
          <section className="filters">
            {" "}
            <lable
              className="buttonFilter"
              onClick={() => {
                setCategoryFilter("status");
              }}
            >
              Status
            </lable>
          </section>
          <section className="filters">
            {" "}
            <lable
              className="buttonFilter"
              onClick={() => {
                setCategoryFilter("genre");
              }}
            >
              Genre
            </lable>
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
