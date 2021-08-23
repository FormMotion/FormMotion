const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const filePath = path.join(
  __dirname,
  '../../public/assets/temp_char_facing_right_run.png'
);

router.post('/', function (req, res, next) {
  const data = req.body.dataUrl;
  const uri = data.split(',')[1];
  const img = Buffer.from(uri, 'base64');
  fs.writeFileSync(filePath, img, (err) => {
    if (err) return console.error(err);
    console.log('file saved to ', filePath);
  });
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
  });
  res.end(img);
});

module.exports = router;
