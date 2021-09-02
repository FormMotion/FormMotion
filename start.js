

const app = require('./server/index.js');
const port = process.env.PORT || 3000;

db.sync().then(() => {

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
