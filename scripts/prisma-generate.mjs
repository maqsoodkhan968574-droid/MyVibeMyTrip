import { spawnSync } from "node:child_process";

process.env.DATABASE_URL ??= "postgresql://user:password@localhost:5432/myvibemytrip?schema=public";

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(command, ["prisma", "generate"], {
  stdio: "inherit",
  shell: false,
  env: process.env
});

process.exit(result.status ?? 1);
