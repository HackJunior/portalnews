<template>
  <section class="portada-bottom-container">
    <div class="portada-item" v-for="(item, index) in items" :key="index">
      <img :src="item.image" alt="Imagen de la noticia" class="item-image" />
      <div class="item-overlay">
        <a href="about:blank" class="category-link">
          <div class="category">{{ item.category }}</div>
        </a>
        <a href="about:blank" class="title-link">
          <div class="title">{{ item.title }}</div>
        </a>
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
      items: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${apiUrl}/newsTag`, {
        params: { tags: "Portada Bottom" }
      });
      this.item = response.data;

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

.item-image {
  width: 100%;
  height: auto;
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
  font-size: 0.9em;
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
  font-size: 1.2em;
  font-weight: bold;
  text-align: justify;
  color: white; /* Color blanco */
  transition: color 0.3s;
}

.title-link:hover .title {
  color: yellow; /* Cambia a amarillo al hover */
}

.category-link {
  text-decoration: none;
}

.title-link {
  text-decoration: none;
}
</style>
    