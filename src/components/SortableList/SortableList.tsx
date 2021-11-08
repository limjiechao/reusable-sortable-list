import React, { useEffect, useRef } from 'react';
import Sortable, { Swap, Options } from 'sortablejs';
import DragHandle from '../DragHandle/DragHandle';

Sortable.mount(new Swap());

type SortId = string;

export interface SortableItemProps<Item> {
  sortId: SortId;
  sortLabel: string;
  item: Item;
}

const SortableItem = <Item extends unknown>({
  sortId,
  sortLabel
}: Omit<SortableItemProps<Item>, 'item'>) => (
  <div data-sort-id={sortId} className="sortable-item">
    <DragHandle />
    {sortLabel}
  </div>
);

// REF: https://github.com/SortableJS/Sortable#options
const defaultSortableOptions = {
  animation: 500,
  draggable: '.sortable-item',
  handle: '.drag-handle',
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  swap: false
};

export interface SortableListProps<Item = unknown> {
  items: SortableItemProps<Item>[];
  onSorted: (sortedItems: Item[]) => void;
  sortableListClassName?: string;
  options?: Omit<Options, 'dataIdAttr'>;
}

function SortableList<Item extends unknown>({
  sortableListClassName = 'sortable-list',
  items,
  onSorted,
  options = defaultSortableOptions
}: SortableListProps<Item>) {
  const sortableListElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = sortableListElement.current;

    // REF: https://github.com/SortableJS/Sortable#options
    const sortable = Sortable.create(element as HTMLElement, {
      ...options,
      dataIdAttr: 'data-sort-id',
      onEnd: () => {
        onSorted(
          sortable
            .toArray()
            .map(
              (sortId: SortId) =>
                (items.find(
                  (item) => item.sortId === sortId
                ) as SortableItemProps<Item>).item
            )
        );
      }
    });

    return () => {
      sortable.destroy();
    };
  }, [items, onSorted, options]);

  return (
    <section className={sortableListClassName} ref={sortableListElement}>
      {items.map(({ sortId, sortLabel }) => (
        <SortableItem<Item>
          key={sortId}
          sortId={sortId}
          sortLabel={sortLabel}
        />
      ))}
    </section>
  );
}

export default SortableList;
