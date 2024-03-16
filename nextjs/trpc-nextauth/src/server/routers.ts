import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  sayHello: publicProcedure.query(async () => {
    return {
      message: "Hello",
    };
  }),
});

export type AppRouter = typeof appRouter;
