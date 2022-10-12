import "./styles/characterCard.sass";
import { history } from "backbone";

function CharacterCard({ character }) {
 // console.log(character);
  return (
    <>
      <div
        className="characterCard m-4 d-flex"
        onClick={() => {
          history.navigate(
            `character/${character.id}/${character.name.replace(" ", "-")}`,
            {
              trigger: true,
            }
          );
        }}
      >
        <section className="sectionInfo image">
          {" "}
          <img className="imageCharacter" src={character.image} />{" "}
        </section>
        <section className="sectionInfo">
          {" "}
          <h6 id="nameCharacter">{character.name.toUpperCase()}</h6>
          <section className="flex">
            <h6 className="subInfo">{character.gender}</h6>
            <h6 className="subInfo">{character.species}</h6>
          </section>
        </section>
      </div>
    </>
  );
}

export default CharacterCard;
