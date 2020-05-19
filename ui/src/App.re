module Board = {
  [@bs.module "./Board"] [@react.component]
  external make: unit => React.element = "default";
};

[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  let pageToGo =
    switch (url.path) {
    | [] => <Home />
    | ["game"] => <Board />
    | _ => <PageNotExist />
    };

  <div> <nav> <h1> {React.string("Codenames")} </h1> </nav> pageToGo </div>;
};

let default = make;