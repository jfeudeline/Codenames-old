[@react.component]
let make = () =>
  <div>
    <h2> {React.string("Ceci est la page d'accueil")} </h2>
    <button onClick={_ => ReasonReactRouter.push("/game")}>
      {React.string("Afficher le jeu")}
    </button>
  </div>;