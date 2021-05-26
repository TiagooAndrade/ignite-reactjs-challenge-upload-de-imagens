/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Card = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type FetchResponse = {
  data: Card[];
  after: string | null;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<FetchResponse> => {
    if (pageParam) {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    }

    const response = await api.get('/api/images');

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.after;
    },
  });

  const formattedData = useMemo(() => {
    return data?.pages
      .map(card => {
        return card.data;
      })
      .flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button mt="40px" type="button" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
