
// Install express using: npm install express
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3030;
// Enable CORS
app.use(cors());

// Serve static files from the 'modules' directory
app.use('/modules', express.static(path.join(__dirname, 'modules')));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
