import "./styles/infoCharacter.sass";
import { history } from "backbone";
import backGroundGif from "./img/backGround.gif";

function InfoCharacter({ characterId }) {

   return (
    <>
      <img className="backGroundImg" src={backGroundGif}></img>

      <div className="infoIndividual">
        <section
          className="goBack nameCharacter"
          onClick={() => {
            history.navigate("", {
              trigger: true,
            });
          }}
        >
          BACK
        </section>
        <div className=" infoIndividual">
          <h6 className="nameCharacter">Id of character: {characterId}</h6>
        </div>
      </div>
    </>
  );
}

export default InfoCharacter;
