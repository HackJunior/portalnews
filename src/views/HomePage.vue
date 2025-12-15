<template>
  <HeaderHome />
  <section class="portada-container">
    <div class="portada-main">
      <NewsWithTitle
        :imageUrl="mainImage"
        :category="category"
        :title="headline"
        :link="'https://example.com'"
        height="560px"
        fontSize="3rem"
        :id="urlIdTitle"
      />
    </div>

    <div class="portada-side">
      <div class="video-section">
        <!-- New video section with controls -->
        <div class="single-video-container">
          <video
            ref="currentVideo"
            src="@/assets/videos/SEGURIDAD_CIUDADANA_1080.mp4"
            class="single-video"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            @click="openExternalUrl"
            autoplay
            loop
            muted
          ></video>
          <button class="mute-button" @click="toggleMute">
            {{ isMuted ? "Unmute" : "Mute" }}
          </button>
        </div>
      </div>
      <div class="video-section">
          <video
            src="@/assets/videos/mspVideo.mp4"
            ref="currentVideo2"
            class="single-video"
            @mouseover="hovering2 = true"
            @mouseleave="hovering2 = false"
            @click="openExternalUrl2"
            autoplay
            loop
            muted
          ></video>
          <button class="mute-button" @click="toggleMute2">
            {{ isMuted ? "Unmute" : "Mute" }}
          </button>
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
      :id="news.urlIdTitle"
    />
  </section>

<section class="truly-kurious-section">
  <a
    href="https://www.youtube.com/watch?v=pnLBxSgw7qo"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img :src="logoMIP" class="truly-kurious-image" alt="Logo MIP" />
  </a>
</section>

  <section class="info-section">
    <InfoDolarCombustible />
  </section>

  <CategoryHome :message="'Internacionales'" :backgroundColor="'green'" />
  <CategoryHome :message="'Política'" :backgroundColor="'white'" />
  <CategoryHome :message="'Economía'" :backgroundColor="'red'" />
  <CategoryHome :message="'Deportes'" :backgroundColor="'white'" />
  ,
  <section class="opinions-section">
    <Opinions />
  </section>
  <CategoryHome :message="'Actualidad'" :backgroundColor="'green'" />
  <CategoryHome :message="'Nacionales'" :backgroundColor="'white'" />
  <CategoryHome :message="'Entretenimiento'" :backgroundColor="'red'" />
  <CategoryHome :message="'Viral'" :backgroundColor="'white'" />
  <CategoryHome :message="'Local'" :backgroundColor="'green'" />

  <Footer />
</template>

<script>
import HeaderHome from "@/components/Home/HeaderHome.vue";
import NewsWithTitle from "@/components/Home/NewsWithTitle.vue";
import TrulyImage from "@/assets/publicidad/publicidad_1.jpg";
import Footer from "@/components/Home/footerHome.vue";
import logoMIP from "@/assets/navidad_infotep.jpeg"; // Import the new image
import CategoryHome from "@/components/Home/CategoryHome.vue";
import InfoDolarCombustible from "@/components/Home/infoDolarCombustible.vue";
import Opinions from "@/components/Home/opinions.vue";
import axios from "axios";

export default {
  components: {
    HeaderHome,
    NewsWithTitle,
    Footer,
    CategoryHome,
    InfoDolarCombustible,
    Opinions,
  },
  data() {
    return {
      PortadaId: "",
      mainImage: "",
      category: "",
      headline: "",
      TrulyImage,
      logoMIP, // Use the new image
      urlIdTitle: "",
      videoUrl: "https://www.youtube.com/embed/kNt-81PAE94",
      gridNews: [],
      videos: [
        require("@/assets/videos/video1.mp4"),
        require("@/assets/videos/video2.mp4"),
        require("@/assets/videos/video3.mp4"),
      ],
      currentVideo: 0,
      hovering: false,
      isMuted: true,
      hovering2: false,
      isMuted2: true
    };
  },
  methods: {
    async getPortada() {
      const response = await axios.get(
        `${process.env.VUE_APP_BACKENDURL}/news`,
        {
          params: {
            tags: "Portada",
          },
        }
      );

      this.PortadaId = response.data[0]._id;
      this.mainImage = process.env.VUE_APP_IMAGEROUTE + response.data[0].image;
      this.category = response.data[0].category;
      this.headline = response.data[0].title;
      this.urlIdTitle = response.data[0].urlIdTitle;
    },
    async getPortadaBottom() {
      const response = await axios.get(
        `${process.env.VUE_APP_BACKENDURL}/news`,
        {
          params: {
            tags: "Portada Bottom",
          },
        }
      );
      this.gridNews = response.data.slice(0, 6).map((news) => ({
        ...news,
        image: `${process.env.VUE_APP_IMAGEROUTE}${news.image}`,
      }));
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
    openExternalUrl2() {
      window.open("https://www.msp.gob.do/web/", "_blank");
    },
    toggleMute() {
      const videoElement = this.$refs.currentVideo;
      this.isMuted = !this.isMuted;
      videoElement.muted = this.isMuted;
    },
    toggleMute2() {
      const videoElement2 = this.$refs.currentVideo2;
      this.isMuted2 = !this.isMuted2;
      videoElement2.muted = this.isMuted;
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

      const videoElement2 = this.$refs.currentVideo2;
      videoElement2.muted = this.isMuted2;
      videoElement2.play().catch((error) => {
        console.warn("Autoplay2 prevented on load:", error);
      });
      
    });
  },
};
</script>

<style scoped>
.portada-container {
  display: flex;
  gap: 20px;
  max-width: 1500px;
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
  width: 480px;
  height: 270px;
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
  grid-template-rows: repeat(2, 1fr); /* Adjust rows to be flexible */
  gap: 20px;
  max-width: 1500px; /* Match the max-width of portada-container */
  margin: 20px auto;
}

.news-grid .news-with-title {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* Maintain 16:9 aspect ratio */
}

.news-grid .news-with-title img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the area */
}

footer {
  margin-top: auto;
}

.truly-kurious-section {
  max-width: 1500px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  background-color: #043b78; /* Updated blue background */
  padding: 20px;
  border-radius: 8px;
}

.truly-kurious-image {
  width: 100%;
  max-width: 1500px;
  height: 230px;
  object-fit: contain;
}

/* New single video styles */
.single-video-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.single-video {
  width: 100%;
  height: 280px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.single-video:hover {
  transform: scale(1.1);
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

.info-section {
  max-width: 1500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.opinions-section {
  max-width: 1500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .portada-container {
    flex-direction: column;
    align-items: center;
  }

  .portada-main,
  .portada-side,
  .truly-section {
    width: 100%;
    max-width: 480px;
    padding: 10px; /* Add padding for mobile view */
  }

  .truly-section,
  .video-section {
    width: 100%; /* Remove fixed width for mobile view */
    height: auto; /* Remove fixed height for mobile view */
  }

  .news-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 10px; /* Add padding for mobile view */
  }

  .truly-kurious-section {
    padding: 10px; /* Add padding for mobile view */
  }
}
</style>
