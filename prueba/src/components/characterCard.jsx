import "./styles/characterCard.sass"

function CharacterCard({ character }) {
  console.log(character);
  return (
    <>
      <div className="characterCard">
        <img src={character.image} />
      </div>
    </>
  );
}

export default CharacterCard;
