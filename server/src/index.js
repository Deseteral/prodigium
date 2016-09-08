import nodePath from 'path';
import express from 'express';
import RedditBackgrounds from './reddit-backgrounds';

const app = express();
const PORT = 3426;

const subreddits = ['earthporn', 'skyporn'];
const redditBackgrounds = new RedditBackgrounds(subreddits);

app.use('/', express.static(nodePath.join(__dirname, 'app')));
app.use('/widgets', express.static(nodePath.join(__dirname, 'app/widgets')));
app.use('/bower_components',
  express.static(nodePath.join(__dirname, 'bower_components'))
);

redditBackgrounds.fetchBackgrounds().then(() => {
  console.log('Fetched backgrounds from reddit');

  app.listen(PORT, () =>
    console.log(`Prodigium server running on port ${PORT}`)
  );
});
