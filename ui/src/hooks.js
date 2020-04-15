const useControlId = (id) =>
  get(`http://localhost:5000/api/${gameId}`).then((cards) => {
    cards === [] ? false : true;
  });

useEffect(() => {
  //get("https://lit-stream-81562.herokuapp.com/api").then((cards) => {
}, []);
