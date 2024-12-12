<template>
  <HeaderHome />
  <section class="portada-container">
    <div class="portada-main">
      <NewsWithTitle 
        :imageUrl="mainImage" 
        :category="category" 
        :title="headline" 
        :link="'https://example.com'" 
        height="600px"
        fontSize="3rem"
        :id="PortadaId"
      />
    </div>  

    <div class="portada-side">
      <div class="truly-section">
        <img :src="TrulyImage" class="truly-image" alt="Publicidad" />
      </div>
      <div class="video-section">
        <div class="video-carousel">
          <button class="carousel-arrow left" @click="prevVideo">&#8249;</button>
          <video
            ref="currentVideo"
            :src="videos[currentVideo]"
            class="carousel-video"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            @click="openExternalUrl"
            autoplay
            loop
            muted
          ></video>
          <button class="carousel-arrow right" @click="nextVideo">&#8250;</button>
          <button class="mute-button" @click="toggleMute">{{ isMuted ? 'Unmute' : 'Mute' }}</button>
        </div>
      </div>
    </div>
  </section>

  <section class="news-grid">
    <NewsWithTitle
      v-for="(news, index) in gridNews"
      :key="index"
      :imageUrl="news.image"
      :category="news.category"
      :title="news.title"
      height="225px"
      fontSize="1.2rem"
      :id="news._id"
    />
  </section>

  <section class="truly-kurious-section">
    <img :src="TrulyKuriousImage" class="truly-kurious-image" alt="Truly Kurious" />
  </section>
  <CategoryHome
      :message="'Internacionales'"
      :backgroundColor="'green'"
    />
  <CategoryHome
      :message="'Política'"
      :backgroundColor="'white'"
    />
  <CategoryHome
      :message="'Economía'"
      :backgroundColor="'red'"
    />
  <CategoryHome
      :message="'Deportes'"
      :backgroundColor="'white'"
    />
  <CategoryHome
      :message="'Actualidad'"
      :backgroundColor="'green'"
    />
  <CategoryHome
      :message="'Nacionales'"
      :backgroundColor="'white'"
    />
  <CategoryHome
      :message="'Entretenimiento'"
      :backgroundColor="'red'"
    />
  <CategoryHome
      :message="'Viral'"
      :backgroundColor="'white'"
    />
  <CategoryHome
      :message="'Local'"
      :backgroundColor="'green'"
    />
  <Footer />
</template>

<script>
import HeaderHome from "@/components/Home/HeaderHome.vue";
import NewsWithTitle from "@/components/Home/NewsWithTitle.vue";
import TrulyImage from "@/assets/publicidad/publicidad_1.jpg";
import Footer from "@/components/Home/footerHome.vue";
import TrulyKuriousImage from "@/assets/truly_kurious.jpg"; 
import CategoryHome from "@/components/Home/CategoryHome.vue";
import axios from "axios";
export default {
  components: { HeaderHome, NewsWithTitle, Footer, CategoryHome },
  data() {
    return {
      PortadaId: "",
      mainImage: "",
      category: "",
      headline: "",
      TrulyImage,
      TrulyKuriousImage,
      videoUrl: "https://www.youtube.com/embed/kNt-81PAE94",
      gridNews: [],
      videos: [
        require("@/assets/videos/video1.mp4"),
        require("@/assets/videos/video2.mp4"),
        require("@/assets/videos/video3.mp4"),
        require("@/assets/videos/video4.mp4"),
      ],
      currentVideo: 0,
      hovering: false,
      isMuted: true,
    };
  },
  methods: {
    async getPortada() {
      const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`, {
        params: {
          tags: "Portada",
        },
      });

      console.log(response);

      this.PortadaId = response.data[0]._id;
      this.mainImage = process.env.VUE_APP_IMAGEROUTE + response.data[0].image;
      this.category = response.data[0].category;
      this.headline = response.data[0].title;
    },
    async getPortadaBottom() {
      const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`, {
        params: {
          tags: "Portada Bottom",
        },
      });
      this.gridNews = response.data.map((news) => ({
        ...news,
        image: `${process.env.VUE_APP_IMAGEROUTE}${news.image}`,
      }));
      console.log(this.gridNews);
    },
    prevVideo() {
      this.currentVideo =
        (this.currentVideo - 1 + this.videos.length) % this.videos.length;
      this.playCurrentVideo();
    },
    nextVideo() {
      this.currentVideo = (this.currentVideo + 1) % this.videos.length;
      this.playCurrentVideo();
    },
    openExternalUrl() {
      window.open("https://mip.gob.do/", "_blank");
    },
    toggleMute() {
      const videoElement = this.$refs.currentVideo;
      this.isMuted = !this.isMuted;
      videoElement.muted = this.isMuted;
    },
    playCurrentVideo() {
      const videoElement = this.$refs.currentVideo;
      if (videoElement.paused) {
        videoElement.muted = this.isMuted;
        videoElement.play().catch((error) => {
          console.warn("Autoplay prevented:", error);
        });
      }
    },
  },
  mounted() {
    this.getPortada();
    this.getPortadaBottom();
    this.$nextTick(() => {
      const videoElement = this.$refs.currentVideo;
      videoElement.muted = this.isMuted;
      videoElement.play().catch((error) => {
        console.warn("Autoplay prevented on load:", error);
      });
    });
  },
};
</script>

<style scoped>
.portada-container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.portada-main {
  flex: 3;
}

.portada-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.truly-section,
.video-section {
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.truly-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-section iframe {
  width: 100%;
  height: 200px;
  border-radius: 5px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 225px);
  gap: 20px;
  max-width: 1200px;
  margin: 20px auto;
}

footer {
  margin-top: auto;
}

.truly-kurious-section {
  max-width: 1200px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
}

.truly-kurious-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.video-carousel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.carousel-video {
  width: 100%;
  height: 280px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.carousel-video:hover {
  transform: scale(1.1);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}

.carousel-arrow.left {
  left: 10px;
}

.carousel-arrow.right {
  right: 10px;
}

.carousel-arrow:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.mute-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.mute-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
