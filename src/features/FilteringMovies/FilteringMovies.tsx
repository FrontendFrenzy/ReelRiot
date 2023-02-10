/* eslint-disable no-console */
import { getHotkeyHandler } from '@mantine/hooks';
import { Box, Button, Select, SimpleGrid, TextInput } from '@mantine/core';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Container } from '@/components/ui';
import { ACTIONS, useMovieStore } from '@/context/store';
import { IFilterOption, IFilters } from '@/types/Movie.types';
import { options } from './FilteringMovies.mock';
import { useStyles } from './FilteringMovies.styled';

type FilteringMoviesProps = {
  pageNumber: number;
  isLoading: boolean;
  setPageNumber: Dispatch<SetStateAction<number>>;
};

const FilteringMovies: React.FC<FilteringMoviesProps> = ({
  pageNumber,
  setPageNumber,
  isLoading,
}) => {
  const { classes } = useStyles();
  const { dispatch } = useMovieStore();
  const [query, setQuery] = useState('');
  const [state, setState] = useState<IFilters>({
    quality: 'all',
    genre: 'all',
    rating: '0',
    orderBy: 'date_added',
  });

  const dispatchSearchQuery = () =>
    dispatch({
      type: ACTIONS.query,
      payload: {
        ...state,
        query,
        pageNumber,
      },
    });

  const onMovieFilter = async () => {
    dispatchSearchQuery();
    setPageNumber(1);
  };

  useEffect(() => {
    dispatchSearchQuery();
  }, [pageNumber, state]);

  const onFilterChange = (filteredValue: string | null, key: string) => {
    if (filteredValue !== null) {
      setState((prevState) => ({
        ...prevState,
        [key]: filteredValue,
      }));
    }
  };

  return (
    <Box
      sx={(theme) => ({ background: theme.colors.dark[8], paddingBottom: '35px !important' })}
      py="xl"
    >
      <Container size="sm">
        <TextInput
          classNames={{ label: classes.label, rightSection: classes.rightSection }}
          label="Search Term:"
          size="md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          radius="md"
          autoComplete="off"
          onKeyDown={getHotkeyHandler([['Enter', onMovieFilter]])}
          rightSection={
            <Button
              size="sm"
              uppercase
              compact
              onClick={onMovieFilter}
              loading={isLoading}
              sx={(theme) => ({ fontFamily: theme.headings.fontFamily })}
              loaderPosition="center"
            >
              Search
            </Button>
          }
        />

        <SimpleGrid
          cols={4}
          spacing="sm"
          mt="xs"
          breakpoints={[
            { maxWidth: 980, cols: 4, spacing: 'md' },
            { maxWidth: 768, cols: 3, spacing: 'sm' },
            { maxWidth: 600, cols: 2, spacing: 'xs' },
          ]}
        >
          {options.map(({ id, label, filter, value }: IFilterOption) => (
            <Select
              key={id}
              label={label}
              classNames={{ label: classes.label }}
              styles={{
                label: {
                  fontSize: '14px !important',
                },
              }}
              size="xs"
              value={state[value as keyof IFilters]}
              onChange={(e) => onFilterChange(e, value)}
              data={filter}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
export default FilteringMovies;
