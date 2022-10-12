import "./styles/infoCharacter.sass";
import { history } from "backbone";
import backGroundGif from "./img/backGround.gif";
import { useEffect, useState } from "react";
import Backbone from "backbone";

function InfoCharacter({ characterId }) {
  const [character, setCharacter] = useState("");

  useEffect(() => {
    const model = new Backbone.Model();
    model.fetch({
      url: `https://rickandmortyapi.com/api/character/${characterId}`,
      success: function () {
        setCharacter(model.attributes);
      },
    });
  }, []);

  function buttonInfo(listOfData) {
    return (
      <div>
        {listOfData.map((fact) => {
          return <div>{fact}</div>;
        })}
      </div>
    );
  }

  return (
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
          <h1 className="nameCharacter"> {character.name}</h1>
          <img
            className="imageIndividualCharacter d-sm-inline d-none"
            src={character.image}
          />
        </section>
        <section>
          <section className="d-flex justify-content-between">
            {" "}
            <div></div>
            <div></div>
          </section>
          <section className="mt-4 infoIndividual d-flex justify-content-between">
            <section>
              <h2>{character.Id}</h2>
              <h2>
                {character.status ? character.status : "No recorded status"}
              </h2>
              <h2>
                {character.species ? character.species : "No recorded species"}
              </h2>
              <h2>{character.type ? character.type : "No recorded type"}</h2>
              <h2>
                {character.gender ? character.gender : "No recorded gender"}
              </h2>
            </section>
            <section>
              <div className="mt-4">
                <h2>Origin</h2>
                <p className="infoButton">HOLA HOLA</p>
              </div>
              <div className="mt-4">
                <h2>Location</h2>
                <p className="infoButton">HOLA HOLA</p>
              </div>
              <div className="mt-4">
                <h2>Episodes</h2>
                <p className="infoButton">HOLA HOLA</p>
              </div>
            </section>
          </section>
        </section>
      </div>
    </>
  );
}

export default InfoCharacter;
