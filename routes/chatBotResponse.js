const { spawn } = require('child_process');
const path = require('path');

module.exports = (app) => {
    // Endpoint to interact with the Python script
    app.post('/chat-with-bot', (req, res) => {
        const userInput = req.body.message;

        const pythonScriptPath = path.join(__dirname, 'chatBot.py');
        // Spawn a child process to run the Python script
        const pythonProcess = spawn('python', [pythonScriptPath, userInput]);

        // Collect data from the Python script's output
        pythonProcess.stdout.on('data', (data) => {
            console.log('bot output >>>>', data);
            // Send the response back to the client
            res.json({ message: data.toString() });
        });

        // Handle errors
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            res.status(500).json({ error: data });
        });
    });
};
