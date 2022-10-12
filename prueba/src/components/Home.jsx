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
  //Infinite scroll states
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  //Filters states
  const [genderFilter, setGenderFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);
  //The subFilter
  const [filterBy, setFilterBy] = useState(null);
  //The primary filter
  const [categoryFilter, setCategoryFilter] = useState(null);

  //Auxiliar function
  function filter(characters) {
    if (categoryFilter) {
      if (categoryFilter === "name") {
        return _.sortBy(characters, [
          function (one) {
            return one.name;
          },
        ]);
      } else {
        const newCharacters = characters.filter((character) => {
          return categoryFilter === "gender"
            ? character.gender === filterBy
            : character.status === filterBy;
        });
        return newCharacters !== [] ? newCharacters : null;
      }
    } else {
      return characters;
    }
  }

  //Infinite Scroll
  useEffect(() => {
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/?page=${page + 1}`,
      success: function () {
        allCharacters !== null
          ? setAllCharacters(
              filter([...allCharacters, ...model.attributes.results])
            )
          : setAllCharacters(model.attributes.results);

        setHasMore(page < model.attributes.info.pages);
      },
    });
  }, [page]);

  useEffect(() => {
    if (categoryFilter === "name") {
      setAllCharacters(filter(allCharacters));
    }
  }, [categoryFilter]);

  useEffect(() => {
    if (filterBy) {
      setAllCharacters(filter(allCharacters));
    }
  }, [filterBy]);

  return (
    allCharacters && (
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
                statusFilter ? setStatusFilter(false) : setStatusFilter(true);
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
                genderFilter ? setGenderFilter(false) : setGenderFilter(true);
              }}
            >
              GENDER
            </h1>
            {genderFilter && (
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
                {/* <h2
                  className="listItem buttonFilter"
                  onClick={() => {
                    setFilterBy("Genderless");
                    setCategoryFilter("gender");
                  }}
                >
                  Genderless
                </h2> */}
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
          loader={<h2 className="text-white">Loading...</h2>}
        >
          <div className="containers generalDiv">
            {" "}
            {filter(allCharacters) !== [] ? (
              allCharacters.map((character) => {
                return (
                  <CharacterCard key={character.id} character={character} />
                );
              })
            ) : (
              <div>ESTA MAL</div>
            )}
          </div>
        </InfiniteScroll>
        <ScrollToTop />
      </>
    )
  );
}

export default Home;
