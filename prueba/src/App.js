import './App.css';
import { history } from "backbone";
import { useEffect } from 'react';
import AppRouter from "./routes";

function App(root) {
  new AppRouter(root);
  //encontrar alternativa
  history.stop();
  history.start({ pushState: true });

  console.log(renderView);
  return renderView;
}

export default App;
