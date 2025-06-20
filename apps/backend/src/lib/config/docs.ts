import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types.ts";

import packageJSON from "../../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc("/doc", {
        openapi: "3.0.0",
        info: {
            version: packageJSON.version,
            title: "Mingloft Admin API",
        },
    });

    app.get(
        "/api/v1/docs",
        Scalar({
            url: "/doc",
            theme: "kepler",
            layout: "modern",
            defaultHttpClient: {
                targetKey: "js",
                clientKey: "fetch",
            },
        }),
    );
}