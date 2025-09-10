const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Tạm thay Redis bằng in-memory object
const storage = {};

// API cập nhật vị trí container
app.post("/update-location", (req, res) => {
  const { containerId, lat, lng, speed } = req.body;
  const data = {
    lat,
    lng,
    speed,
    status: speed > 0 ? "moving" : "stopped",
    updatedAt: new Date().toISOString(),
  };

  // Lưu vào memory
  storage[containerId] = data;

  res.json({ success: true, data });
});

// API lấy vị trí container
app.get("/location/:containerId", (req, res) => {
  const containerId = req.params.containerId;
  const data = storage[containerId] || null;
  res.json({ containerId, location: data });
});

app.listen(3000, () => console.log("🚀 Backend running at http://localhost:3000"));
