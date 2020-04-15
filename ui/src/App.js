import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Board from "./Board";
import { Home } from "./home";

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <h1>Codenames</h1>
          </li>
          <li>
            <Link to="/">Accueil</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/:gameId">
          <Game />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
};

const Game = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default App;
