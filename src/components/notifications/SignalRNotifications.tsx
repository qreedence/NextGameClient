import React, { useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import useGetNotifications from "@/hooks/useGetNotifications";
import { toast } from "sonner";

interface SignalRNotificationsProps {
  children: React.ReactNode;
}

const SignalRNotifications = ({ children }: SignalRNotificationsProps) => {
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(
    null
  );
  const { invalidateNotifications } = useGetNotifications();

  useEffect(() => {
    const connectToHub = async () => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7145/notificationHub")
          .configureLogging(LogLevel.Information)
          .withAutomaticReconnect()
          .build();

        setHubConnection(connection);

        connection.on("NotificationsUpdated", () => {
          //   console.log(
          //     "Received NotificationsUpdated signal. Invalidating query..."
          //   );
          invalidateNotifications();
          toast("New notification received");
        });

        await connection.start();
        // console.log("SignalR connection started");
      } catch (error) {
        console.error("Error connecting to SignalR hub:", error);
      }
    };

    connectToHub();

    return () => {
      if (hubConnection) {
        hubConnection.off("NotificationsUpdated");
        hubConnection.stop().catch((error) => {
          console.error("Error stopping SignalR connection:", error);
        });
      }
    };
  }, []);

  return <>{children}</>;
};

export default SignalRNotifications;
