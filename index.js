const express = require('express');
const NodeID3tag = require('node-id3tag');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET, PUT, POST, DELETE',
};
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/assets', express.static('assets'));
const path = './assets/FalakTuGara.mp3';
const port = 8000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get-tags', async (req, res) => {
  const options = {
    include: ['TALB', 'TIT2', 'TPE1'], // only read the specified tags (default: all)
    exclude: ['APIC'], // don't read the specified tags (default: [])
    // don't generate raw object (default: false)
  };
  let tags = NodeID3tag.read(path, options);
  return res.json(tags);
});
app.post('/update-tags', async (req, res) => {
  const tags = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    composer: req.body.composer,
    genre: req.body.genre,
    copyright: req.body.copyright,
    APIC: './assets/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png',
  };
  await NodeID3tag.write(tags, path); //  Returns true/false or, if buffer passed as file, the tagged buffer
  res.json('success');
});
app.get('/remove', async (req, res) => {
  let success = await NodeID3tag.removeTags(path); //  Returns true/false or, if buffer passed as file, the tagged buffer
  res.json(success);
});

app.get('/home', async (req, res) => {
  const tags = {
    title: 'Title',
    artist: 'Artist',
    album: 'Album',
    composer: 'Composer',
    genre: 'Genre',
    copyright: 'copyriht',
    APIC: './assets/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png',
  };
  await NodeID3tag.write(tags, path); //  Returns true/false or, if buffer passed as file, the tagged buffer
  res.json('success');
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port} }!`),
);
