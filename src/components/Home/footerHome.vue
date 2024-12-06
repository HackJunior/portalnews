<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Contenedor principal del footer -->
      <div class="footer-columns">
        <!-- Columna 1: Logo y Contacto -->
        <div class="footer-column">
          <img src="@/assets/logoSTE.png" alt="Logo SDE Today" class="footer-logo" />
          <div class="footer-contact">
            <p>Teléfono:</p>
            <ul>
              <li>• 809-304-6235</li>
              <li>• 809-217-1261</li>
            </ul>
            <p>Email:</p>
            <ul>
              <li>• sdetoday@sdetoday.com</li>
              <li>• periodistasuero@gmail.com</li>
            </ul>
          </div>
        </div>

        <!-- Columna 2: Secciones -->
        <div class="footer-column sections-column">
          <p class="footer-title">Secciones</p>
          <div class="section-columns">
            <ul>
              <li v-for="section in sectionsColumn1" :key="section.name">
                <router-link :to="`/${section.route}`" class="footer-link">{{ section.name }}</router-link>
              </li>
            </ul>
            <ul>
              <li v-for="section in sectionsColumn2" :key="section.name">
                <router-link :to="`/${section.route}`" class="footer-link">{{ section.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Columna 3: Sobre Nosotros -->
        <div class="footer-column">
          <p class="footer-title">Sobre Nosotros</p>
          <ul>
            <li>
              <router-link to="/quienes-somos" class="footer-link">Quiénes somos</router-link>
            </li>
            <li>
              <router-link to="/condiciones-de-uso" class="footer-link">Condiciones de uso</router-link>
            </li>
            <li>
              <router-link to="/politica-de-privacidad" class="footer-link">Política de privacidad</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      sectionsColumn1: [
        { name: "Nacionales", route: "nacionales" },
        { name: "Local", route: "local" },
        { name: "Política", route: "politica" },
        { name: "Mundo", route: "mundo" },
        { name: "Opinión", route: "opinion" },
      ],
      sectionsColumn2: [
        { name: "Economía", route: "economia" },
        { name: "Deportes", route: "deportes" },
        { name: "Entretenimiento", route: "entretenimiento" },
        { name: "Tecnología", route: "tecnologia" },
        { name: "Videos", route: "videos" },
      ],
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #f4f4f4; /* Fondo neutro */
  padding: 20px 0;
}

.footer-container {
  max-width: 66%; /* Contenedor centrado a 2/3 de la página */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Justificar contenido */
  gap: 20px;
}

.footer-column {
  flex: 1 1 30%;
  min-width: 200px;
  text-align: justify; /* Justificación de texto */
}

.footer-logo {
  max-width: 300px;
  margin-bottom: 20px;
}

.footer-contact {
  font-size: 18px;
}

.footer-contact ul li:before {
  content: "• ";
  color: #333;
}

.footer-title {
  font-size: 32px;
  font-weight: bold;
  color: #008e7e;
  margin-bottom: 10px;
  text-align: justify; /* Títulos justificados */
}

.section-columns {
  display: flex;
  gap: 10px; /* Reducir espacio entre columnas de secciones */
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 5px;
  font-size: 18px;
}

.footer-column ul li:before {
  content: ""; /* Sin viñetas para columnas distintas al logo */
}

.footer-link {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #f06277;
  text-decoration: none;
}
</style>
    