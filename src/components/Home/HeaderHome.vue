<template>
  <div class="header-space"></div>
  <header class="header-home">
    <div class="logo">
      <img src="@/assets/logoSTE.png" alt="Logo" />
    </div>
    <div class="social-icons">
      <a href="https://www.youtube.com" target="_blank" rel="noopener">
        <img src="@/assets/icons/youtube.svg" alt="YouTube" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener">
        <img src="@/assets/icons/instagram.svg" alt="Instagram" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener">
        <img src="@/assets/icons/twitter.svg" alt="Twitter" />
      </a>
    </div>
  </header>
  <div class="bottom-border"></div>

  <!-- Menú -->
  <nav class="menu-home">
    <button class="menu-toggle" @click="toggleMenu">☰ Categorías</button>
    <div class="menu-background">
      <ul class="menu-list" :class="{ 'menu-collapsed': isMenuCollapsed && isMobile }">
        <li v-for="(category, index) in categories" :key="index">
          <a :href="category.href">{{ category.text }}</a>
        </li>
      </ul>
    </div>
    <div class="bottom-border"></div>
  </nav>
</template>

<script>
export default {
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
        { text: 'Entretenimiento', href: '#deportes' },
        { text: 'Viral', href: '#economia' },
        { text: 'Local', href: '#actualidad' },
      ],
      isMenuCollapsed: false,
      isMobile: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuCollapsed = !this.isMenuCollapsed;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>

<style>
/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  overflow-x: hidden;
}

.header-space {
  height: 60px; /* Espacio del encabezado agrandado */
  background-color: #E0E0E0;
  border-bottom: 2px solid #CCCCCC;
}

.header-home {
  display: flex;
  justify-content: space-between; /* Logo a la izquierda, redes a la derecha */
  align-items: center;
  padding: 0 20px; /* Espaciado interno */
  height: 100px; /* Altura del encabezado */
}

.logo img {
  height: 70px; /* Ajusta el tamaño del logo */
}

.social-icons {
  display: flex;
  gap: 15px; /* Espaciado entre íconos */
}

.social-icons img {
  width: 30px;
  height: 30px;
  transition: transform 0.3s;
}

.social-icons img:hover {
  transform: scale(1.2); /* Efecto hover para agrandar íconos */
}

.bottom-border {
  height: 5px;
  background-color: #F2665E;
}

/* Menú */
.menu-home {
  text-align: center;
}

.menu-background {
  background-color: #3DAAA0; /* Fondo verde del menú */
  width: 100%; /* El fondo ocupa todo el ancho */
}

.menu-list {
  list-style: none;
  display: flex; /* Horizontal */
  align-items: center; /* Centra verticalmente */
  justify-content: space-evenly; /* Distribuye las letras uniformemente */
  width: 66.6%; /* Contenido entre 2/6 y 5/6 */
  margin: 0 auto; /* Centra el contenido horizontalmente */
  height: 70px; /* Altura del menú */
  padding: 0;
}

.menu-list li {
  margin: 0; /* Elimina cualquier espacio entre elementos */
}

.menu-list a {
  text-decoration: none;
  color: white;
  font-size: 1.8em; /* Letras más grandes */
  font-weight: bold;
  transition: background-color 0.3s;
  padding: 5px 10px; /* Espaciado interno */
}

.menu-list a:hover {
  background-color: white;
  color: #3DAAA0;
  border-radius: 5px;
}

/* Botón para menú desplegable */
.menu-toggle {
  display: none;
  background-color: #3DAAA0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-bottom: 2px solid #CCCCCC;
}

.menu-collapsed {
  display: none;
}

/* Menú desplegable en móviles */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .menu-background {
    width: 100%; /* Fondo completo en móviles */
  }

  .menu-list {
    display: block; /* Cambia a lista vertical */
    width: 100%; /* Ancho completo del contenido en móviles */
    padding: 0;
  }

  .menu-list.menu-collapsed {
    display: none;
  }

  .menu-list li {
    padding: 10px 20px;
    border-bottom: 1px solid #CCCCCC;
  }

  .menu-list a {
    font-size: 1.2em; /* Ajuste de tamaño en móviles */
  }
}
</style>
