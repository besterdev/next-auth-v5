"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return result.json();
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-bold drop-shadow-md", font.className)}>
          🔐 Auth
        </h1>
        <p>A simple authentication service</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button size="lg">Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
