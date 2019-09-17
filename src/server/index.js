const express = require('express');
const app = express();

app.use(require('./routes/default.js'));
app.listen(3333);

