const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const HAWKINS_URL = (process.env.HAWKINS_URL === 'true');

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    HAWKINS_URL,
  );

  res.status(200).json(characters);
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}` );
});
