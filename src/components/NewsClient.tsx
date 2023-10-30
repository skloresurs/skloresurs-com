/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import MdiArrowTopRightThick from '@/components/icons/MdiArrowTopRightThick';
import CustomPagination from '@/components/ui/pagination';
import type IPost from '@/interfaces/Post';
import { useCurrentLocale } from '@/utils/i18nClient';

import { Badge } from './ui/badge';

function Colors(color: string) {
  switch (color) {
    case 'red':
      return 'bg-red-50 text-red-500';
    case 'orange':
      return 'bg-orange-50 text-orange-500';
    case 'amber':
      return 'bg-amber-50 text-amber-500';
    case 'yellow':
      return 'bg-yellow-50 text-yellow-500';
    case 'lime':
      return 'bg-lime-50 text-lime-500';
    case 'green':
      return 'bg-green-50 text-green-500';
    case 'emerald':
      return 'bg-emerald-50 text-emerald-500';
    case 'teal':
      return 'bg-teal-50 text-teal-500';
    case 'cyan':
      return 'bg-cyan-50 text-cyan-500';
    case 'blue':
      return 'bg-blue-50 text-blue-500';
    case 'indigo':
      return 'bg-indigo-50 text-indigo-500';
    case 'violet':
      return 'bg-violet-50 text-violet-500';
    case 'purple':
      return 'bg-purple-50 text-purple-500';
    case 'fuchsia':
      return 'bg-fuchsia-50 text-fuchsia-500';
    case 'pink':
      return 'bg-pink-50 text-pink-500';
    case 'rose':
      return 'bg-rose-50 text-rose-500';
    default:
      return '';
  }
}

function Post({ data }: { data: IPost }) {
  return (
    <Link href={`/news/${data.id}`} className="group flex flex-col">
      <div className="relative mb-6 aspect-square w-full overflow-hidden sm:mb-8">
        <Image
          src={data.image}
          fill
          alt={data.title}
          className="object-cover duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:blur-sm"
        />
      </div>
      <div className="mb-3 flex flex-row items-start gap-4 duration-300 group-hover:text-primary">
        <h2 className="flex-1 text-lg font-medium sm:text-xl lg:text-2xl">
          {data.title}
        </h2>
        <MdiArrowTopRightThick className="h-6 w-6" />
      </div>
      <p className="line-clamp-2 text-muted-foreground">{data.description}</p>
      {data.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <Badge variant="outline" className={Colors(tag.color)} key={tag.id}>
              {tag.title}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}

export default function NewsClient() {
  const locale = useCurrentLocale();
  const query = useSearchParams();
  const [news, setNews] = useState<IPost[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`/api/news?page=${query.get('page') ?? 1}&locale=${locale}`)
      .then((data: any) => {
        setNews(data.data.posts);
        setTotal(Math.ceil(data.data.total / 6));
      });
  }, [query, locale]);

  return (
    <>
      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
        {news.map((e) => (
          <Post key={e.id} data={e} />
        ))}
      </div>
      <CustomPagination href="/news" totalPages={total} />
    </>
  );
}