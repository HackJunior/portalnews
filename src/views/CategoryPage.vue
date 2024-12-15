<template>
  <HeaderHome />
  <div class="categoria-page">

    <div class="category-header">
      <h1 class="category-title">{{ categoria }}</h1>
      <div class="line"></div>
    </div>

    <!-- Contenedor de noticias -->
    <div class="news-container">
      <!-- Noticias principales -->
      <div class="main-news">
        <div class="news-item" v-for="(news, index) in paginatedNews" :key="index">
          <NewsCard
            :imageUrl="news.image"
            :category="news.category"
            :newsId="news._id"
          />
          <p
            class="news-title"
            @click="goToDetail(news._id)"
          >
            {{ news.title }}
          </p>
        </div>
      </div>

      <!-- Noticias más leídas -->
      <div class="sidebar-news">
        <div class="sticky-container">
          <h2 class="most-read-title">Más Leídas</h2>
          <div class="most-read-line"></div>
          <div
            class="most-read-item"
            v-for="(news, index) in mostReadNews"
            :key="index"
          >
            <div class="most-read-content selectable" @click="goToDetail(news._id)">
              <img :src="news.image" alt="Noticia" class="most-read-image" />
              <p class="most-read-title-text">{{ news.title }}</p>
            </div>
            <div
              class="most-read-divider"
              v-if="index < mostReadNews.length - 1"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">«</button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">»</button>
    </div>

  </div>

  <Footer />
</template>

<script>
import HeaderHome from '@/components/Home/HeaderHome.vue';
import NewsCard from '@/components/NewsCard.vue';
import Footer from "@/components/Home/footerHome.vue";
import axios from "axios";


export default {
  components: {
    HeaderHome,
    NewsCard,
    Footer
  },
  data() {
    return {
      newsList: [],
      mostReadNews: "",
      itemsPerPage: 15,
      currentPage:1,
    };
  },
  computed: {
    categoria() {
      return this.$route.params.categoria || "Sin Categoría";
    },
    totalPages() {
      return Math.ceil(this.newsList.length / this.itemsPerPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.newsList.slice(start, end);
    },
    visiblePages() {
      const total = this.totalPages;
      const maxVisible = 4;
      const current = this.currentPage;

      const startPage = Math.max(current - Math.floor(maxVisible / 2), 1);
      const endPage = Math.min(startPage + maxVisible - 1, total);

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
  },
  methods: {
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    goToDetail(IdNews) {
      const route = `/news/${IdNews}`;
      this.$router.push(route);
    },
    async getNewsCategory(){
      const token = localStorage.getItem('authToken');
      console.log(this.categoria);
      const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`,{
        params:{
          category: this.$route.params.categoria,
        }
      }, 
      {
          headers: {
            Authorization: `Bearer ${token}`
          },
      });
      this.newsList = response.data.map(news => ({
        ...news,
        image: `${process.env.VUE_APP_IMAGEROUTE}${news.image}`,
      }));
      console.log(this.newsList);
    },
    async getMostReadNews(){
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news/top`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
      });
      this.mostReadNews = response.data.map(news => ({
        ...news,
        image: `${process.env.VUE_APP_IMAGEROUTE}${news.image}`,
      }));

      console.log(this.mostReadNews);
    }
  },
  mounted(){
    this.getNewsCategory(),
    this.getMostReadNews()
  },
    watch: {
    '$route.params.categoria': function () {
      this.getNewsCategory();
    }
  }
};
</script>

<style scoped>
.categoria-page {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* Encabezado */
.category-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px; /* Coincide con el ancho máximo del menú */
  margin: 0 auto;
  padding: 0 20px;
}

.category-header .category-title {
  font-size: 2.2rem; /* Tamaño ajustado */
  font-weight: bold;
  text-align: left; /* Asegura alineación a la izquierda */
  margin: 0 0 5px 0; /* Espaciado inferior */
  text-transform: capitalize; /* Capitaliza el texto */
  color: #3daaa0; /* Verde inicial */
}

.category-header .line {
  width: 100%;
  height: 5px;
  background: #3daaa0; /* Color verde */
  margin-bottom: 30px; /* Espaciado adicional con el contenido */
}

/* Contenedor principal */
.news-container {
  display: flex;
  gap: 20px;
  max-width: 1200px; /* Coincide con la línea del título */
  padding: 0 20px; /* Alineación con el título */
  margin: 0 auto;
}

/* Noticias principales */
.main-news {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Diseño flexible */
  gap: 20px;
  flex: 3;
}
.news-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  min-height: 350px; /* Asegura que todas las tarjetas tengan la misma altura */
}

.news-title {
  font-size: 1rem;
  font-weight: bold;
  color: #3daaa0;
  margin-top: 10px;
  text-align: center;
  line-height: 1.4;
  white-space: normal; /* Permite saltos de línea */
  overflow-wrap: break-word; /* Divide palabras largas */
}

.news-title:hover {
  color: #f2665e; /* Rojizo al hacer hover */
}
/* Asegura que las tarjetas tengan altura consistente */
.news-card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-card .news-content {
  flex-grow: 1;
}

.news-card .news-title,
.news-card .news-description {
  min-height: 50px;
}

/* Noticias más leídas */
.sidebar-news {
  flex: 1;
}

.sticky-container {
  position: sticky;
  top: 20px; /* Permite que el contenedor permanezca visible al hacer scroll */
  background: white;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.most-read-title {
  font-size: 1.5rem;
  color: #3daaa0; /* Verde */
  font-weight: bold;
}

.most-read-line {
  width: 100%;
  height: 3px;
  background-color: #3daaa0; /* Línea verde */
  margin: 10px 0;
}

.most-read-item {
  display: flex;
  flex-direction: column; /* Apilamos contenido */
  gap: 5px;
  padding: 10px 0;
}

.most-read-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.most-read-image {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  object-fit: cover;
}

.most-read-title-text {
  font-size: 1rem;
  font-weight: normal;
  color: #002855; /* Azul oscuro */
  flex: 1;
  transition: color 0.3s; /* Efecto suave al cambiar color */
}

.most-read-title-text:hover {
  color: #f2665e; /* Rojizo al hacer hover */
}

.most-read-divider {
  width: 100%;
  height: 1px;
  background-color: #ddd; /* Línea divisoria */
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
}

.pagination button.active {
  background-color: #3daaa0;
  color: white;
  font-weight: bold;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(.active):not(:disabled) {
  background-color: #e0e0e0;
}
/* Estilo base del contenedor */
.selectable {
  cursor: pointer; /* Cambia el cursor a "pointer" para indicar interactividad */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transiciones suaves */
}

/* Efecto de hover */
.selectable:hover {
  transform: scale(1.02); /* Agranda ligeramente el elemento */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Añade una sombra */
}

/* Cambia el color del texto al hacer hover */
.selectable:hover .most-read-title-text {
  color: #f2665e; /* Cambia a un color rojizo */
  text-decoration: underline; /* Añade subrayado */
}

/* Cambia la opacidad de la imagen al hacer hover */
.selectable:hover .most-read-image {
  opacity: 0.9;
  transition: opacity 0.2s ease;
}


footer {
  margin-top: auto; 
} 
</style>
