<template>
  <div class="news-with-title" :style="{ height: computedHeight, width: computedWidth }">
    <img :src="imageUrl" alt="Imagen de noticia" class="news-image" />
    <div class="title-overlay">
      <span class="news-category">
        {{ category }}
      </span>
      <div class="news-title" @click="onTitleClick">{{ title }}</div>
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
      required: false, // Opcional para manejar el clic en el título
    },
    height: {
      type: String,
      default: "400px", // Altura predeterminada
    },
    width: {
      type: String,
      default: "100%", // Ancho predeterminado
    },
  },
  data() {
    return {
      isHovering: false,
    };
  },
  computed: {
    computedHeight() {
      return this.height;
    },
    computedWidth() {
      return this.width;
    },
  },
  methods: {
    onTitleClick() {
      if (this.link) {
        window.open(this.link, "_blank");
      }
    },
  },
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
  object-fit: cover;
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
  font-size: 1.5rem; /* Tamaño más grande */
  font-weight: bold;
  padding: 10px 20px; /* Más espaciado interno */
  border-radius: 30px; /* Bordes redondeados más pronunciados */
  display: inline-block;
  white-space: nowrap;
  text-align: center;
  position: relative;
  width: 150px;
}

.news-title {
  font-size: 2.8rem; /* Título más grande */
  font-weight: 900; /* Mucho más grueso */
  line-height: 1.2;
  cursor: pointer;
  text-align: justify; /* Justificación del texto */
  transition: color 0.3s ease;
}

.news-title:hover {
  color: #ffd700; /* Amarillo al hacer hover */
}
</style>
