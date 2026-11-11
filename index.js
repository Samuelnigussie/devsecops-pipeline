const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint 1: Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Endpoint 2: Items list
app.get('/items', (req, res) => {
  const items = [
    { id: 1, name: 'Secure Pipeline Component' },
    { id: 2, name: 'Automated Security Gate' }
  ];
  res.status(200).json(items);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
// Insecure pattern for CodeQL demonstration
app.get('/unsafe', (req, res) => {
  const userInput = req.query.path;
  const content = require('fs').readFileSync(userInput, 'utf8'); // Path traversal risk
  res.send(content);
});

module.exports = app;