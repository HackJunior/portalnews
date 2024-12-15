
<template>
  <div class="header-space"></div>
  <header class="header-home">
    <div class="header-content">
      <div class="logo">
        <img src="@/assets/logoSTE.png" alt="Logo" @click="goToHome"/>
      </div>
      <div class="social-icons">
        <a href="https://www.instagram.com/sdetoday?igsh=MXd4eWZobzR4OWwyZw%3D%3D" target="_blank" rel="noopener">
          <img src="@/assets/icons/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://x.com/sdetoday" target="_blank" rel="noopener">
          <img src="@/assets/icons/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.youtube.com/@TrulyKurious" target="_blank" rel="noopener">
          <img src="@/assets/icons/youtube.svg" alt="YouTube" />
        </a>
      </div>
    </div>
  </header>
  <div class="red-border"></div>
  <div class="menu-container">
    <div class="menu">
      <ul class="menu-list">
        <li
          v-for="(category, index) in categories"
          :key="index"
          @click="navigateToCategory(category.text)"
        >
          <a href="javascript:void(0)">{{ category.text }}</a>
        </li>
      </ul>
    </div>
    <div class="green-border"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      categories: [
        { text: 'Nacionales' },
        { text: 'Internacionales' },
        { text: 'Política' },
        { text: 'Entretenimiento' },
        { text: 'Deportes' },
        { text: 'Economía' },
        { text: 'Actualidad' },
        { text: 'Viral' },
        { text: 'Local' },
      ],
    };
  },
  methods: {
    navigateToCategory(category) {
      const route = `/${category}`;
      this.$router.push(route);
    },
    goToHome(){
      this.$router.push('/');
    }
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

html,
body {
  width: 100%;
  overflow-x: hidden;
}

.header-space {
  height: 10px;
  background-color: #e0e0e0;
}

.header-home {
  background-color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
}

.logo img {
  height: 70px;
}

.social-icons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.social-icons img {
  width: 25px;
  height: 25px;
  transition: transform 0.3s;
}

.social-icons img:hover {
  transform: scale(1.2);
}

.red-border {
  height: 5px;
  background-color: #f2665e;
}

.menu-container {
  background-color: #3daaa0;
}

.menu {
  padding: 10px 0;
}

.menu-list {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.menu-list li a {
  text-decoration: none;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  padding: 5px 10px;
}

.menu-list li a:hover {
  background-color: white;
  color: #3daaa0;
  border-radius: 5px;
}

.green-border {
  height: 3px;
  background-color: #b2d8d8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 10px;
  }

  .menu-list {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
