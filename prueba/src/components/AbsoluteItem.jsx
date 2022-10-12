import ScrollToTop from "react-scroll-to-top";
import "./styles/absoluteItem.sass";

function AbsoluteIcons() {
  return (
    <>
      <div>
        <ScrollToTop smooth top={200} className="goUp scroll-to-top" />
      </div>
    </>
  );
}

export default AbsoluteIcons;
