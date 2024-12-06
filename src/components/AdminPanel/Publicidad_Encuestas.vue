<template>
  <div class="info-list">
    <!-- Publicidades
    <div v-for="(ad, index) in advertisements" :key="index" class="info-pill">
      <div class="image-placeholder" v-if="!ad.image">
        <p>Espacio para Imagen</p>
      </div>
      <img v-else :src="ad.image" :alt="ad.title" class="info-image" />
      <h3>{{ ad.title }}</h3>
      <button @click="openEditModal('ad', index)" class="edit-btn">Editar</button>
    </div>

    
    <div class="info-pill video-pill">
      <div class="image-placeholder" v-if="!youtubeVideo.url">
        <p>Espacio para Video</p>
      </div>
      <iframe v-else :src="youtubeEmbedUrl" frameborder="0" allowfullscreen></iframe>
      <h3>{{ youtubeVideo.title }}</h3>
      <button @click="openEditModal('video')" class="edit-btn">Editar</button>
    </div>-->

    <!-- Encuesta -->
    <div class="info-pill survey-pill">
      <h3>{{ survey.title }}</h3>
      <div class="survey-results">
        <p>SI: {{ survey.percentages.yes }}</p>
        <p>NO: {{ survey.percentages.no }}  </p>
      </div>
      <button @click="openEditModal('survey')" class="edit-btn">Editar</button>
    </div>

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Editar {{ editType === 'ad' ? 'Publicidad' : editType === 'video' ? 'Video' : 'Encuesta' }}</h3>
        
        <!-- Modal para Publicidad -->
        <div v-if="editType === 'ad'">
          <input type="file" @change="uploadImage" accept="image/*" />
        </div>

        <!-- Modal para Video de YouTube -->
        <div v-else-if="editType === 'video'">
          <label>URL del Video</label>
          <input type="text" v-model="youtubeVideo.url" placeholder="Ingrese la URL de YouTube" />
        </div>

        <!-- Modal para Encuesta -->
        <div v-else-if="editType === 'survey'">
          <label>Pregunta de la Encuesta</label>
          <input type="text" v-model="survey.title" placeholder="Ingrese la pregunta" />
        </div>

        <button @click="saveChanges" class="save-btn">Guardar</button>
        <button @click="closeEditModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      advertisements: [
        { title: "Publicidad Portada", image: "" },
        { title: "Publicidad Portada Bottom", image: "" },
        { title: "Publicidad 3", image: "" },
        { title: "Publicidad 4", image: "" }
      ],
      youtubeVideo: {
        title: "Video de YouTube",
        url: ""
      },
      survey: {},
      showEditModal: false,
      editType: null,
      editIndex: null
    };
  },
  computed: {
    youtubeEmbedUrl() {
      return this.youtubeVideo.url
        ? `https://www.youtube.com/embed/${this.extractYoutubeId(this.youtubeVideo.url)}`
        : "";
    }
  },
  methods: {
    openEditModal(type, index = null) {
      this.editType = type;
      this.editIndex = index;
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editType = null;
      this.editIndex = null;
    },
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.advertisements[this.editIndex].image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveChanges() {
      if (this.editType === "survey") {
        this.addSurvey({"title":this.survey.title});
      }
      this.closeEditModal();
    },
    extractYoutubeId(url) {
      const regExp = /(?:https?:\/\/)?(?:www\.)?youtube.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&\n?#]+)/;
      const match = url.match(regExp);
      return match && match[1] ? match[1] : null;
    },    
    async getSuvey() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/surveys/active`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    // Asigna los datos de la respuesta a `newsData`
        this.survey = response.data.survey;
        console.log(this.survey);
      } catch (error) {
      console.error("Error al obtener las noticias:", error.response || error.message);
  }
    },
    async addSurvey(surveyData) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${process.env.VUE_APP_BACKENDURL}/surveys`, surveyData,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.survey = response.data.survey;
        console.log(this.survey);
      } catch (error) {
      console.error("Error al obtener las noticias:", error.response || error.message);
      }
    },
    
  },
    mounted(){
    this.getSuvey();
  }
};
</script>

<style scoped>
.info-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.info-pill {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 250px;
  min-height: 200px;
}

.image-placeholder,
iframe {
  width: 100%;
  height: 150px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 5px;
  margin-bottom: 10px;
}

.info-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.survey-results {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  font-size: 1em;
  color: #333;
}

.edit-btn {
  background-color: #007bff;
  color: #fff;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin-top: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.save-btn,
.cancel-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin: 5px;
}

.save-btn {
  background-color: #28a745;
  color: #fff;
}

.cancel-btn {
  background-color: #6c757d;
  color: #fff;
}
</style>
