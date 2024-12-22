<template>
  <div class="news-with-title" :style="{ height: computedHeight, width: computedWidth }">
    <img :src="imageUrl" alt="Imagen de noticia" class="news-image" @click="onTitleClick(id)"/>
    <div class="title-overlay">
      <span class="news-category" :style="{ fontSize: computedFontSize }" @click="navigateToCategory(category)" >
        {{ category }}
      </span>
      <div class="news-title" :style="{ fontSize: computedFontSize }" @click="onTitleClick(id)">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
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
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      default: "400px",
    },
    width: {
      type: String,
      default: "100%",
    },
    fontSize: {
      type: String,
      default: "1.5rem", // Valor predeterminado para el tamaño de la fuente
    },
    id:{
      type: String,
      required: true,
    }
  },
  computed: {
    computedHeight() {
      return this.isMobile ? '300px' : this.height;
    },
    computedWidth() {
      return this.width;
    },
    computedFontSize() {
      return this.isMobile ? '1.5rem' : this.fontSize;
    },
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  methods: {
    onTitleClick(id) {
      const route = `/news/${id}`;
      this.$router.push(route);
    },
    navigateToCategory(category) {
      const route = `/${category.toLowerCase()}`;
      this.$router.push(route);
    },
  },
  mounted() {
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  }
};
</script>

<style scoped>
.news-with-title {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
  top: 0;
  left: 0;
}

.title-overlay {
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: calc(100% - 30px);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.news-category {
  background: linear-gradient(90deg, #3daaa0, #f2665e); /* Degradado verde y rojo */
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px 20px; /* Espaciado interno */
  border-radius: 30px; /* Bordes redondeados */
  display: inline-block;
  text-align: center;
  white-space: nowrap; /* Evita saltos de línea */
  width: fit-content; /* El badge se ajustará al contenido */
  max-width: none; /* Elimina restricciones de ancho máximo */
}

.news-title {
  font-weight: 900;
  line-height: 1.2;
  cursor: pointer;
  text-align: justify;
  transition: color 0.3s ease;
}

.news-title:hover {
  color: #ffd700;
}
</style>
