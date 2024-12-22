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
        <div class="dropdown" v-if="isMobile">
          <button @click="toggleDropdown">{{ selectedCategory }} ▼</button> <!-- Add indicator symbol -->
          <ul v-show="dropdownOpen" class="dropdown-menu">
            <li
              v-for="(category, index) in categories"
              :key="index"
              @click="navigateToCategory(category.text)"
            >
              <a href="javascript:void(0)">{{ category.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="red-border"></div>
  <div class="menu-container" v-if="!isMobile">
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
      isMobile: false,
      dropdownOpen: false,
      selectedCategory: 'Menu' // Change default text to "Menu"
    };
  },
  methods: {
    navigateToCategory(category) {
      const route = `/${category}`;
      this.$router.push(route);
      this.dropdownOpen = false;
      this.selectedCategory = category;
    },
    goToHome(){
      this.$router.push('/');
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }
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

.dropdown {
  position: relative;
  z-index: 1000; /* Ensure dropdown overlays everything */
}

.dropdown button {
  background-color: #3daaa0;
  color: white;
  border: none;
  padding: 10px 20px; /* Make the button larger */
  cursor: pointer;
  font-size: 1.2em; /* Increase font size */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 200px; /* Increase width to accommodate longer text */
  z-index: 1000; /* Ensure dropdown overlays everything */
} 

.dropdown-menu li {
  padding: 15px; /* Make the menu items larger */
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  white-space: nowrap; /* Prevent text from wrapping */
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.social-icons img {
  width: 25px;
  height: 25px;
  transition: transform 0.3s;
  
}

.social-icons img:hover {
  transform: scale(1.2);
}

@media (max-width: 600px) {
  .header-content {
    flex-direction: column;
    align-items: center;
  }

  .social-icons {
    margin-top: 10px;
  }

  .logo img {
    max-width: 400px; /* Ajusta el tamaño del logo para pantallas pequeñas */
  }
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

  .dropdown-menu li {
    padding: 20px; /* Add padding for mobile view */
  }
}
</style>
