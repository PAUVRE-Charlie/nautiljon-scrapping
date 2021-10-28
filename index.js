const axios = require("axios");
const fs = require("fs");
const getInfoFromURL = require("./lib/getInfoFromURL");
const search = require("./lib/search");

async function getAllMangas(length = 16745) {
  // const result = await getInfoFromURL(
  //   "https://www.nautiljon.com/mangas/one+piece.html"
  // );
  const result = await search("", "manga", length, {
    // All optionals
    // types: [], //types to force include
    // typesExclude: [], //types to exclude (they're the same that you can put in the 'formats' property)
    // genres: [], //genres to force include
    // genresExclude: [], //genres to exclude (they're the same that you can put in the 'genres' property)
    // year: 1999, //start year
    // airing: true, //is currently airing
    // finished: false, //is finished
    // tba: true, //to be airing in the future
  });
  console.log(result.length);
  const data = [];
  for (let m of result) {
    const manga = await getInfoFromURL(m.url);
    const {
      name,
      japName,
      alternateName,
      url,
      imageUrl,
      country,
      type,
      startDate,
      status,
      volumesNumber,
      genres,
      author,
      editor,
      description,
    } = manga;
    data.push({
      name,
      japName,
      alternateName,
      url,
      imageUrl,
      country,
      type,
      startDate,
      status,
      volumesNumber,
      genres,
      author,
      editor,
      description,
    });
  }

  fs.writeFile("./posts.json", JSON.stringify(data), "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully!`);
    }
  });
}

async function getManga(query) {
  // const result = await getInfoFromURL(
  //   "https://www.nautiljon.com/mangas/one+piece.html"
  // );
  const result = await search(query, "manga", 1, {
    // All optionals
    // types: [], //types to force include
    // typesExclude: [], //types to exclude (they're the same that you can put in the 'formats' property)
    // genres: [], //genres to force include
    // genresExclude: [], //genres to exclude (they're the same that you can put in the 'genres' property)
    // year: 1999, //start year
    // airing: true, //is currently airing
    // finished: false, //is finished
    // tba: true, //to be airing in the future
  });
  const manga = result.length > 0 ? await getInfoFromURL(result[0].url) : null;
  console.log({ manga });
  const {
    name,
    japName,
    alternateName,
    url,
    imageUrl,
    country,
    type,
    startDate,
    status,
    volumesNumber,
    genres,
    author,
    editor,
    description,
  } = manga;
  fs.writeFile(
    "./posts.json",
    JSON.stringify({
      name,
      japName,
      alternateName,
      url,
      imageUrl,
      country,
      type,
      startDate,
      status,
      volumesNumber,
      genres,
      author,
      editor,
      description,
    }),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      } else {
        console.log(`File is written successfully!`);
      }
    }
  );
}

// getManga("Attaque des titans");
getAllMangas(100);
