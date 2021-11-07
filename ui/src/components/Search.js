import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons/Search";
import { Button } from '@mui/material';
// import {useHistory} from "react-router-dom";

function Search() {
  const [title, setTitle] = useState("");
  //   const history = useHistory();

  return (
    <form className="search">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {/* <MicIcon /> */}
      </div>

      <div className="search__buttons">
        <Button onClick={async () => {
          const book = { title };
          const response = await fetch("/input_book", {
            method: "POST",
            headers: {
              "Content_Type": "application/json"
            },
            body:
              JSON.stringify(book)
          })

          if (response.ok) {
            console.log("Response Worked! ");
            console.log(JSON.stringify(response.url));
            console.log(response);
            setTitle("We found your favorite book!")
            console.log(response);
          }
          else {
            console.log("Title not found")
            setTitle("We did not find this title. Please try again!")
          }

        }}>
          Find Similar Books
        </Button>
        <Button variant="outlined">I'm Feeling Lucky</Button>
      </div>
    </form>
  );
}

export default Search;