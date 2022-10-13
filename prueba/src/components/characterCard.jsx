import "./styles/characterCard.sass";
import { history } from "backbone";

function CharacterCard({ character }) {
  return (
    <div
      className="characterCard m-4 d-flex align-items-center justify-content-space-evenly"
      onClick={() => {
        history.navigate(
          `character/${character.id}/${character.name.replace(" ", "-")}`,
          {
            trigger: true,
          }
        );
      }}
    >
      <section className="sectionInfo image d-sm-flex d-none align-items-center">
        {" "}
        <img
          className="imageCharacter d-sm-inline d-none"
          src={character.image}
          alt="loading..." 
        />{" "}
      </section>
      <section className="sectionInfo">
        {" "}
        <h6 id="nameCharacter">{character.name.toUpperCase()}</h6>
        <section className="d-flex flex-column p-3">
          <h6 className="subInfo">Gender: {character.gender}</h6>
          <h6 className="subInfo">Specie: {character.species}</h6>
          <h6 className="subInfo">Status: {character.status}</h6>
          <h6 className="subInfo">Episodes: {character.episode.length}</h6>
        </section>
      </section>
    </div>
  );
}

export default CharacterCard;
