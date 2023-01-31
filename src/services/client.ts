import axios from 'axios';

export const ytsClient = axios.create({
  baseURL: 'https://yts.mx/api/v2',
});

export const ytsFetch = async (endpoint: string) => {
  const response = await ytsClient.get(endpoint);
  const { data } = await response.data;
  return data;
};

export const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const tmdbFetch = async (endpoint: string) => {
  const response = await tmdbClient.get(endpoint, {
    headers: {
      Authorization: `bearer ${process.env.TMDB_TOKEN}`,
      Accept: 'application/json',
    },
  });
  const data = await response.data;
  return data;
};
