export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  header: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const getMovies = async ( {query}: {query: string} ) => {
    try{
        const endpoint =  query ?
        `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :
        `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc` ;
        const response = await fetch(endpoint,{
            method: 'GET', 
            headers: TMDB_CONFIG.header,
        }); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch movies");
    }

}