import React from "react";
import "./Home.css";
import { useState } from "react";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import { color } from "@mui/system";


function Home() {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [titleWarning, setTitleWarning] = useState("");
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
  const cardHeader = {
    display: "block",
    overflow: "hidden"
  }
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
            <p style={{ color: "red", textAlign: "center" }}>{titleWarning}</p>
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
                  setTitleWarning("")
                })
                  .catch((error) => {
                    setTitleWarning("Book not found in database, please try another one :)")
                    console.log(error, "unable to find the book")
                  })
              }}>
                Find Similar Books
              </Button>
              <Button variant="outlined" onClick={() => { alert('Feature in development :)') }}>I'm Feeling Lucky</Button>
            </div>
          </form>
          <Grid mt={1} container spacing={4}>{books.map(item => {
            return <Grid item xs={2}>
              <Card>
                <CardHeader
                  classes={cardHeader}
                  noWrap
                  title={<Typography style={{ wordWrap: 'break-word' }} noWrap gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>}
                  // titleTypographyProps={{ variant: 'h6' }}
                  subheader={<div>
                    {item.ratings_count} ratings<br />
                    <Rating
                      style={{ marginLeft: "-0.2rem" }}
                      readOnly
                      value={item.average_rating}
                      precision={0.1}
                    /></div>}
                />
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}>Authors:</span>{item.authors}<br />
                    <span style={{ fontWeight: "bold" }}>Language: </span>{item.language_code}<br />
                    <span style={{ fontWeight: "bold" }}>Publication Year: </span>{item.original_publication_year}<br />

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
      </div >
    </div >
  );
}

export default Home;