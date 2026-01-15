const express = require("express");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

const app = express();
app.use(cors());

const LIVEKIT_API_KEY = "APIHFKGi4hpyGRG";
const LIVEKIT_API_SECRET = "D1YHB2avdPEUsrHmpeXTSbLN5XMBOhVre1IoQsxvd49";

app.get("/token", async (req, res) => {
  console.log("HIT /token");

  const { room, name, role } = req.query;
  console.log("QUERY:", room, name, role);

  const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: name,
  });

  token.addGrant({
    roomJoin: true,
    room,
    canPublish: role === "host",
    canSubscribe: true,
  });

  const jwt = await token.toJwt(); // 🔥 INI KUNCINYA

  console.log("JWT STRING:", jwt);

  res.setHeader("Content-Type", "text/plain");
  res.send(jwt);
});

app.listen(3001, "0.0.0.0", () => {
  console.log("✅ Token server running on port 3000");
});
