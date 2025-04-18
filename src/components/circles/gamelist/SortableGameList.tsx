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
import { CircleGameDTO } from "@/apiclient";
import { toast } from "sonner";

interface GameListProps {
  circleId: string;
  games: CircleGameDTO[];
  onGamesReordered?: (games: CircleGameDTO[]) => void;
}

export function GameList({
  games: initialGames,
  onGamesReordered,
}: GameListProps) {
  const sortedInitialGames = [...initialGames].sort(
    (a, b) => a.displayOrder! - b.displayOrder!
  );
  const [games, setGames] = useState<CircleGameDTO[]>(sortedInitialGames);

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
        saveGameOrder();

        // Call the callback if provided
        if (onGamesReordered) {
          onGamesReordered(updatedGames);
        }

        return updatedGames;
      });
    }
  }

  async function saveGameOrder() {
    //TODO: Implement
    toast("Not implemented yet!");
  }

  return (
    <div className="w-full mx-auto py-8">
      {/* <h2 className="text-xl font-bold mb-4">{title}</h2> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={games.map((game) => game.id!)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 w-[70%] mx-auto">
            {games.map((game) => (
              <GameListItem key={game.id} game={game} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
