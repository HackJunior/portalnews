<template>
  <HeaderHome />
  <div class="categoria-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <span class="breadcrumb-item">
        <router-link to="/"><i class="fas fa-home"></i> Inicio</router-link>
      </span>
      <span class="breadcrumb-separator">→</span>
      <span class="breadcrumb-item">
        <router-link :to="`/${category}`">{{ category }}</router-link>
      </span>
      <span class="breadcrumb-separator">→</span>
      <span class="breadcrumb-item active">{{ title }}</span>
    </nav>

    <!-- Línea decorativa -->
    <div class="horizontal-line"></div>

    <!-- Contenedor principal -->
    <div class="news-container">
      <!-- Título y contenido principal -->
      <div class="main-news">
        <h1 class="news-title">{{ title }}</h1>
        <div class="news-detail-content">
          <div class="image-wrapper">
            <img :src="imageUrl" alt="Noticia" class="news-image" />
            <p class="news-date">{{ formatDate(createdAt) }}</p>
          </div>
          <div class="news-body">
            <p class="content-paragraph">{{ content }}</p>
          </div>
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
  </div>
</template>

<script>
import HeaderHome from "@/components/Home/HeaderHome.vue";
import axios from "axios";
import moment from "moment";
import { useHead } from '@vueuse/head';


export default {
  components: { HeaderHome },
  
  data() {
    return {
      newsId: "",
      content: "",
      createdAt: null,
      title: "",
      category: "",
      imageUrl: "",
      mostReadNews: [],
    };
  },
  methods:{
    async getNew(Newsid){
      
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`, {params:{id: Newsid}}, {
          headers: {
            Authorization: `Bearer ${token}`
          },
      });
      this.title = response.data.title;
      this.category = response.data.category;
      this.imageUrl = process.env.VUE_APP_IMAGEROUTE + response.data.image;
      console.log(this.imageUrl);
      this.createdAt = response.data.createdAt;
      this.content= response.data.content;
      this.newsId = Newsid;
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
    },
    formatDate(isoDate) {
      return moment(isoDate).format('MM/DD/YYYY');
    }

  },
  mounted() {
    this.newsId = this.$route.params.id;  
    this.getMostReadNews();
    this.getNew(this.newsId);
  },
  setup() {
    useHead({
      title: this.title,
      meta: [
        { property: 'og:title', content: this.title },
        {property: 'og:description', content: this.content.substring(0, 150) },
        { property: 'og:image', content: this.imageUrl },
      ],
    });
  },
};
</script>

<style scoped>
.categoria-page {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 1.2rem; /* Más grande */
  color: #002855;
  margin-bottom: 20px;
  font-weight: bold; /* Negrita */
}

.breadcrumb-item {
  margin-right: 5px;
}

.breadcrumb-item.active {
  font-weight: bold;
  color: #3daaa0; /* Color destacado */
}

.breadcrumb-separator {
  margin: 0 5px;
}

/* Línea horizontal decorativa */
.horizontal-line {
  width: 100%;
  height: 5px; /* Más gruesa */
  background: linear-gradient(90deg, #002855, #3daaa0); /* Degradado moderno */
  margin: 15px 0;
  border-radius: 2px;
}

/* Contenedor principal */
.news-container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}

/* Título principal */
.news-title {
  font-size: 2.4rem; /* Tamaño ajustado */
  font-weight: 900; /* Más gruesas */
  margin-bottom: 20px;
  color: #002855;
  text-align: justify; /* Título justificado */
  line-height: 1.2;
  max-width: 100%; /* Ajusta el ancho máximo */
  word-spacing: 0.1em; /* Reduce el espacio entre palabras */
  hyphens: auto; /* Permite dividir palabras para evitar espacios grandes */
}

/* Detalle de la noticia */
.main-news {
  flex: 3;
}

.news-detail-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-wrapper {
  position: relative;
}

.news-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  object-fit: cover;
}

.news-date {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7); /* Fondo semitransparente */
  color: #fff;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 5px;
}

/* Contenido del cuerpo */
.news-body {
  font-size: 20px; /* Tamaño ajustado */
  line-height: 1.8; /* Espaciado cómodo */
  text-align: justify;
}

.content-paragraph {
 white-space: pre-line;
}

.content-paragraph::first-letter {
  font-size: 4rem; /* Letra capital grande */
  font-weight: bold;
  float: left;
  margin-right: 10px;
  line-height: 1;
  color: #3daaa0; /* Color destacado */
}

/* Noticias más leídas */
.sidebar-news {
  flex: 1;
}

.sticky-container {
  position: sticky;
  top: 20px;
  background: white;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.most-read-title {
  font-size: 1.5rem;
  color: #3daaa0;
  font-weight: bold;
}

.most-read-line {
  width: 100%;
  height: 3px;
  background-color: #3daaa0;
  margin: 10px 0;
}

.most-read-item {
  display: flex;
  flex-direction: column;
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
  color: #002855;
  flex: 1;
  transition: color 0.3s;
}

.most-read-title-text:hover {
  color: #f2665e;
}

.most-read-divider {
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .news-container {
    flex-direction: column;
    align-items: center;
    padding: 10px; /* Add padding for mobile view */
  }

  .main-news {
    width: 100%;
    max-width: 480px;
    padding: 10px; /* Add padding for mobile view */
  }

  .news-title {
    text-align: center; /* Center the title */
  }

  .news-detail-content {
    align-items: center; /* Center the content */
  }

  .image-wrapper {
    width: 100%;
    max-width: 480px;
    display: flex;
    justify-content: center;
  }

  .news-image {
    width: 100%;
    height: 100%;
    max-width: 480px;
    max-height: 480px;
    object-fit: cover; /* Ensure the image is square */
  }

  .news-date {
    top: 10px;
    right: 10px;
  }

  .news-body {  
    text-align: justify; /* Justify the body content */
    padding: 20px; /* Add padding to the news body */
  }

  .sidebar-news {
    margin-top: 20px; /* Add margin to separate from main-news */
    padding: 10px; /* Add padding for mobile view */
    width: 100%;
    max-width: 480px;
  }

  .breadcrumb {
    justify-content: center; /* Center the breadcrumb */
  }
}
</style>
