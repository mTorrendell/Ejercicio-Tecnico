import { history } from "backbone";
import Backbone from "backbone";
import { useEffect, useState } from "react";
import backGroundGif from "./img/backGround.gif";
import "./styles/infoCharacter.sass";

function InfoCharacter({ characterId }) {
  const [character, setCharacter] = useState("");

  //States for the buttons
  const [showOrigin, setShowOrigin] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const [showEpisodes, setShowEpisodes] = useState(false);
  const [nameEpisodes, setNameEpisodes] = useState(null);

  //State for aesthetic purpouse
  const [activeLine, setActiveLine] = useState(true);

  useEffect(() => {
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/${characterId}`,
      success: function () {
        setCharacter(model.attributes);
        callEpisodesName(model.attributes.episode);
      },
    });
  }, []);

  //Function to call all episodes of character
  function callEpisodesName(listEpisodes) {
    const list = [];
    const model = new Backbone.Model();
    for (const episode of listEpisodes) {
      model.fetch({
        url: episode,
        success: function () {
          list.push(model.attributes.name);
        },
      });
    }
    setNameEpisodes(list);
  }

  return character ? (
    <>
      <img className="backGroundImg" src={backGroundGif} alt="loading..." />
      <div className="infoIndividual container">
        <section
          className="d-flex align-items-start"
          onClick={() => {
            history.navigate("", {
              trigger: true,
            });
          }}
        >
          <h3 className="goBack"> BACK</h3>
        </section>{" "}
        <section className="d-flex justify-content-around align-items-center">
          {" "}
          <h1 className="nameCharacter"> {character.name.toUpperCase()}</h1>
          <img
            className="imageIndividualCharacter d-sm-inline d-none"
            src={character.image}
            alt="loading..." 
          />
        </section>
        <section className="m-3">
          <section className="d-flex justify-content-between align-items-center">
            {" "}
            <div
              className="styleButtons m-2"
              onClick={() => {
                activeLine ? setActiveLine(false) : setActiveLine(true);
              }}
            ></div>
            {activeLine && <hr className="line" />}
            <div
              className="styleButtons m-2"
              onClick={() => {
                activeLine ? setActiveLine(false) : setActiveLine(true);
              }}
            ></div>
          </section>
          <div className="mt-4 d-lg-flex d-block	justify-content-around">
            <section>
              <h2 className="infoCharacter">CHARACTER: {character.id}</h2>
              <h2 className="infoCharacter">
                STATUS:{" "}
                {character.status ? character.status : "No recorded status"}
              </h2>
              <h2 className="infoCharacter">
                SPECIE:{" "}
                {character.species ? character.species : "No recorded species"}
              </h2>
              <h2 className="infoCharacter">
                TYPE: {character.type ? character.type : "No recorded type"}
              </h2>
              <h2 className="infoCharacter">
                GENDER:{" "}
                {character.gender ? character.gender : "No recorded gender"}
              </h2>
            </section>
            <section>
              <section className="mt-4">
                <h2
                  className="infoCharacterButton d-flex justify-content-sm-start justify-content-center"
                  onClick={() => {
                    showOrigin ? setShowOrigin(false) : setShowOrigin(true);
                  }}
                >
                  Origin
                </h2>
                {showOrigin && (
                  <section className="infoCharacter">
                    <p className="infoButton">{character.origin.name} </p>
                  </section>
                )}
              </section>
              <section className="mt-4">
                <h2
                  className="infoCharacterButton  d-flex justify-content-sm-start justify-content-center"
                  onClick={() => {
                    showLocation
                      ? setShowLocation(false)
                      : setShowLocation(true);
                  }}
                >
                  Location
                </h2>
                {showLocation && (
                  <section className="infoCharacter">
                    <p className="infoButton">{character.location.name}</p>
                  </section>
                )}
              </section>
              <section className="mt-4">
                <h2
                  className="infoCharacterButton d-flex justify-content-sm-start justify-content-center"
                  onClick={() => {
                    showEpisodes
                      ? setShowEpisodes(false)
                      : setShowEpisodes(true);
                  }}
                >
                  Episodes
                </h2>
                {showEpisodes && (
                  <section className="infoCharacter">
                    {nameEpisodes ? (
                      nameEpisodes.map((epi, index) => {
                        return (
                          <section key={index}>
                            {" "}
                            <h2 className="infoButton">{epi}</h2>
                          </section>
                        );
                      })
                    ) : (
                      <p>loading...</p>
                    )}
                  </section>
                )}
              </section>
            </section>
          </div>
        </section>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default InfoCharacter;
