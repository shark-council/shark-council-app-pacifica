# GitHub Copilot Instructions

- **Mandatory Verification:** Always use `context7` or web search to fetch the latest documentation for external libraries or APIs. Do not guess API signatures or configurations.
- **Search Strategy:** First try `context7` for specialized library documentation. If missing or outdated, use web search tools for the most current information.
- **Project Structure & Context:** Always read the root `README.md` and any sub-project `README.md` files to understand the project's purpose, architecture, and specific development workflows.

# Project Overview

This is a Next.js app for the Shark Council.

# Project Stack

- **Next.js**: Core framework for server-side rendering and routing.
- **React**: UI library for building modular components.
- **TypeScript**: Type-safe development environment.
- **Tailwind CSS**: Utility-first styling framework.
- **shadcn/ui**: Accessible and customizable UI component primitives.
- **Solana**: Blockchain interactions via `@solana/web3.js` and `@solana/wallet-adapter`.
- **Pacifica API**
- **Pacifica Builder Codes**
- **ERC-8004**
- **Agent0**
- **8004scan**
- **LangChain**
- **OpenRouter**

# Project Structure

- `app/`: Contains the Next.js App Router folders and routes (e.g., Pacifica and Wallet pages).
- `components/`: React components organized by function:
  - `index/`: Components for the landing page hero section.
  - `layout/`: Global layout components like header, footer, and wallet connection buttons.
  - `providers/`: Context providers for Solana, theme, and more.
  - `ui/`: Reusable primitive UI components (shadcn/ui).
- `config/`: Configuration files for the application, Solana connection, and Pacifica-specific settings.
- `hooks/`: Custom React hooks.
- `lib/`: Core utility functions and logic for Solana interactions, Pacifica account management, and signing.
- `public/`: Static assets like images and branding.
- `styles/`: Global CSS and styling configurations.
- `types/`: Shared TypeScript type definitions and interfaces.
