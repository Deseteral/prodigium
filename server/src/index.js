import nodePath from 'path';
import express from 'express';

const app = express();
const PORT = 3426;

app.use('/', express.static(nodePath.join(__dirname, 'app')));
app.use('/bower_components',
  express.static(nodePath.join(__dirname, 'bower_components'))
);

app.listen(PORT, () => console.log(`Prodigium server running on port ${PORT}`));
