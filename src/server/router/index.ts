// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { passwordRouter } from "./password";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("password.", passwordRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
