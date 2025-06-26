import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Basic health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Bot is running!",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    botStatus: "online",
  });
});

// Bot status endpoint
app.get("/status", (req, res) => {
  res.json({
    bot: "Cave Boss Scheduler",
    status: "online",
    commands: ["!setTimer"],
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
