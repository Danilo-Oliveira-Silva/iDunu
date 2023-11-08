const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(express.static('game'))

app.get('/game', (_request, response) => {
    response.sendFile(`${__dirname}/game/index.html`);
});

app.listen(4000, () => {
  console.log(`Escutando na porta 4000`);
});