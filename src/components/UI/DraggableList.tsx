import { ReactElement } from "react";

import {
  DragDropContext,
  Draggable,
  DropResult,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

import { StrictModeDroppable as Droppable } from "components";
import { reorder } from "utils";

interface DraggableListProps<T extends { id: string }> {
  items: T[];
  onReorder: (items: T[]) => void;
  droppableId: string;
  render: (
    data: T,
    ref: (element: HTMLElement | null) => void,
    draggableProps: DraggableProvidedDraggableProps,
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  ) => ReactElement;
}

export const DraggableList = <T extends { id: string }>({
  items,
  onReorder,
  droppableId,
  render,
}: DraggableListProps<T>) => {
  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const reorderedItems = reorder(items, source.index, destination.index);

    onReorder(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items?.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {({ innerRef, draggableProps, dragHandleProps }) =>
                  render(item, innerRef, draggableProps, dragHandleProps)
                }
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
