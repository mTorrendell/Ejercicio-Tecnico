import "./styles/infoCharacter.sass";
import { history } from "backbone";
import backGroundGif from "./img/backGround.gif";
import { useEffect, useState } from "react";
import Backbone from "backbone";

function InfoCharacter({ characterId }) {
  const [character, setCharacter] = useState("");
  const [showOrigin, setShowOrigin] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [nameEpisodes, setNameEpisodes] = useState(null);

  useEffect(() => {
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/${characterId}`,
      success: function () {
        setCharacter(model.attributes);
        callEpisodeName(model.attributes.episode);
      },
    });
  }, []);

  function callEpisodeName(listEpisodes) {
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
      <img className="backGroundImg" src={backGroundGif}></img>
      <div className="infoIndividual">
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
          />
        </section>
        <section>
          <section className="d-flex justify-content-between">
            {" "}
            <div className="styleButtons"></div>
            <div className="styleButtons"></div>
          </section>
          <section className="mt-4 infoIndividual d-lg-flex d-block	justify-content-around">
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
                GENDER{" "}
                {character.gender ? character.gender : "No recorded gender"}
              </h2>
            </section>
            <section>
              <section className="mt-4">
                <h2
                  className="infoCharacterButton"
                  onClick={() => {
                    showOrigin ? setShowOrigin(false) : setShowOrigin(true);
                  }}
                >
                  Origin
                </h2>
                {showOrigin && (
                  <section className="infoCharacter">
                    <p className="infoButton">Name: {character.origin.name} </p>
                  </section>
                )}
              </section>
              <section className="mt-4">
                <h2
                  className="infoCharacterButton"
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
                    <p className="infoButton">
                      Name: {character.location.name}
                    </p>
                  </section>
                )}
              </section>
              <section className="mt-4">
                <h2
                  className="infoCharacterButton"
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
                            <h2 className="infoButton m-2">{epi}</h2>
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
          </section>
        </section>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default InfoCharacter;
