<template>
  <nav class="menu-home">
    <ul class="menu-list">
      <li v-for="(category, index) in categories" :key="index">
        <a :href="category.href">{{ category.text }}</a>
      </li>
    </ul>
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
        { text: 'Tecnología', href: '#tecnologia' }
      ]
    };
  }
};
</script>

<style scoped>
.menu-home {
  text-align: center;
  padding: 0;
  margin: 0;
}
.menu-list {
  background-color: #3DAAA0;
  height: 50px;
  list-style: none;
  display: flex;
    align-items: center; /* Centra verticalmente las categorías */
  justify-content: space-between;
  padding: 0 20px; /* Alineación con el borde de la página */
  margin: 0;
}
.menu-list a {
  text-decoration: none;
  color: white;
  font-size: 1.5em; /* Tamaño de letra más grande */
  font-weight: bold;
  padding: 10px 15px;
  transition: background-color 0.3s;
}
.menu-list a:hover {
  background-color: white;
  color: #3DAAA0; /* Color de fondo original */
  border-radius: 5px;
}
.bottom-border {
  height: 5px;
  background-color: #63CCC1;
  margin-bottom: -5px;
}
</style>
