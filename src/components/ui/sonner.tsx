import { Toaster as Sonner } from "sonner";
import { useTheme } from "./theme-provider";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        actionButtonStyle: {
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        },
        cancelButtonStyle: {
          backgroundColor: "var(--muted)",
          color: "var(--muted-foreground)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

