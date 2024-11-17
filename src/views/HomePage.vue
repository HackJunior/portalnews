<template>
  <HeaderHome/>
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
import HeaderHome from '@/components/Home/HeaderHome.vue';
export default {
  components:{HeaderHome},
  data() {
    return {
      categories: [ 
        { text: 'Nacionales', href: '#nacionales' },
        { text: 'Internacionales', href: '#internacionales' },
        { text: 'Política', href: '#politica' },
        { text: 'Entretenimiento', href: '#entretenimiento' },
        { text: 'Deportes', href: '#deportes' },
        { text: 'Economía', href: '#economia' },
        { text: 'Actualidad', href: '#actualidad' },
        { text: 'Tecnología', href: '#tecnologia' }
      ],
      mainImage: require('@/assets/portada.jpg'),
      category: "Nacional",
      headline: "Esta es la noticia que puede ser un poquito larga",
      adImage: require('@/assets/publicidad.jpg'), 
      videoUrl: "https://www.youtube.com/embed/kNt-81PAE94" // URL de ejemplo para el video
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilos globales */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden; /* Evita scroll horizontal */
}

/* Estilos específicos del componente */
.header-space {
  height: 50px;
  background-color: #E0E0E0;
  border-bottom: 2px solid #CCCCCC;
  width: 100%; /* Asegura que ocupe el ancho completo */
}

.header-home {
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra verticalmente */
  width: 100%; /* Asegura ancho completo */
}

.bottom-border {
  width: 100%; /* Asegura que ocupe el ancho completo */
  height: 5px;
  background-color: #F2665E;
}

.logo img {
  height: 50px;
}

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
