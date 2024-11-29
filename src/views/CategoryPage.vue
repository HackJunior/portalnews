<template>
  <HeaderHome />
  <div class="categoria-page">
    <!-- Encabezado con línea decorativa -->
    <div class="category-header">
      <h1 class="category-title">{{ categoria }}</h1>
      <div class="line"></div>
    </div>

    <!-- Contenedor de noticias -->
    <div class="news-container">
      <!-- Noticias principales -->
      <div class="main-news">
        <div class="news-item" v-for="(news, index) in paginatedNews" :key="index">
          <NewsCard :imageUrl="portadaImage" :category="news.category" :newsId="news.id"/>
          <p class="news-title" @click="goToDetail(news.id)">{{ news.title }}</p>
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
            <div class="most-read-content">
              <img :src="portadaImage" alt="Noticia" class="most-read-image" />
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
</template>

<script>
import HeaderHome from '@/components/Home/HeaderHome.vue';
import NewsCard from '@/components/NewsCard.vue';
import portadaImage from '@/assets/portada.jpg'; // Importamos la imagen

export default {
  components: {
    HeaderHome,
    NewsCard,
  },
  data() {
    return {
      portadaImage, // Usamos la imagen importada
      newsList: Array.from({ length: 70 }, (_, i) => ({
        id: i + 1,
        category: "Internacionales",
        title:
          i % 3 === 0
            ? `Título breve para la noticia`
            : i % 3 === 1
            ? `Este es un título de longitud regular para ocupar algo más de espacio`
            : `Este es un título largo que permite probar cómo se comportan textos más extensos y que sigan visibles correctamente sin cortar palabras.`,
      })),
      mostReadNews: Array.from({ length: 6 }, (_, i) => ({
        title: `Noticia destacada número ${i + 1} con un título largo para probar alineaciones y espaciado correcto`,
      })),
      currentPage: 1,
      itemsPerPage: 18,
    };
  },
  computed: {
    categoria() {
      // Obtiene la categoría desde los parámetros de la ruta
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
  },
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
  grid-template-columns: repeat(3, 1fr); /* Tres columnas */
  gap: 20px;
  flex: 3;
}

.news-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.news-title {
  font-size: 1.2rem; /* Tamaño más grande */
  font-weight: bold; /* Bold aplicado */
  color: #3daaa0; /* Verde inicial */
  margin-top: 10px;
  text-align: left;
  line-height: 1.5; /* Espaciado entre líneas */
  white-space: normal; /* Permite que el texto salte a la siguiente línea */
  word-wrap: break-word; /* Rompe palabras largas si es necesario */
  transition: color 0.3s, text-decoration 0.3s; /* Efecto suave */
  cursor: pointer; /* Mostrar como clickeable */
}

.news-title:hover {
  color: #f2665e; /* Rojizo al hacer hover */
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
</style>
