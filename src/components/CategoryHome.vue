<template>
  <section class="category-home-container">
    <div class="category-header">
      <h2 class="category-title">Deportes</h2>
      <a href="about:blank" class="see-more-link">
        Ver más <span class="arrow">&#x27A4;</span>
      </a>
    </div>
    <div class="category-news-wrapper">
      <div class="category-news">
        <div class="main-news">
          <div class="main-category">
            <a href="about:blank" class="category-link">
              <div class="category-label">{{ mainItem.category }}</div>
            </a>
          </div>
          <img :src="mainItem.image" alt="Noticia principal" class="main-image" />
          <a href="about:blank" class="title-link">
            <div class="main-title">{{ mainItem.title }}</div>
          </a>
        </div>
        <div class="side-news">
          <div v-for="(item, index) in sideItems" :key="index" class="side-item">
            <div class="side-category">
              <a href="about:blank" class="category-link">
                <div class="category-label">{{ item.category }}</div>
              </a>
            </div>
            <img :src="item.image" alt="Noticia secundaria" class="side-image" />
            <a href="about:blank" class="title-link">
              <div class="side-title">{{ item.title }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
const apiUrl = "/api";
export default {
  data() {
    return {
      mainItem: null,
      sideItems: [],
    };
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    
    try {
      const response = await axios.get(`${apiUrl}/news`, {
        params: { category:  this.message}
      });
      console.log('Home',response.data);

      const [mainItem, ...sideItems] = response.data;
      this.mainItem = mainItem;
      this.sideItems = sideItems.slice(-4);
    } catch (error) {
      console.error("Error al cargar las noticias:", error);
    }
  },
};
</script>

<style scoped>
.category-home-container {
  margin-top: 100px;
  margin-bottom: 100px;
  width: 100%; 
  background-color: #3DAAA0; 
  padding: 20px 0;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 5px solid white;
  padding-bottom: 5px;
  position: relative;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

.category-title {
  color: white; /* Ajuste de color a blanco */
  font-size: 1.8em;
  font-weight: bold;
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
  height: auto;
  border-radius: 5px;
}

.main-category .category-label {
  background-color: #3DAAA0;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 0.9em;
  font-weight: bold;
  display: inline-block;
  color: white;
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
  text-decoration: none; /* Remueve la línea debajo */
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

.side-category .category-label {
  background-color: #3DAAA0;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 0.8em;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
}

.side-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.side-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 5px;
  transition: color 0.3s;
  color: white;
  text-align: justify;
  text-decoration: none; 
}

.side-title:hover {
  color: #ffc107;
}

.category-link {
  text-decoration: none;
}

.category-header::after {
  content: '';
  display: block;
  height: 5px;
  background: linear-gradient(to right, #ffc107 15%, white 15%);
  width: 100%;
  position: absolute;
  bottom: -2px;
  left: 0;
}
</style>
