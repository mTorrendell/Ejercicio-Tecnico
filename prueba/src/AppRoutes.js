import { Router, history } from "backbone";
import Home from "./components/Home.jsx";
import Character from "./components/InfoCharacter";

function Routes(root) {
   const AppRouter =
      Router.extend({
         routes: {
            "": "home",
            "character/:id/:slug": "character",
         },
         home: () => root.render(<Home />),
         character: (id, slug) => root.render(<Character characterId={id} characterName={slug} />),
      });

   new AppRouter();
   history.start({ pushState: true });
}

export default Routes;

