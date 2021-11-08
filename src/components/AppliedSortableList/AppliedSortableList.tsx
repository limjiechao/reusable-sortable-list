import React from 'react';
import SortableList, {
  SortableItemProps,
  SortableListProps
} from '../SortableList/SortableList';
import { NanoIdService } from '../../services/nanoid';

const generateUniqueId = new NanoIdService().generate;

export interface BookMetadata {
  title: string;
  authors: string[];
  published: number;
  series: string;
}

interface AppliedSortableListProps<Item> {
  unsortedItems: Item[];
  onSorted: SortableListProps<Item>['onSorted'];
}

export const createAppliedSortableList = <Item extends unknown>(
  functor: (item: Item) => SortableItemProps<Item>
) =>
  function AppliedSortableList({
    unsortedItems,
    onSorted
  }: AppliedSortableListProps<Item>) {
    const items = unsortedItems.map(functor);

    return <SortableList<Item> items={items} onSorted={onSorted} />;
  };

export const AppliedSortableList = createAppliedSortableList<BookMetadata>(
  (unsortedItem) => ({
    sortId: `sort-${generateUniqueId()}`,
    sortLabel: unsortedItem.title,
    item: unsortedItem
  })
);
