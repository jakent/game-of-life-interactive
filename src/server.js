import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'target')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port', process.env.PORT || 3000);
});
