// This runs on Vercel's Server - The user CANNOT see this code.
export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ result: "error", message: "Method not allowed" });
  }

  // 2. Get the Secret Data from Server Environment Variables
  // (These are NOT exposed to the frontend)
  const SHEET_API_URL = process.env.SHEET_API_URL;
  const API_SECRET = process.env.API_SECRET; 

  if (!SHEET_API_URL || !API_SECRET) {
    return res.status(500).json({ result: "error", message: "Server Misconfiguration" });
  }

  try {
    const data = JSON.parse(req.body);

    // 3. Attach the Secret Key securely here
    const payload = {
      ...data,
      apiSecret: API_SECRET 
    };

    // 4. Send to Google Sheets
    const googleResponse = await fetch(SHEET_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    const googleResult = await googleResponse.json();

    // 5. Return Google's response back to Frontend
    return res.status(200).json(googleResult);

  } catch (error) {
    return res.status(500).json({ result: "error", message: "Proxy Error: " + error.message });
  }
}