"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return result.json();
}

export default async function Home() {
  const recipes = await getRecipes();

  const handleToast = () =>
    toast("Event has been created.", {
      duration: 3000,
      position: "top-right",
    });

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.lorem.space/image/face?w=150&h=150&r=${Math.random()}`}
                  alt="@shadcn"
                />
                <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleToast}>View Recipe</Button>
              {recipe.vegan && <Badge variant="outline">Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
