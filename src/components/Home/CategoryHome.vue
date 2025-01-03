<template> 
  <section :class="['category-home-container', backgroundColorClass]">
    <div class="category-header">
      <h2 class="category-title" :class="{ 'text-green': backgroundColor === 'white' }">{{ message }}</h2>
      <a @click="redirectToNews(mainItem.urlIdTitle)" class="see-more-link">
        Ver más <span class="arrow">&#x27A4;</span>
      </a>
    </div>
    <div class="category-news-wrapper">
      <div class="category-news">
        <div class="main-news">
          <img :src="mainItem.image" alt="Noticia principal" class="main-image"  @click="redirectToNews(mainItem.urlIdTitle)"/>
          <div class="main-category">
            <a class="category-link">
              <span class="news-category" :style="{ fontSize: computedFontSize }" @click="navigateToCategory(mainItem.category)">{{ mainItem.category }}</span>
            </a>
          </div>
          <a class="title-link no-underline">
            <div class="main-title" :style="{ color: backgroundColor === 'white' ? '#3DAAA0' : 'white' }" @click="redirectToNews(mainItem.urlIdTitle)">{{ mainItem.title }}</div>
          </a>
        </div>
        <div class="side-news">
          <div v-for="(item, index) in sideItems" :key="index" class="side-item" @click="redirectToNews(item.id)">
            <img :src="item.image" alt="Noticia secundaria"  @click="redirectToNews(item.urlIdTitle)" class="side-image" />
            <div class="side-category">
              <a class="category-link">
                <span class="news-category" :style="{ fontSize: computedFontSize }"  @click="navigateToCategory(item.category)">{{ item.category }}</span>
              </a>
            </div>
            <a  class="title-link no-underline">
              <div class="side-title" :style="{ color: backgroundColor === 'white' ? '#3DAAA0' : 'white' }" @click="redirectToNews(item.urlIdTitle)">{{ item.title }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      mainItem: {
      },
      sideItems: [
      ],
    };
  },
  methods: {
    async getPortada() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`, {
          params: {
            tags: "Importante",
            category: this.message
          },
        });

        if (response.data && response.data.length > 0) {
          this.mainItem = {
            ...response.data[0],
            image: `${process.env.VUE_APP_IMAGEROUTE}${response.data[0].image}`,
          };
          this.sideItems = response.data.slice(1, 5).map(item => ({
            ...item,
            image: `${process.env.VUE_APP_IMAGEROUTE}${item.image}`,
          }));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    redirectToNews(id) {
      this.$router.push(`/news/${id}`);
    },
    navigateToCategory(category) {
      const route = `/${category.toLowerCase()}`;
      this.$router.push(route);
    },
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
      validator(value) {
        return ["red", "green", "white"].includes(value);
      },
    },
  },
  computed: {
    backgroundColorClass() {
      return {
        red: "background-red",
        green: "background-green",
        white: "background-white",
      }[this.backgroundColor];
    },
    computedFontSize() {
      return "1.5rem"; 
    },
  },
  mounted() {
    this.getPortada();
  },
};
</script>

<style scoped>
.category-home-container {
  margin-top: 100px;
  margin-bottom: 100px;
  width: 100%;
  padding: 20px 0;
}

.background-red {
  background-color: #E84A4A; /* Rojo del logo */
}

.background-green {
  background-color: #3DAAA0; /* Verde del logo */
}

.background-white {
  background-color: white;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 5px;
  position: relative;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

.category-header::after {
  content: "";
  display: block;
  height: 5px;
  background: linear-gradient(to right, #ffc107 15%, white 15%);
  width: 100%;
  position: absolute;
  bottom: -2px;
  left: 0;
}

.category-title {
  font-size: 1.8em;
  font-weight: bold;
  cursor: pointer;
}

.text-green {
  color: #3DAAA0; /* Verde del logo */
}

.see-more-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}

.see-more-link .arrow {
  color: #ffc107;
}

.category-news-wrapper {
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

.category-news {
  display: grid;
  grid-template-columns: 3fr 4fr;
  gap: 20px;
}

.main-news {
  position: relative;
}

.main-image {
  width: 100%;
  object-fit: cover; /* Ensure the image covers the area */
  height: 450px;
  border-radius: 5px;
}

.news-category {
  background: linear-gradient(90deg, #3daaa0, #f2665e); /* Degradado verde y rojo */
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px 20px; /* Espaciado interno */
  border-radius: 30px; /* Bordes redondeados */
  display: inline-block;
  text-align: center;
  white-space: nowrap; /* Evita saltos de línea */
  width: fit-content; /* El badge se ajustará al contenido */
  max-width: none; /* Elimina restricciones de ancho máximo */
  position: absolute;
  top: 10px;
  left: 10px;
}

.main-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 5px;
  transition: color 0.3s;
  color: white;
  text-align: justify;
  text-decoration: none; /* Remove blue underline */
  cursor: pointer;
}

.main-title:hover {
  color: #ffc107;
}

.side-news {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.side-item {
  position: relative;
}

.side-image {
  width: 100%;
  height: 250px; /* Fixed height for consistency */
  border-radius: 5px;
  object-fit: cover; /* Ensure the image covers the area */
}

.side-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 5px;
  transition: color 0.3s;
  color: white;
  text-align: justify;
  text-decoration: none; /* Remove blue underline */
}

.side-title:hover {
  color: #ffc107;
}

.category-link {
  text-decoration: none;
}

@media (max-width: 768px) {
  .category-news {
    grid-template-columns: 1fr; /* Change to single column layout */
    gap: 10px;
    padding: 10px; /* Add padding for mobile view */
  }

  .side-news {
    grid-template-columns: 1fr; /* Change to single column layout */
    padding: 10px; /* Add padding for mobile view */
  }

  .main-news {
    padding: 10px; /* Add padding for mobile view */
  }

  .side-item {
    padding: 10px; /* Add padding for mobile view */
  }
}
</style>
