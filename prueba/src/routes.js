import { Router, history } from "backbone";
import Home from "./components/Home.jsx";
import Character from "./components/InfoCharacter";

function Routes(root) {
   const AppRouter =
      Router.extend({
         routes: {
            "": "home",
            "character/:id": "character",
         },
         home: () => root.render(<Home />),
         character: id => root.render(<Character characterId={id} />),
      });

   new AppRouter();
   history.start({ pushState: true });
}

export default Routes;

