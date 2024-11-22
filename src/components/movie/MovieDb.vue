<template>
  <div>
    <header>
      <form id="form" @submit.prevent="onSearch">
        <input
          type="text"
          placeholder="Search"
          id="search"
          class="search"
          v-model="searchQuery"
        />
      </form>
    </header>


    <main id="main">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <img :src="IMG_URL + movie.poster_path" :alt="movie.title" />
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <span :class="getColor(movie.vote_average)">
            {{ movie.vote_average }}
          </span>
        </div>
        <div class="overview">
          {{ movie.overview }}
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #222;
  color: #fff;
  line-height: 1.6;
}


header {
  padding: 20px;
  text-align: center;
  background-color: #444;
}

.search {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}


#main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}


.movie {
  background: #333;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.movie:hover {
  transform: scale(1.05);
}

.movie img {
  width: 100%;
  height: auto;
  display: block;
}

.movie-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
}

.movie-info h3 {
  margin: 0;
  font-size: 18px;
}

.movie-info span {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}


span.low {
  background-color: #d4e157;
  color: #333;
}

span.medium {
  background-color: #ffa726;
  color: #fff;
}

span.high {
  background-color: #ef5350;
  color: #fff;
}

/* Overview Section */
.overview {
  padding: 15px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ccc;
}

.overview h3 {
  margin-bottom: 10px;
  color: #fff;
}

</style>


<script>
export default {
  data() {
    return {
      API_KEY: "0a6028e91d8c54d9b4052b0931fde2ac",
      BASE_URL: "https://api.themoviedb.org/3",
      API_URL: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0a6028e91d8c54d9b4052b0931fde2ac",
      IMG_URL: "https://image.tmdb.org/t/p/w500",
      movies: [],
      searchQuery: "",
    };
  },
  mounted() {
    this.getMovies(this.API_URL);
  },
  methods: {
    async getMovies(url) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        this.movies = data.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    onSearch() {
      const SEARCH_URL = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${this.searchQuery}`;
      this.getMovies(SEARCH_URL);
    },
    getColor(vote) {
      if (vote >= 8) return "green";
      if (vote >= 5) return "orange";
      return "red";
    },
  },
};
</script>
