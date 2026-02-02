import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

export default function FormContainer({ children, className }: FormContainerProps) {
  return (
    <div className="flex justify-center w-screen h-screen sm:p-10 sm:bg-muted sm:overflow-auto box-border">
      <div
        className={cn(
          "w-full h-min bg-background rounded-xl shadow-sm md:p-6 p-8",
          "max-w-full md:max-w-[50vw]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
