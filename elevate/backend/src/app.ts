import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
import { initDB } from './services/db';
import { getUser, saveUser } from './services/users';
import { getProviders } from './services/providers';
import { createAppointment, getAppointments } from './services/appointments';
import { Appointment } from './models/appointment';

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
  const user = await saveUser(tokens);

  const { id_token, expiry_date } = tokens;

  res.json({ id_token, expiry_date, email: user.email });
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

app.get('/api/users/:email', async (req: Request, res: Response) => {
  const user = await getUser(req.params.email as string);
  if (user) {
    const { name, email, given_name, picture, id_token } = user;
    return res.json({ name, email, given_name, picture, id_token });
  }
  return res.status(404).json({ error: 'user not found' });
});

app.delete('/api/users/:email', async (req: Request, res: Response) => {
  const user = await getUser(req.params.email as string);
  if (user) {
    await user.destroy();
    return res.json({ message: `${user.email} deleted` });
  }
  return res.status(404).json({ error: 'user not found' });
});

app.get('/api/thirdparty', async (req: Request, res: Response) => {
  const providers = await getProviders();

  return res.json({ providers });
});

app.post('/api/appointments', async (req: Request, res: Response) => {
  const { provider, text, date, userEmail } = req.body;

  console.log(provider, text, date);

  await createAppointment({
    with: provider.name,
    by: userEmail,
    text,
    date,
  } as Appointment);

  res.json({ status: 'ok' });
});

app.get('/api/appointments/:email', async (req: Request, res: Response) => {
  const email = req.params.email as string;
  const appointments = await getAppointments(email);

  return res.json({ appointments });
});

// DB Configuration
initDB();

// App Start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
