const { req } = require("./api/request"),
  { searchScraper } = require("./api/scraper"),
  urlParser = require("./api/urlParser"),
  data = require("./utils/data"),
  utils = require("./utils/utils");
/**
 * Assign the project to an employee.
 * @param {string} query - The search query.
 * @param {string} [genre = anime] - The type of the query (anime or manga).
 * @param {string} [totalLength = 15] - The total length of the results array.
 * @param {object} options - Search options
 */
module.exports = async (query, genre = "anime", totalLength = 15, options) => {
  //variables
  let url, page, results;

  //====================================================================
  //  checks
  //
  if (!query && query !== "")
    return utils.error("No query provided for the search");
  //check the query
  else if (typeof query !== "string")
    return utils.error("Query must be a string");
  //
  if (!data.genres.map((e) => e.name).includes(genre.toLowerCase()))
    return utils.error("Genre is invalid (must be either 'anime' or 'manga')"); //check for the genre
  //
  if (typeof totalLength !== "number") {
    //check the totalLength and set a limit
    if (typeof totalLength == "object") {
      //swap the options and totalLength args
      let temp = totalLength;
      totalLength = typeof options == "number" ? options : 15;
      options = temp;
    } else utils.error("totalLength must be an integer");
  }
  //   if (totalLength > 50) totalLength = 50;
  //
  //====================================================================

  //get the html of the page
  url = "https://www.nautiljon.com/mangas/?q=&tri=0";

  results = [];
  const maxIndex = Math.floor(totalLength) - 1;

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  for (let i = 0; i <= maxIndex; i++) {
    page = await req(`${url}&dbt=${i * 50}`);
    //scrape the html
    results.push(...searchScraper(page, genre, totalLength));
    console.log(i);
    await timer(5000);
  }

  return results;
};
