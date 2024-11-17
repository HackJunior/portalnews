<template>
  <div>
    <!-- Carrusel de opciones -->
    <header class="carousel">
      <span
        :class="['carousel-item', currentSection === 'add-news' ? 'active' : '']"
        @click="currentSection = 'add-news'"
      >Agregar Noticias</span>
      <span
        :class="['carousel-item', currentSection === 'view-news' ? 'active' : '']"
        @click="currentSection = 'view-news'"
      >Ver Noticias en Línea</span>
      <span
        :class="['carousel-item', currentSection === 'users-config' ? 'active' : '']"
        @click="currentSection = 'users-config'"
      >Usuarios</span>
      <span
        :class="['carousel-item', currentSection === 'publicidad' ? 'active' : '']"
        @click="currentSection = 'publicidad-encuestas'"
      >Publicidad y Encuesta</span>
    </header>

    <!-- Contenido según la sección seleccionada -->
    <main class="content">
      <AddNews v-if="currentSection === 'add-news'" />
      <ViewNews v-else-if="currentSection === 'view-news'" />
      <UsersConfig v-else-if="currentSection === 'users-config'" />
      <Publicidad_Encuestas v-else-if="currentSection === 'publicidad-encuestas'" />
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import AddNews from "@/components/AdminPanel/AddNews.vue";
import ViewNews from "@/components/AdminPanel/ViewNews.vue";
import UsersConfig from "@/components/AdminPanel/UsersConfig.vue";
import Publicidad_Encuestas from "@/components/AdminPanel/Publicidad_Encuestas.vue";

export default {
  name: "AdminPanel",
  components: {
    AddNews,
    ViewNews,
    UsersConfig,
    Publicidad_Encuestas
  },
  setup() {
    const currentSection = ref("add-news");

    return {
      currentSection,
    };
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  justify-content: center;
  background-color: #f0f4f8;
  padding: 15px 0;
  margin-bottom: 20px; /* Espacio entre carrusel y contenido */
  border-bottom: 2px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.carousel-item {
  margin: 0 20px;
  padding: 10px 20px;
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.carousel-item.active {
  background-color: #007bff;
  color: #fff;
}

.carousel-item:hover {
  background-color: #0056b3;
  color: #fff;
}

.content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
