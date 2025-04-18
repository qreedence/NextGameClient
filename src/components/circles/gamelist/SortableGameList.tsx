import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import GameListItem from "./GameListItem";

interface GameListProps {
  title: string;
  circleId: number;
  listType: "currentlyPlaying" | "backlog";
  games: CircleGame[];
  onGamesReordered?: (games: CircleGame[]) => void;
}

export function GameList({
  title,
  circleId,
  listType,
  games: initialGames,
  onGamesReordered,
}: GameListProps) {
  // Sort initial games by displayOrder
  const sortedInitialGames = [...initialGames].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
  const [games, setGames] = useState<CircleGame[]>(sortedInitialGames);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setGames((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newGames = arrayMove(items, oldIndex, newIndex);

        // Update displayOrder values
        const updatedGames = newGames.map((game, index) => ({
          ...game,
          displayOrder: index,
        }));

        // Persist changes to backend
        saveGameOrder(circleId, listType, updatedGames);

        // Call the callback if provided
        if (onGamesReordered) {
          onGamesReordered(updatedGames);
        }

        return updatedGames;
      });
    }
  }

  async function saveGameOrder(
    circleId: number,
    listType: string,
    games: CircleGame[]
  ) {
    try {
      const response = await fetch("/api/circles/games/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          circleId: circleId,
          listType: listType,
          gameIds: games.map((g) => g.id),
          displayOrders: games.map((g) => g.displayOrder),
        }),
      });

      if (!response.ok) {
        console.error("Failed to save game order");
      }
    } catch (error) {
      console.error("Error saving game order:", error);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={games.map((game) => game.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {games.map((game) => (
              <GameListItem key={game.id} game={game} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
