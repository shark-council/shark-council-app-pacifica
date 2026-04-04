"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { handleError } from "@/lib/error";
import axios from "axios";

export default function PacificaPage() {
  async function handleGetAccountInfo() {
    try {
      console.log("[Component] Getting account info...");

      const { data } = await axios.get(
        "https://test-api.pacifica.fi/api/v1/account",
        {
          params: { account: "B6Pe5zRjr573pgo5BgaYPWuWaDuHp9v91fRhBNftRwKg" },
        },
      );

      console.log("[Component] Account info:", data);
    } catch (error) {
      handleError({ error, toastTitle: "Failed to get account info" });
    }
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h2 className="max-w-md text-3xl font-bold tracking-tight">Pacifica</h2>
      <Separator className="mt-4" />
      <div className="mt-4">
        <Button onClick={handleGetAccountInfo}>Get Account Info</Button>
      </div>
    </main>
  );
}
