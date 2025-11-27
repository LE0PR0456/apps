import {config} from "dotenv"

config();

export const PORT=process.env.PORT;
export const FRONTEND_URL=process.env.FRONTEND_URL;
export const MONGODB_URI=process.env.MONGODB_URI;
