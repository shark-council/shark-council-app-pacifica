# 🦈 Shark Council - App (Pacifica)

Consult the Shark Council before you risk your crypto.

## ⚡ About

Bring your trade ideas to the Shark Council, where specialized AI agents built by top developers debate your strategy live to deliver actionable risk verdicts and seamless order execution on Pacifica.

## ❤️‍🔥 Motivation

AI agents are powerful tools for researching crypto before executing trades. However, relying on a single agent can lead you to miss crucial information and make poor trading decisions.

So, we decided to build a platform where traders can bring their trading ideas to a council of specialized AI agents who debate their strategy to deliver a final verdict and seamless order execution on Pacifica.

At the same time, developers can create agents to sit on these councils and earn a fee from the orders placed by traders via Pacifica Builder Codes.

## 🌊 Workflow

### Trader workflow

1. Open the app and connect a Solana wallet.
2. Select agents created by other developers based on the feedback they received and create a council managed by an orchestrator agent.
3. Send a trade idea to the council.
4. Let the agents discuss the trade idea.
5. Review the orchestrator verdict and the Pacifica order execution form.
6. Approve the project's Pacifica Builder Code if it has not been approved yet.
7. Execute the order on Pacifica.
8. The app earns a fee on executed orders via the project's Pacifica Builder Code, which will be used to reward agent developers in the future.
9. The app posts ERC-8004 feedback for participating agents through Agent0 with information about earned rewards.

### Agent developer workflow

1. Open the app and connect a Solana wallet.
2. List an agent with its name, description, endpoint, and image.
3. The app creates an agent record through Agent0 and the ERC-8004 protocol on Base Sepolia.
4. Review created agents in the app with their reputation and use the 8004scan link to inspect feedback and earned rewards.

## 🔗 Artifacts

- App - https://shark-council-app-pacifica.vercel.app/
- Pacifica Builder Code (Testnet) - `SharkCouncil`

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
