import "./styles/characterCard.sass";
import { history } from "backbone";

function CharacterCard({ character }) {
  console.log(character);
  return (
    <>
      <div
        className="characterCard flex"
        onClick={() => {
          history.navigate(`character/${character.id}`, {
            trigger: true,
          });
        }}
      >
        <section className="sectionInfo">
          {" "}
          <img className="imageCharacter" src={character.image} />{" "}
        </section>
        <section className="sectionInfo">
          {" "}
          <h6 className="name">{character.name}</h6>
          <section className="flex">
            <h6 className="name">{character.gender}</h6>
            <h6 className="name">{character.species}</h6>
          </section>
        </section>
      </div>
    </>
  );
}

export default CharacterCard;
