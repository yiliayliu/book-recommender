import React from "react";
import "./Home.css";
import { useState } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from '@mui/material';
import { Image } from "semantic-ui-react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

function Home() {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  // if (response.ok) {
  //   console.log("Response Worked! ");
  //   console.log(JSON.stringify(response.url));
  //   console.log(response);
  //   setTitle("We found your favorite book!")
  // }
  // else {
  //   console.log("Title not found")
  //   setTitle("We did not find this title. Please try again!")
  // }

  return (
    <div className="home">
      <div className="home__header">
        {/* <div className="home__headerLeft">
          <Link to="/about">About</Link>
          <Link to="/store">Store</Link>
        </div>
        <div className="home__headerRight">
          <Link to="/gmail">Gmail</Link>
          <Link to="/images">Images</Link>
          <AppsIcon />
          <Avatar />
        </div> */}
      </div>

      <div className="home__body">
        <img
          src="/book-shelf-logo.jpg"
          alt="logo"
        />
        <div className="home__inputContainer">
          <form className="search">
            <div className="search__input">
              <SearchIcon className="search__inputIcon" />
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
              {/* <MicIcon /> */}
            </div>

            <div className="search__buttons">
              <Button onClick={() => {
                const book = { title };
                fetch("/input_book", {
                  method: "POST",
                  headers: {
                    "Content_Type": "application/json"
                  },
                  body:
                    JSON.stringify(book)
                }).then((resp) => {
                  return resp.json()
                }).then((data) => {
                  setBooks(data)
                })
                  .catch((error) => {
                    console.log(error, "catch the hoop")
                  })
              }}>
                Find Similar Books
              </Button>
              <Button variant="outlined">I'm Feeling Lucky</Button>
            </div>
          </form>
          <Grid container spacing={4}>{books.map(item => {
            return <Grid item xs={2}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
          })}</Grid>


        </div>
      </div>
    </div>
  );
}

export default Home;