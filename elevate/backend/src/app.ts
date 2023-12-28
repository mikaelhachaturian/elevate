import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
import { initDB } from './db';

dotenv.config();

const app = express();

const clientId: string | undefined = process.env.GOOGLE_CLIENT_ID;
const clientSecret: string | undefined = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('Missing required environment variables');
}

app.use(cors());
app.use(express.json());

const oAuth2Client = new OAuth2Client(clientId, clientSecret, 'postmessage');

app.post('/auth/google', async (req: Request, res: Response) => {
  console.log(req.body.code);
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);

  res.json(tokens);
});

app.post('/auth/google/refresh-token', async (req: Request, res: Response) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken
  );
  const { credentials } = await user.refreshAccessToken(); // obtain new tokens
  res.json(credentials);
});

// DB Configuration
initDB();

// App Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
