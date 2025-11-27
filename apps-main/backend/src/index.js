import app from "./app.js";
import {PORT} from "./config.js";
import http from "http";
import {connectDB} from "./db.js";

async function main() {
    try {
        await connectDB();
        const server = http.createServer(app);

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

main();