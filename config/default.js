import dotenv from "dotenv";

dotenv.config();

const defaultConfig = {
    tokenSecret : process.env.TOKEN_SECRET || "dhkmsgseieYhb79Nj"
}

export default defaultConfig;