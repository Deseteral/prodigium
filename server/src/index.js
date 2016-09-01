import nodePath from 'path';
import express from 'express';

const app = express();
const PORT = 3426;

app.use('/', express.static(nodePath.join(__dirname, 'app')));
app.listen(PORT, () => console.log(`Prodigium server running on port ${PORT}`));
