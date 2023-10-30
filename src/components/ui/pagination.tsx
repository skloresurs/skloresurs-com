'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'react-headless-pagination';

import MdiArrowLeftBold from '../icons/MdiArrowLeftBold';
import MdiArrowRightBold from '../icons/MdiArrowRightBold';

interface IProps {
  totalPages: number;
  href: string;
}

export default function CustomPagination({ totalPages, href }: IProps) {
  const router = useRouter();
  const query = useSearchParams();
  const [page, setPage] = useState<number>(
    (Number(query.get('page')) || 1) - 1,
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const current = new URLSearchParams(Array.from(query.entries()));
    if (newPage === 0) {
      current.delete('page');
    } else {
      current.set('page', (newPage + 1).toString());
    }
    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.push(`${href}${newQuery}`, { scroll: false });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Pagination
      currentPage={page}
      setCurrentPage={handlePageChange}
      middlePagesSiblingCount={1}
      edgePageCount={1}
      totalPages={totalPages}
      className="mt-12"
    >
      <nav className="flex grow justify-center">
        <ul className="flex items-center gap-1">
          <Pagination.PrevButton className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-border duration-300 hover:bg-primary/50">
            <MdiArrowLeftBold className="h-6 w-6" />
          </Pagination.PrevButton>
          <Pagination.PageButton
            activeClassName="bg-primary text-black"
            inactiveClassName=""
            className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-border duration-300 hover:bg-primary/50"
          />
          <Pagination.NextButton className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-border duration-300 hover:bg-primary/50">
            <MdiArrowRightBold className="h-6 w-6" />
          </Pagination.NextButton>
        </ul>
      </nav>
    </Pagination>
  );
}