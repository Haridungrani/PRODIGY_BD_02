// const express = require('express');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// const PORT = 3000;

// app.use(express.json());
// app.use('/users', userRoutes);

// app.use((req, res) => {
//     res.status(404).json({ error: 'Not Found' });
// });

// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// app.listen(PORT, () => {
//     console.log(`✅ Server running at http://localhost:${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Connect DB and Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
