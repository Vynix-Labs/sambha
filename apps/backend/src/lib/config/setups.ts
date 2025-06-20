import type { Schema } from "hono";
import type { MiddlewareHandler } from "hono";

import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { cors } from 'hono/cors'
import type { RouteConfig } from "@hono/zod-openapi";

import { pinoLogger } from "../middlewares/logger.ts";

import type { AppBindings, AppOpenAPI, AppRouteHandler } from "./types.ts";

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook,
    });
}

export function createProtectedRouter(middlewares: MiddlewareHandler[] = []) {
    const router = createRouter();

    // Apply middlewares to all routes in this router
    middlewares.forEach(middleware => {
        router.use("*", middleware);
    });

    return router;
}

export function withMiddlewares<T extends RouteConfig>(
    middlewares: MiddlewareHandler[],
    handler: AppRouteHandler<T>
): AppRouteHandler<T> {
    return async (c, next) => {
        // Apply middlewares sequentially
        let index = 0;

        const executeMiddleware = async () => {
            if (index < middlewares.length) {
                const middleware = middlewares[index++];
                return await middleware(c, executeMiddleware);
            } else {
                // All middlewares applied, call the actual handler
                return handler(c, next);
            }
        };

        return executeMiddleware();
    };
}

export function createProtectedRoute<T extends RouteConfig>(
    router: AppOpenAPI,
    route: T,
    middlewares: MiddlewareHandler[],
    handler: AppRouteHandler<T>
) {
    return router.openapi(route, withMiddlewares(middlewares, handler));
}

export default function createApp() {
    const app = createRouter();
    app.use(requestId())
        .use(serveEmojiFavicon("📝"))
        .use(cors({
            origin: '*',
            credentials: true,
        }))
        .use(pinoLogger());

    app.notFound(notFound);
    app.onError(onError);
    return app;
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
    return createApp().route("/", router);
}