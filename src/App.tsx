import React, { ReactNode, useState } from 'react';
import './App.css';
import {
  AppliedSortableList,
  BookMetadata
} from './components/AppliedSortableList/AppliedSortableList';
import DragHandle from './components/DragHandle/DragHandle';

interface ChildrenOnlyProps {
  children: ReactNode;
}

function CenteredRow({ children }: ChildrenOnlyProps) {
  return <div className="centered-row">{children}</div>;
}

function Instruction() {
  return (
    <p className="instructions">
      Click and hold <DragHandle /> to rearrange the books.
    </p>
  );
}

function EmptyPlaceholder() {
  return <div className="no-books">No books to be sorted</div>;
}

function JsonPreview({ children }: ChildrenOnlyProps) {
  return <pre className="code">{children}</pre>;
}

function App() {
  const [unlistedBooks, setUnlistedBooks] = useState<BookMetadata[]>([
    {
      title: 'Heretics of Dune',
      authors: ['Frank Herbert'],
      published: 1984,
      series: 'Original'
    },
    {
      title: 'Chapterhouse: Dune',
      authors: ['Frank Herbert'],
      published: 1985,
      series: 'Original'
    },
    {
      title: 'Hunters of Dune',
      authors: ['Brian Herbert', 'Kevin J. Anderson'],
      published: 2006,
      series: 'Original'
    },
    {
      title: 'Sandworms of Dune',
      authors: ['Brian Herbert', 'Kevin J. Anderson'],
      published: 2007,
      series: 'Original'
    }
  ]);
  const [listedBooks, setListedBooks] = useState<BookMetadata[]>([
    {
      title: 'Dune',
      authors: ['Frank Herbert'],
      published: 1965,
      series: 'Original'
    },
    {
      title: 'Dune Messiah',
      authors: ['Frank Herbert'],
      published: 1969,
      series: 'Original'
    },
    {
      title: 'Children of Dune',
      authors: ['Frank Herbert'],
      published: 1976,
      series: 'Original'
    },
    {
      title: 'God Emperor of Dune',
      authors: ['Frank Herbert'],
      published: 1981,
      series: 'Original'
    }
  ]);

  const addBook = () => {
    const [book, ...remainingBooks] = unlistedBooks;

    if (book) {
      setUnlistedBooks(remainingBooks);
      setListedBooks(listedBooks.concat(book));
    }
  };
  const removeBook = () => {
    const [book, ...remainingBooks] = listedBooks;

    if (book) {
      setListedBooks(remainingBooks);
      setUnlistedBooks(unlistedBooks.concat(book));
    }
  };

  return (
    <div className="App">
      <CenteredRow>
        <Instruction />
      </CenteredRow>

      <CenteredRow>
        <div className="main">
          {listedBooks.length ? (
            <AppliedSortableList
              unsortedItems={listedBooks}
              onSorted={setListedBooks}
            />
          ) : (
            <EmptyPlaceholder />
          )}
        </div>

        <JsonPreview>{JSON.stringify(listedBooks, null, 4)}</JsonPreview>
      </CenteredRow>

      <CenteredRow>
        <button
          className="button"
          onClick={addBook}
          disabled={unlistedBooks.length === 0}
        >
          Add book
        </button>

        <button
          className="button"
          onClick={removeBook}
          disabled={listedBooks.length === 0}
        >
          Remove book
        </button>
      </CenteredRow>
    </div>
  );
}

export default App;
