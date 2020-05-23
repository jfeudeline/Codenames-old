[@react.component]
let make = () => {
  let (value, onChange) = React.useState(() => "game-example");

  <div>
    <h2> {React.string("Lancer ou rejoindre une partie")} </h2>
    <form onSubmit={_ => ReasonReactRouter.push("/" ++ value)}>
      <label> {React.string("Nom de la partie:")} </label>
      <input
        onChange={event => {
          let value = ReactEvent.Form.target(event)##value;
          onChange(_ => value);
        }}
        value
      />
      <button onClick={_ => ReasonReactRouter.push("/" ++ value)}>
        {React.string("Jouer")}
      </button>
    </form>
  </div>;
};