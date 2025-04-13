import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { useEffect, useState } from "react";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  const [position, setPosition] = useState("bottom-right");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPosition("top-right");
      } else {
        setPosition("bottom-right");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
        },
        position: position,
      }}
      {...props}
    />
  );
};

export { Toaster };
