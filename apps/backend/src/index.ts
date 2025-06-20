import { createApp, configureOpenAPI, env } from "@/lib/config/index.config";
import { connectDB } from "@/lib/database/index.database";
import routes from "@/routes/index.routes";
import { serve } from "@hono/node-server";

connectDB();

const app = createApp();

configureOpenAPI(app);

app.get("/", (c) => {
    return c.json({
        message: "Sambha API is running",
        version: "1.0.0",
        status: "running",
        timestamp: new Date().toISOString()
    });
});

// Register all routes
routes.forEach(route => {
    app.route("/api/v1", route);
});

const port = Number(env.PORT) || 3001;

console.log(`🚀 Server is running on port ${port}`);
console.log(`🚀 Backend Api listening on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
