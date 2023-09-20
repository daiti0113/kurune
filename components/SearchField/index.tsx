'use client';

import { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';

export default function SearchField() {
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const _onEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.code === 'Enter' && !composing) {
        location.href = `/search?q=${inputRef.current?.value}`;
      }
    },
    [composing],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';
  return (
    <label className="flex pr-6 pl-4 border-2 rounded-3xl border-black max-w-xl h-10 items-center">
      <div className="bg-[url('/search.svg')] bg-no-repeat h-4 w-4" />
      <input
        type="search"
        name="q"
        ref={inputRef}
        className="pl-2 focus:outline-none"
        placeholder="Search..."
        onKeyDown={_onEnter}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        defaultValue={defaultQuery}
      />
    </label>
  );
}
