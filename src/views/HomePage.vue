<template>
  <HeaderHome />
  <section class="portada-container">
    <div class="portada-main">
      <NewsWithTitle 
        :imageUrl="mainImage" 
        :category="category" 
        :title="headline" 
        :link="'https://example.com'" 
        height="525px"
        fontSize="3rem"
        :id="PortadaId"
      />
    </div>  

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

  <section class="news-grid">
    <NewsWithTitle
      v-for="(news, index) in gridNews"
      :key="index"
      :imageUrl="news.image"
      :category="news.category"
      :title="news.title"
      height="225px"
      fontSize="1.2rem"
      :id="news._id"
    />
  </section>

  <section class="truly-kurious-section">
    <img :src="TrulyKuriousImage" class="truly-kurious-image" alt="Truly Kurious" />
  </section>
  <Footer />
</template>


<script>
import HeaderHome from "@/components/Home/HeaderHome.vue";
import NewsWithTitle from "@/components/Home/NewsWithTitle.vue"; // Importamos el componente
import TrulyImage from "@/assets/publicidad/publicidad_1.jpg";
import Footer from "@/components/Home/footerHome.vue";
import axios from "axios";
import TrulyKuriousImage from "@/assets/truly_kurious.jpg"; 
export default {
  components: { HeaderHome, NewsWithTitle,Footer },
  data() {
    return {
      PortadaId:"",
      mainImage:"",
      category: "",
      headline: "",
      TrulyImage,
      TrulyKuriousImage,
      videoUrl: "https://www.youtube.com/embed/kNt-81PAE94",
      gridNews: [],
    };
  },
  methods:{
    async getPortada(){
      const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`,{
        params:{
          tags: "Portada",
        }
      });

      console.log(response);

      this.PortadaId = response.data[0]._id
      this.mainImage = process.env.VUE_APP_IMAGEROUTE +  response.data[0].image
      this.category = response.data[0].category
      this.headline = response.data[0].title

    },
    async getPortadaBottom(){
      const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`,{
        params:{
          tags: "Portada Bottom",
        }
      });
      this.gridNews = response.data.map(news => ({
        ...news,
        image: `${process.env.VUE_APP_IMAGEROUTE}${news.image}`,
      }));
      console.log(this.gridNews);

    }
  },
  mounted(){
    this.getPortada();
    this.getPortadaBottom();
  }
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

footer {
  margin-top: auto; 
}

.truly-kurious-section {
  max-width: 1200px; /* Coincide con el ancho del grid */
  margin: 20px auto; /* Centra la imagen horizontalmente */
  display: flex;
  justify-content: center;
}

.truly-kurious-image {
  width: 100%; /* Ocupará todo el ancho del contenedor */
  height: auto; /* Mantendrá la proporción de la imagen */
  border-radius: 8px; /* Opcional: bordes redondeados */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Opcional: agrega un poco de sombra */
}

</style>
