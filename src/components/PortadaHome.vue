<template>
  <section class="portada-container">
    <div class="portada-main">
      <img :src="mainImage" alt="Imagen principal" class="main-image" />
      <div class="portada-title">
        <div class="category">{{ category }}</div>
        <div class="headline" @click="openNewTab">{{ headline }}</div>
      </div>
    </div>
    <div class="portada-side">
      <div class="ad-section">
        <img :src="adImage" alt="Publicidad" class="ad-image" />
      </div>
      <div class="video-section">
        <iframe 
          width="100%" 
          height="280" 
          :src="videoUrl" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </section>
</template>

<script>
const apiUrl = "/api"; 

import axios from "axios";
export default {
  
  data() {

    return {
      mainImage: null,
      category: null,
      headline: null,
      adImage: require('@/assets/publicidad.jpg'), 
      videoUrl: "https://www.youtube.com/embed/kNt-81PAE94" // URL de ejemplo para el video
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${apiUrl}/newsTag`, {
        params: { tags: "Portada" }
      });
      console.log(response.data);
      this.mainImage = response.data[0].image;
      this.category = response.data[0].category;
      this.headline = response.data[0].title;
    } catch (error) {
      console.error("Error al cargar las noticias:", error);
    }
  },
  methods: {
    openNewTab() {
      window.open('about:blank', '_blank');
    }
  }
};
</script>

<style scoped>
.portada-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px auto;
  margin-top: 50px;
  max-width: 1500px;
}

.portada-main {
  flex: 3;
  position: relative;
}

.main-image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 5px;
}

.portada-title {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px; /* Asegura que el contenedor no se salga del borde derecho */
  color: white;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6); /* Fondo semitransparente opcional para resaltar el texto */
  max-width: calc(100% - 40px); /* Ajusta el ancho máximo basado en los márgenes */
  text-align: justify;
  word-wrap: break-word; /* Permite que las palabras se ajusten al ancho */
  overflow-wrap: break-word; /* Adicional para asegurar el ajuste */
}


.category {
  background-color: #3DAAA0; /* Color primario */
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 10px; /* Separa la categoría del texto */
  display: inline-block;
}

.headline {
  font-size: 2em;
  font-weight: bold;
  color: white; /* Color blanco por defecto */
  cursor: pointer;
  transition: color 0.3s;
}

.headline:hover {
  color: #FFD700; /* Amarillo al hacer hover */
}

.portada-side {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ad-section, .video-section {
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.ad-image, .video-section iframe {
  width: 100%;
  height: 280px;
  border-radius: 5px;
}
</style>
