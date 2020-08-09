import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", ".env") });

import { CineClient } from "./lib";

const client = new CineClient({ token: process.env.DISCORD_TOKEN });

client.login();