import { Button } from "@material-ui/core";
import "datejs";

const Search = ({ setDate }) => {
  function setNewDate() {
    const date = document.getElementById("date").value;

    if (date) {
      if (Date.today().isAfter(Date.parse(date))) {
        setDate(date);
      } else {
        //error
        alert("Please choose a previous date");
      }
    }
  }

  return (
    <section className="searchContainer">
      <label htmlFor="date">Date</label>
      <input type="date" name="date" id="date"></input>
      <Button onClick={setNewDate} variant="contained" color="primary">
        Submit
      </Button>
    </section>
  );
};

export default Search;
