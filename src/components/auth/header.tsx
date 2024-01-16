import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-4">
      <h1 className={cn("text-6xl font-bold drop-shadow-md", font.className)}>
        🔐 Auth
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
