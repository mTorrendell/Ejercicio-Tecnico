import "./styles/navBar.sass";
import navNarGif from "./img/6.gif";

function NavBar() {
  return (
    <div className="nav">
      <img className="navbarImg" src={navNarGif} alt="loading..." />
    </div>
  );
}

export default NavBar;
