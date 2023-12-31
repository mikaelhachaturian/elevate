import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
import { initDB } from './services/db';
import { getUser, saveUser } from './services/users';

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
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  await saveUser(tokens);

  const { id_token, expiry_date } = tokens;

  res.json({ id_token, expiry_date });
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

app.get('/api/users', async (req: Request, res: Response) => {
  const user = await getUser(req.query.id_token as string);
  if (user) {
    const { name, email, given_name, picture, id_token } = user;
    return res.json({ name, email, given_name, picture, id_token });
  }
  return res.status(404).json({ error: 'user not found' });
});

app.delete('/api/users', async (req: Request, res: Response) => {
  const user = await getUser(req.query.id_token as string);
  if (user) {
    await user.destroy();
    return res.json({ message: `${user.email} deleted` });
  }
  return res.status(404).json({ error: 'user not found' });
});

app.get('/api/thirdparty', async (req: Request, res: Response) => {
  const providers = [
    { name: 'mika', cost: '500' },
    { name: 'alon', cost: '500' },
  ];

  return res.json({ providers });
});

// DB Configuration
initDB();

// App Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
