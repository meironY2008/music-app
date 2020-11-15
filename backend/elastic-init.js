require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");
const { Song, Album, Artist, Playlist, Library } = require("./models");

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD,
  },
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS,
  },
});

const initSongs = async () => {
  const allSongs = await Song.findAll({
    include: [
      {
        model: Artist,
        attributes: ["coverImg", "artistName"],
        required: true,
      },
    ],
  });
  allSongs.forEach((song) => {
    client.index({
      index: "songs",
      id: song.id,
      body: {
        title: song.title,
        length: song.length,
        image: song.Artist.coverImg,
        artist: song.Artist.artistName,
      },
    });
  });
  await client.indices.refresh({ index: "songs" });
};

const initAlbums = async () => {
  const allAlbums = await Album.findAll({
    include: [
      {
        model: Artist,
        attributes: ["artistName"],
        required: true,
      },
    ],
  });
  allAlbums.forEach((album) => {
    client.index({
      index: "albums",
      id: album.id,
      body: {
        name: album.albumName,
        artist: album.Artist.artistName,
        released: album.releasedAt,
        image: album.coverImg,
      },
    });
  });
  await client.indices.refresh({ index: "albums" });
};

const initArtists = async () => {
  const allArtists = await Artist.findAll();
  allArtists.forEach((artist) => {
    client.index({
      index: "artists",
      id: artist.id,
      body: {
        name: artist.artistName,
        image: artist.coverImg,
      },
    });
  });
  await client.indices.refresh({ index: "artists" });
};

const initPlaylists = async () => {
    const allPlaylists = await Playlist.findAll();
    allPlaylists.forEach(async playlist => {
      const songsInPlaylist = await Song.findAll({
        include: [
          {
            model: Library,
            attributes: [],
            where: {
              playlistId: playlist.id
            }
          }
        ]
      });
      await client.index({
        index: "playlists",
        id: playlist.id,
        body: {
          name: playlist.playlistName,
          image: playlist.coverImg,
          songs: songsInPlaylist.length
        }
      })
    });
}

initSongs().catch((e) => console.log(e));
initAlbums().catch((e) => console.log(e));
initArtists().catch((e) => console.log(e));
initPlaylists().catch((e) => console.log(e));