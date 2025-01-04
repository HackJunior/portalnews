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
        <router-link :to="`/${state.category}`">{{ state.category }}</router-link>
      </span>
      <span class="breadcrumb-separator">→</span>
      <span class="breadcrumb-item active">{{ state.title }}</span>
    </nav>

    <!-- Línea decorativa -->
    <div class="horizontal-line"></div>

    <!-- Contenedor principal -->
    <div class="news-container">
      <!-- Título y contenido principal -->
      <div class="main-news">
        <h1 class="news-title">{{ state.title }}</h1>
        <div class="news-detail-content">
          <div class="info-header">
            <div class="reporter-info" v-if="state.reporter">
              <img :src="state.reporter.image" alt="Reportero" class="reporter-image" />
              <p class="reporter-name">{{ state.reporter.name }}</p>
            </div>
            <p class="news-date">{{ formatDate(state.createdAt) }}</p>
          </div>
          <div class="image-wrapper">
            <img :src="state.imageUrl" alt="Noticia" class="news-image" />
          </div>
          <div class="news-body">
            <p class="content-paragraph">{{ state.content }}</p>
          </div>
        </div>
            <!-- Últimas noticias -->
    <div class="latest-news-container">
      <div class="latest-news" v-for="(news, index) in state.latestNews" :key="index" @click="goToDetail(news.urlIdTitle)">
        <img :src="news.image" alt="Noticia" class="latest-news-image" />
        <p class="latest-news-title">{{ news.title }}</p>
      </div>
    </div>
      </div>

      <!-- Noticias más leídas -->
      <div class="sidebar-news">
        <div class="sticky-container">
          <h2 class="most-read-title">Más Leídas</h2>
          <div class="most-read-line"></div>
          <div
            class="most-read-item selectable"
            v-for="(news, index) in state.mostReadNews"
            :key="index"
            @click="goToDetail(news.urlIdTitle)"
          >
            <div class="most-read-content">
              <img :src="news.image" alt="Noticia" class="most-read-image" />
              <p class="most-read-title-text">{{ news.title }}</p>
            </div>
            <div
              class="most-read-divider"
              v-if="index < state.mostReadNews.length - 1"
            ></div>
          </div>
        </div>
        
      </div>
    </div>


  </div>
  <Footer />
</template>

<script>
import HeaderHome from "@/components/Home/HeaderHome.vue";
import axios from "axios";
import moment from "moment";
import "moment/locale/es"; // Import Spanish locale for moment.js
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import Footer from "@/components/Home/footerHome.vue";

export default {
  components: { HeaderHome, Footer },

  setup() {
    const route = useRoute();

    const state = reactive({
      newsId: "",
      content: "",
      createdAt: "",
      title: "",
      category: "",
      imageUrl: "",
      mostReadNews: [],
      latestNews: [],
      reporter: {},
    });

    const getImageMetadata = async (imageUrl) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height,
            type: `image/${imageUrl.split(".").pop()}`,
          });
        };
        img.src = imageUrl;
      });
    };

    const fetchReporter = async (reporterId) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/reporters/${reporterId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        state.reporter = {
          name: response.data.name,
          image: `${process.env.VUE_APP_IMAGEROUTE}${response.data.image}`,
        };
      } catch (error) {
        console.error("Error fetching reporter:", error);
      }
    };

    const fetchNews = async (newsId) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.VUE_APP_BACKENDURL}/news`,
          { params: { urlIdTitle: newsId } },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        state.title = response.data[0].title;
        state.category = response.data[0].category;
        state.imageUrl = `${process.env.VUE_APP_IMAGEROUTE}${response.data[0].image}`;
        state.createdAt = response.data[0].createdAt;
        state.content = response.data[0].content;
        state.newsId = newsId;

        if (response.data[0].reporter) {
          await fetchReporter(response.data[0].reporter);
        }

        await axios.put(
          `${process.env.VUE_APP_BACKENDURL}/news/${response.data[0]._id}/read`
        );

        const imageMetadata = await getImageMetadata(state.imageUrl);

        // Actualizar las etiquetas meta
        useHead({
          title: state.title,
          meta: [
            { property: "og:image", content: state.imageUrl },
            { property: "og:image:width", content: imageMetadata.width.toString() },
            { property: "og:image:height", content: imageMetadata.height.toString() },
            { property: "og:image:type", content: imageMetadata.type },
            { property: "og:image:secure_url", content: state.imageUrl },
            { property: "og:locale", content: "es_ES" },
            { property: "og:url", content: window.location.href },
            { property: "og:site_name", content: "Sde Today" },
            { property: "og:title", content: state.title },
            { property: "og:description", content: state.title },
          ],
        });
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchMostReadNews = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.VUE_APP_BACKENDURL}/news/top`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        state.mostReadNews = response.data.map((news) => ({
          ...news,
          image: `${process.env.VUE_APP_IMAGEROUTE}${news.image}`,
        }));
      } catch (error) {
        console.error("Error fetching most read news:", error);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news/recent`);
        state.latestNews = response.data.map((news) => ({
          ...news,
          image: `${process.env.VUE_APP_IMAGEROUTE}${news.image}`,
        }));
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    const formatDate = (isoDate) => {
      return moment(isoDate).locale("es").format("MMMM D, YYYY | hh:mm A").toUpperCase();
    };

    const goToDetail = (IdNews) => {
      const route = `/news/${IdNews}`;
      window.location.href = route;
    };

    onMounted(() => {
      state.newsId = route.params.id;
      console.log(state.newsId);
      fetchNews(state.newsId);
      fetchMostReadNews();
      fetchLatestNews();

      const sidebar = document.querySelector(".sidebar-news");
      const latestNewsContainer = document.querySelector(".latest-news-container");
      const horizontalLine = document.querySelector(".horizontal-line");
      const onScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const latestNewsTop = latestNewsContainer.getBoundingClientRect().top + window.pageYOffset - 150;
        const sidebarHeight = sidebar.offsetHeight;
        const maxScroll = latestNewsTop - sidebarHeight - 20; // 20px for margin
        const startScroll = horizontalLine.getBoundingClientRect().bottom + window.pageYOffset;

        if (scrollTop < startScroll) {
          sidebar.style.transform = `translateY(${startScroll - horizontalLine.getBoundingClientRect().bottom}px)`;
        } else if (scrollTop < maxScroll) {
          sidebar.style.transform = `translateY(${scrollTop - horizontalLine.getBoundingClientRect().bottom}px)`;
        } else {
          sidebar.style.transform = `translateY(${maxScroll - horizontalLine.getBoundingClientRect().bottom}px)`;
        }
      };
      window.addEventListener("scroll", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    });

    return {
      state,
      formatDate,
      goToDetail,
    };
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

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reporter-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reporter-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.reporter-name {
  font-size: 1rem;
  font-weight: bold;
  color: #002855;
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
  font-size: 0.9rem;
  color: #666;
  text-align: right;
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
  white-space: normal; /* Allow text to wrap */
  overflow-wrap: break-word; /* Break long words */
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

/* Últimas noticias */
.latest-news-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 40px;
}

.latest-news {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.latest-news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.latest-news-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #002855;
  text-align: justify;
  white-space: normal; /* Allow text to wrap */
  overflow-wrap: break-word; /* Break long words */
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
    position: static;
    margin-top: 20px; /* Add margin to separate from main-news */
    padding: 10px; /* Add padding for mobile view */
    width: 100%;
    max-width: 480px;
  }

  .breadcrumb {
    justify-content: center; /* Center the breadcrumb */
  }

  .latest-news-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .latest-news {
    width: 100%;
    max-width: 480px;
  }
}
</style>
