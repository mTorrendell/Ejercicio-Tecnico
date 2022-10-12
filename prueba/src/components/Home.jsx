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
  const [categoryFilter, setCategoryFilter] = useState(null);

  function filter(characters) {
    if (categoryFilter) {
      if (categoryFilter === "name") {
        const nuevo = _.sortBy(characters, [
          function (one) {
            return one.name;
          },
        ]);
        return nuevo;
      } else if (filterBy) {
        return characters.filter((character) => {
          if (categoryFilter === "gender") {
            return character.gender === filterBy;
          }
          return character.status === filterBy;
        });
      }
    }
  }
  //Infinite Scroll
  useEffect(() => {
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/?page=${page + 1}`,
      success: function () {
        filter(model.attributes.results);
        console.log(filter(model.attributes.results));
        allCharacters !== null
          ? setAllCharacters(
              filter([...allCharacters, ...model.attributes.results])
            )
          : setAllCharacters(model.attributes.results);

        setHasMore(page < model.attributes.info.pages);
      },
    });
  }, [page]);

  //Filters
  useEffect(() => {
    if (categoryFilter === "name" || filterBy) {
      setAllCharacters(filter(allCharacters));
    }
  }, [categoryFilter, filterBy]);

  return allCharacters !== null && allCharacters !== [] ? (
    <>
      <NavBar />
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
              <h2
                className="listItem buttonFilter"
                onClick={() => {
                  setFilterBy("Alive");
                  setCategoryFilter("status");
                }}
              >
                Alive
              </h2>
              <h2
                className="listItem buttonFilter"
                onClick={() => {
                  setFilterBy("Dead");
                  setCategoryFilter("status");
                }}
              >
                Dead
              </h2>
              <h2
                className="listItem buttonFilter"
                onClick={() => {
                  setFilterBy("unknown");
                  setCategoryFilter("status");
                }}
              >
                Unknown
              </h2>
            </div>
          )}
        </section>
        <section className="filters">
          {" "}
          <h1
            className="buttonFilter"
            onClick={() => {
              setCategoryFilter("gender");
              if (genreFilter) {
                setGenreFilter(false);
              } else {
                setGenreFilter(true);
              }
            }}
          >
            GENDER
          </h1>
          {genreFilter && (
            <div className="listItems">
              {" "}
              <h2
                className="listItem buttonFilter"
                onClick={() => {
                  setFilterBy("Female");
                  setCategoryFilter("gender");
                }}
              >
                Female
              </h2>
              <h2
                className="listItem buttonFilter"
                onClick={() => {
                  setFilterBy("Male");
                  setCategoryFilter("gender");
                }}
              >
                Male
              </h2>
              <h2
                className="listItem buttonFilter"
                onClick={() => {
                  setFilterBy("Genderless");
                  setCategoryFilter("gender");
                }}
              >
                Genderless
              </h2>
              <h2
                className="listItem buttonFilter"
                onClick={() => {
                  setFilterBy("unknown");
                  setCategoryFilter("gender");
                }}
              >
                Unknown
              </h2>
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
  ) : (
    <div className="listItem">No characters found</div>
  );
}

export default Home;
