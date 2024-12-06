<template>
  <div class="news-card">
    <div class="image-container">
      <img :src="imageUrl" alt="news" @click="goToDetail"/>
    </div>
    <div
      class="category-badge"
      :class="{ hover: isHovering }"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      @click="goToCategory"
    >
      {{ category }}
    </div>
  </div>
</template>

<script>
import portada from "@/assets/portada.jpg";
export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    newsId: {
      type: [String, Number],
      required: true,
    }
  },
  data() {
    return {
      portada,
      isHovering: false, 
    };
  },
  methods: {
    goToCategory() {
      const route = `/${this.category}`;
      this.$router ? this.$router.push(route) : (window.location.href = route);
    },
    goToDetail() {
      const route = `/news/${this.$props.newsId}`;
      this.$router.push(route);
  }
  },
};
</script>


<style scoped>
.news-card {
  position: relative;
  width: 100%;
  height: 200px; /* Fija la altura del contenedor */
  border: 1px solid #ccc;
  overflow: hidden; /* Asegura que no haya desbordamiento */
  border-radius: 8px; /* Bordes redondeados */
  display: flex;
  justify-content: center; /* Centra la imagen horizontalmente */
  align-items: center; /* Centra la imagen verticalmente */
  background-color: #f9f9f9; /* Fondo para manejar imágenes transparentes */
}

.image-container {
  width: 100%;
  height: 100%; /* Ocupa todo el contenedor */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Hace que la imagen llene completamente el contenedor */
  display: block;
}

.category-badge {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: linear-gradient(90deg, #3daaa0, #f2665e); /* Degradado de colores */
  color: #ffffff;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  text-transform: uppercase;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Suavizado del hover */
}

.category-badge.hover {
  transform: scale(1.1); /* Aumenta ligeramente el tamaño */
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* Sombra más pronunciada */
}

.category-badge:active {
  transform: scale(0.95); /* Efecto de clic */
}
</style>