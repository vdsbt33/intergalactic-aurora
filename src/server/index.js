const express = require('express');
const app = express();

process.env.TZ = 'BRT';

app.use(require('./routes/default.js'));
app.listen(3333);

