<template>
  <section class="portada-bottom-container">
    <div class="portada-item" v-for="(item, index) in items" :key="index">
      <div class="image-container">
        <img :src="item.image" alt="Imagen de la noticia" class="item-image" />
      </div>
      <div class="item-overlay">
        <a href="about:blank" class="category-link">
          <div class="category">{{ item.category }}</div>
        </a>
        <a href="about:blank" class="title-link">
          <div class="title">{{ item.title }}</div>
        </a>
      </div>
    </div>
    <!-- Imagen de Truly Kurious ajustada para ocupar el ancho completo -->
    <div class="full-width-container">
      <img src="@/assets/truly_kurious.jpg" alt="Truly Kurious" class="truly-kurious-image" />
    </div>
  </section>
</template>

<script>
import axios from "axios";
const apiUrl = "/api";
export default {
  data() {
    return {
      items: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${apiUrl}/newsTag`, {
        params: { tags: "Portada Bottom" }
      });
      console.log('bottom', response.data);
      this.items = response.data.slice(-6);
    } catch (error) {
      console.error("Error al cargar las noticias:", error);
    }
  },
};
</script>

<style scoped>
.portada-bottom-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

.portada-item {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 350px; /* Ajusta la altura según tus necesidades */
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.category {
  background-color: #3DAAA0; /* Color primario */
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 1.1em; /* Tamaño de letra aumentado */
  font-weight: bold;
  margin-bottom: 5px;
  display: inline-block;
  color: white; /* Color blanco por defecto */
  transition: color 0.3s, background-color 0.3s;
}

.category-link:hover .category {
  background-color: yellow; /* Cambia el fondo a amarillo al hover */
  color: black; /* Cambia el texto a negro al hover */
}

.title {
  font-size: 1.5em; /* Tamaño de letra aumentado */
  font-weight: bold;
  text-align: justify;
  color: white; /* Color blanco */
  transition: color 0.3s;
}

.title-link:hover .title {
  color: yellow; /* Cambia a amarillo al hover */
}

.category-link, .title-link {
  text-decoration: none;
}

.full-width-container {
  grid-column: span 3;
  width: 100%; /* Ocupa el ancho completo del contenedor */
  text-align: center;
  margin-top: 20px;
}

.truly-kurious-image {
  max-width: 100%; /* Extiende la imagen al ancho completo del contenedor */
  min-height: 100px;
  height: auto;
}
</style>
