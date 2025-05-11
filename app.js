const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint pour exécuter une commande Bash
app.post('/run', (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'Commande manquante' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(200).json({ output: stdout, warning: stderr });
    }
    res.status(200).json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
