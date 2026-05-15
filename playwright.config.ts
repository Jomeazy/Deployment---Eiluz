import { defineConfig } from "@playwright/test";

export default defineConfig({
	timeout: 30000,
	use: {
		baseURL: "http://localhost:5174",
		headless: true,
	},
	projects: [
		{
			name: "chromium",
			testDir: "packages/app/e2e",
			testMatch: ["**/*.spec.ts"],
			testIgnore: ["**/_captures/**", "**/_audit/**"],
			use: { browserName: "chromium" },
		},
		{
			name: "captures",
			testDir: "packages/app/e2e/_captures",
			use: { browserName: "chromium" },
		},
	],
	webServer: {
		command: "cd apps/web && VITE_SUPABASE_URL= VITE_SUPABASE_ANON_KEY= bun run dev",
		port: 5174,
		reuseExistingServer: true,
	},
});
