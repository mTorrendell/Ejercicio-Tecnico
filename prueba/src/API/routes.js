import { Router, history } from "backbone";

const AppRouter = Router.extend({
   routes: {
      "": "init",
      "character/:id": "character",
   },
   init: () => {
      console.log("This is the first page");
   },
   character: id => {
      console.log("This is the profile page", id);
   },
});

new AppRouter();
history.start({ pushState: true });

export default AppRouter;

