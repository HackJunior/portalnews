<template>
  <div class="opinions-container">
    <div class="opinions-header">
      <h2 class="opinions-title">Opiniones</h2>
    </div>
    <div class="opinions-gallery">
      <button @click="prevOpinion" class="nav-button">‹</button>
      <transition-group name="slide-fade" tag="div" class="opinions-wrapper">
        <div
          class="opinion"
          v-for="(opinion, index) in visibleOpinions"
          :key="index"
          @click="onTitleClick(opinion.urlIdTitle)"
        >
          <img
            :src="opinion.imagePerfil"
            alt="Person's photo"
            class="photo-circle"
          />
          <p class="opinion-text">
            {{ opinion.title }}
          </p>
        </div>
      </transition-group>
      <button @click="nextOpinion" class="nav-button">›</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      opinions: [

      ],
      currentIndex: 0,
      visibleCount: 4,
    };
  },
  computed: {
    visibleOpinions() {
      return this.opinions.slice(
        this.currentIndex,
        this.currentIndex + this.visibleCount
      );
    },
  },
  methods: {
    async fetchOpinions() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKENDURL}/news`,
          {
            params: {
              category: "Opinión",
            },
          }
        );
        this.opinions = response.data.map((item) => ({
          imagePerfil: `${process.env.VUE_APP_IMAGEROUTE}${item.imagePerfil}`,
          title: item.title,
          urlIdTitle: item.urlIdTitle,
        }));
      } catch (error) {
        console.error("Error fetching opinions:", error);
      }
    },
    prevOpinion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextOpinion() {
      if (this.currentIndex < this.opinions.length - this.visibleCount) {
        this.currentIndex++;
      }
    },
    onTitleClick(id) {
      const route = `/news/${id}`;
      this.$router.push(route);
    },
  },
  mounted() {
    this.fetchOpinions();
  },
};
</script>

<style scoped>
.opinions-container {
  max-width: 1500px;
  margin: 20px auto;
  padding: 20px 0;
}

.opinions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 5px;
  position: relative;
}

.opinions-header::after {
  content: "";
  display: block;
  height: 5px;
  background: linear-gradient(to right, #ffc107 15%, white 15%);
  width: 100%;
  position: absolute;
  bottom: -2px;
  left: 0;
}

.opinions-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #3daaa0; /* Verde del logo */
}

.opinions-gallery {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px; /* Add space between header and gallery */
  padding-bottom: 20px; /* Add padding at the bottom */
}

.opinions-wrapper {
  display: flex;
  align-items: center;
}

.nav-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background-color: #3daaa0; /* Verde del logo */
  color: white;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #e84a4a; /* Rojo del logo */
}

.opinion {
  text-align: center;
  margin: 0 20px; /* Add space between opinions */
  cursor: pointer; /* Add this line to change cursor */
}

.photo-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px; /* Add space between images and text */
}

.opinion-text {
  margin-top: 10px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
