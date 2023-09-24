'use client';

import { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';


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
    [composing]
  );
  const onClick = () => {
    location.href = `/search?q=${inputRef.current?.value}`;
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';
  return (
    <label className="flex pr-1 pl-4 border-2 rounded-full border-black max-w-xl w-full h-10 items-center">
      <input
        type="search"
        name="q"
        ref={inputRef}
        className="w-full pl-2 focus:outline-none"
        placeholder="Search..."
        onKeyDown={_onEnter}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        defaultValue={defaultQuery}
      />
      <div className="bg-[url('/search.svg')] bg-no-repeat h-4 w-4 bg-primary-500 p-4 bg-center rounded-full" onClick={onClick} />
    </label>
  );
}
