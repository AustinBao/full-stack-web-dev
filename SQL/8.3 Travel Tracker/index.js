import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "ausdun123",
  port: 5432,
});

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];

  result.rows.forEach(country => {
    countries.push(country.country_code);
  });
  
  res.render("index.ejs", {countries: countries, total: countries.length});
});

app.post("/add", async (req, res) => {
  let result = req.body.country;

  let country_code = await db.query("SELECT country_code FROM countries WHERE country_name = ($1)", [result]);
  
  db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code.rows[0].country_code]);
  
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
