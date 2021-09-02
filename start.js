

const app = require('./server/index.js');
const port = process.env.PORT || 3004;

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
