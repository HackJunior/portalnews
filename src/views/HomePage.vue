<template>
  <HeaderHome />
  <section class="portada-container">
    <!-- Portada principal -->
    <div class="portada-main">
      <NewsWithTitle 
        :imageUrl="mainImage" 
        :category="category" 
        :title="headline" 
        :link="'https://example.com'" 
        height="525px"
      />
    </div>

    <!-- Publicidad y video -->
    <div class="portada-side">
      <div class="truly-section">
        <img :src="TrulyImage" class="truly-image" alt="Publicidad" />
      </div>
      <div class="video-section">
        <iframe 
          width="100%" 
          height="280" 
          :src="videoUrl" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>

  <!-- Noticias destacadas -->
  <section class="news-grid">
    <NewsWithTitle
      v-for="(news, index) in gridNews"
      :key="index"
      :imageUrl="news.image"
      :category="news.category"
      :title="news.title"
      :link="news.link"
      height="225px"
    />
  </section>
</template>

<script>
import HeaderHome from "@/components/Home/HeaderHome.vue";
import NewsWithTitle from "@/components/Home/NewsWithTitle.vue"; // Importamos el componente
import mainImage from "@/assets/portada.jpg"; 
import TrulyImage from "@/assets/publicidad/publicidad_1.jpg";

export default {
  components: { HeaderHome, NewsWithTitle },
  data() {
    return {
      mainImage,
      category: "Nacional",
      headline: "Esta es la noticia que puede ser un poquito larga y esto",
      TrulyImage,
      videoUrl: "https://www.youtube.com/embed/kNt-81PAE94", // URL del video
      gridNews: [
        { image: mainImage, category: "Internacionales", title: "Noticia 1", link: "https://example.com/1" },
        { image: mainImage, category: "Salud", title: "Noticia 2", link: "https://example.com/2" },
        { image: mainImage, category: "Nacionales", title: "Noticia 3", link: "https://example.com/3" },
        { image: mainImage, category: "Política", title: "Noticia 4", link: "https://example.com/4" },
        { image: mainImage, category: "Deportes", title: "Noticia 5", link: "https://example.com/5" },
        { image: mainImage, category: "Economía", title: "Noticia 6", link: "https://example.com/6" },
      ],
    };
  },
};
</script>

<style scoped>
.portada-container {
  display: flex;
  gap: 20px;
  max-width: 1200px; /* Coincide con CategoryPage */
  margin: 0 auto;
  padding: 20px 0;
}

.portada-main {
  flex: 3; /* Proporción similar a CategoryPage */
}

.portada-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.truly-section,
.video-section {
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.truly-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-section iframe {
  width: 100%;
  height: 200px; /* Más compacto */
  border-radius: 5px;
}

/* Diseño de noticias destacadas */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  grid-template-rows: repeat(2, 225px); /* 2 filas con 225px de altura */
  gap: 20px;
  max-width: 1200px;
  margin: 20px auto;
}
</style>
