require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");
const { Router } = require("express");

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD,
  },
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS,
  },
});

let router = Router();

router.route("/").get(async (req, res) => {
  let { word } = req.query;
  const songs = await client.search({
    index: "songs",
    body: {
      query: {
        query_string: {
          query: `${word}~ OR /.*${word}.*/gi`,
          fields: ["title", "artist"],
          fuzziness: "auto",
        },
      },
    },
    sort: ["_score"],
    size: 8,
  });
  const artists = await client.search({
    index: "artists",
    body: {
      query: {
        query_string: {
          query: `${word}~ OR /.*${word}.*/gi`,
          fields: ["name"],
          fuzziness: "auto",
        },
      },
    },
    sort: ["_score"],
    size: 8,
  });
  const albums = await client.search({
    index: "albums",
    body: {
      query: {
        query_string: {
          query: `${word}~ OR /.*${word}.*/gi`,
          fields: ["name", "artist"],
          fuzziness: "auto",
        },
      },
    },
    sort: ["_score"],
    size: 8,
  });
  const playlists = await client.search({
    index: "playlists",
    body: {
      query: {
        query_string: {
          query: `${word}~ OR /.*${word}.*/gi`,
          fields: ["name"],
          fuzziness: "auto",
        },
      },
    },
    sort: ["_score"],
    size: 8,
  });

  Promise.all([songs, albums, artists, playlists])
    .then((values) => values.map(value => value.body.hits.hits))
    .then((values) => {
      res.status(200).json({
        songs: values[0],
        albums: values[1],
        artists: values[2],
        playlists: values[3],
      });
    });
});

module.exports = router;
