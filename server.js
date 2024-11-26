const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save', (req, res) => {
  try {
    fs.writeFileSync('accordion_data.json', JSON.stringify(req.body));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/load', (req, res) => {
  try {
    if (fs.existsSync('accordion_data.json')) {
      const data = JSON.parse(fs.readFileSync('accordion_data.json'));
      res.json(data);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
