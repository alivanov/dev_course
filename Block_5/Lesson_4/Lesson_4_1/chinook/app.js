// https://www.sqlitetutorial.net/sqlite-sample-database
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

const Playlist = require("./models/playlist");
const Artist = require("./models/artist");
const Album = require("./models/album");
const Track = require("./models/track");

const app = express();
app.use(bodyParser.json());

// 1 to many
Artist.hasMany(Album, {
  foreignKey: "ArtistId"
});
Album.belongsTo(Artist, {
  foreignKey: "ArtistId"
});

// many to many
Playlist.belongsToMany(Track, {
  through: "playlist_track",
  foreignKey: "PlaylistId",
  timestamps: false
});

Track.belongsToMany(Playlist, {
  through: "playlist_track",
  foreignKey: "TrackId",
  timestamps: false
});

// api routes

//artists
app.post("/api/artists", (req, res, next) => {
  Artist.create({
    name: req.body.name
  }).then(
    (artist) => {
      res.json(artist);
    },
    (validation) => {
      res.status(422).json({
        errors: validation.errors.map((error) => {
          return { attribute: error.path, message: error.message };
        })
      });
    }
  );
});

app.get("/api/artists/:id", (req, res, next) => {
  let { id } = req.params;

  Artist.findByPk(id, { include: [Album] }).then((artist) => {
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send();
    }
  });
});

//playlists
app.get("/api/playlists", (req, res, next) => {
  let filter = {};
  let { q } = req.query;

  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Playlist.findAll(filter).then((playlists) => {
    res.json(playlists);
  });
});

app.get("/api/playlists/:id", (req, res, next) => {
  let { id } = req.params;

  Playlist.findByPk(id, { include: [Track] }).then((playlist) => {
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send();
    }
  });
});

app.delete("/api/playlists/:id", (req, res, next) => {
  let { id } = req.params;

  Playlist.findByPk(id)
    .then((playlist) => {
      if (playlist) {
        return playlist.setTracks([]).then(() => {
          return playlist.destroy();
        });
      } else {
        return Promise.reject();
      }
    })
    .then(
      () => {
        res.status(204).send();
      },
      () => {
        res.status(404).send();
      }
    );
});

//tracks
app.get("/api/tracks/:id", (req, res, next) => {
  let { id } = req.params;

  Track.findByPk(id, { include: [Playlist] }).then((track) => {
    if (track) {
      res.json(track);
    } else {
      res.status(404).send();
    }
  });
});

//albums

app.get("/api/albums/:id", (req, res, next) => {
  let { id } = req.params;

  Album.findByPk(id, { include: [Artist] }).then((album) => {
    if (album) {
      res.json(album);
    } else {
      res.status(404).send();
    }
  });
});

// app start
app.listen(8000);
