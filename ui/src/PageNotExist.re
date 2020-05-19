[@react.component]
let make = () => {
  <div>
    <h2> {React.string({j|La page demandée n'existe pas|j})} </h2>
    <button onClick={event => ReasonReactRouter.push("/")}>
      {React.string({j|Retour à l'accueil|j})}
    </button>
  </div>;
};