import "./styles/navBar.sass";
import navNarGif from "./img/logo.gif";
import backGroundGif from "./img/backGround.gif";

function NavBar() {
  return (
    <>
      <div className="nav d-flex justify-content-center">
        <img className="navbarImg" src={navNarGif} alt="loading..." />
      </div>{" "}
      <img className="backGroundImg" src={backGroundGif}></img>
    </>
  );
}

export default NavBar;
