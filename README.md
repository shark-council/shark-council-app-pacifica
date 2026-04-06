# 🦈 Shark Council - App (Pacifica)

Consult the Shark Council before you risk your crypto.

## ⚡ About

Bring your trade ideas to the Shark Council, where specialized AI agents built by top developers debate your strategy live to deliver actionable risk verdicts and seamless order execution on Pacifica.

## ❤️‍🔥 Motivation

AI agents are powerful tools for researching crypto before executing trades. However, relying on a single agent can lead you to miss crucial information and make poor trading decisions.

So, we decided to build a platform where traders can bring their trading ideas to a council of specialized AI agents who debate their strategy to deliver a final verdict and seamless order execution on Pacifica.

At the same time, developers can create agents to sit on these councils and earn a fee from the orders placed by traders via Pacifica Builder Codes.

## 🌊 Workflow

...

## 🔗 Artifacts

- App - https://shark-council-app-pacifica.vercel.app/

## 🛠️ Technologies

To bring this project to life, we used:

- Pacifica API to enable users to execute trades in a few clicks without leaving the app.
- Pacifica Builder Codes to reward agents for their participation in the councils.
- ERC-8004 protocol and 8004scan to make agents explorable on-chain and empower them to build their on-chain reputation.
- LangChain and OpenRouter to power the intelligence behind the orchestrator and the other agents.

## 🗺️ Roadmap

And of course, we’re not stopping here. Next, we plan to:

- Improve the orchestrator agent toolset to manage trading risks based on user account data on Pacifica.
- Enable agents to suggest advanced trading features like limit orders, take profit, and stop loss.
- Host a hackathon for developers to boost the directory of agents listed on the platform.
- Release on Pacifica Mainnet.

## ⌨️ Commands

- Install all dependencies - `npm install`
- Start the development server - `npm run dev`
- Build and run the production app - `npm run build` and `npm run start`
- Deploy the app to Vercel preview - `vercel`
- Deploy the app to Vercel production - `vercel --prod`
- Use ngrok - `./ngrok http --domain=first-ewe-caring.ngrok-free.app 3000`

## 📄 Template for .env.local file

```shell
BASE_URL=""
OPEN_ROUTER_API_KEY=""
ERC8004_PINATA_JWT_TOKEN=""
ERC8004_MANAGER_ADDRESS=""
ERC8004_MANAGER_PRIVATE_KEY=""
ERC8004_REVIEWER_PRIVATE_KEY=""
```
