<template>
  <div class="news-list">
    <!-- Filtros -->
    <div class="filter-section">
      <input
        type="text"
        v-model="filter.title"
        placeholder="Buscar por título"
        class="filter-input"
      />
      <select v-model="filter.category" class="filter-input">
        <option value="">Filtrar por categoría</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <multiselect
        v-model="filter.tags"
        :options="tagsOptions"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Filtrar por tags"
        label="name"
        track-by="name"
        class="filter-multiselect"
      />
    </div>

    <!-- Lista de noticias -->
    <transition-group name="fade" tag="div" class="news-list-wrapper">
      <div
        v-for="news in filteredNews"
        :key="news._id"
        class="news-card"
      >
        <img :src="news.image" alt="Portada" class="news-image" />
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-category">Categoría: {{ news.category }}</p>
          <p class="news-date">Fecha: {{ formatDate(news.createdAt) }}</p>
          <div class="news-tags">
            <span v-for="tag in news.tags" :key="tag" class="tag-pill">{{ tag }}</span>
          </div>
          <div class="news-actions">
            <button @click="openEditModal(news)" class="edit-btn">Editar</button>
            <button @click="confirmDelete(news._id)" class="delete-btn">Eliminar</button>
          </div>
        </div>
      </div>
    </transition-group>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>¿Estás seguro de que deseas eliminar esta noticia?</h3>
        <button @click="deleteNews" class="confirm-btn">Sí</button>
        <button @click="cancelDelete" class="cancel-btn">No</button>
      </div>
    </div>

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Editar Noticia</h3>
        <div class="form-group">
          <label for="editTitle">Título</label>
          <input
            type="text"
            id="editTitle"
            v-model="editForm.title"
            placeholder="Ingrese el título"
            class="styled-input"
          />
        </div>

        <div class="form-group">
          <label for="editCategory">Categoría</label>
          <select id="editCategory" v-model="editForm.category" class="styled-input">
            <option value="" disabled>Seleccione una categoría</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="editTags">Tags</label>
          <multiselect
            v-model="editForm.tags"
            :options="tagsOptions"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Seleccione tags"
            label="name"
            track-by="name"
            class="styled-multiselect"
          />
        </div>

        <div class="form-group">
          <label for="editImage">Imagen</label>
          <input type="file" id="editImage" @change="onEditImageChange" accept="image/*" class="styled-input" />
        </div>

        <button @click="openContentModal" class="edit-content-btn">Editar Contenido</button>

        <button @click="saveEdit" class="save-btn">Guardar</button>
        <button @click="closeEditModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>

    <!-- Modal de edición de contenido -->
    <div v-if="showContentModal" class="modal-overlay">
      <div class="modal-content-large">
        <h3>Editar Contenido</h3>
        <textarea
          v-model="editForm.content"
          rows="20"
          class="styled-textarea"
        ></textarea>
        <button @click="closeContentModal" class="save-btn">Guardar</button>
        <button @click="closeContentModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from "axios";
import moment from 'moment';



export default {
  
  name: "NewsList",
  components: { Multiselect },
  data() {
    const categories = ["Política", "Economía", "Deportes", "Actualidad", "Nacionales", "Internacionales", "Entretenimiento", "Viral", "Local"];
    const tagsOptions = [
      { name: "Portada" },
      { name: "Nacional" },
      { name: "Internacional" },
      { name: "Destacado" },
      { name: "Última Hora" },
      { name: "Opinión" },
      { name: "Exclusivo" }
    ];
    
    return {
      newsData: [],
      filter: {
        title: "",
        category: "",
        tags: []
      },
      showEditModal: false,
      showDeleteModal: false,
      deleteId: null,
      showContentModal: false,
      editForm: {
        title: "",
        category: "",
        tags: [],
        image: null,
        content: ""
      },
      editIndex: null,
      categories,
      tagsOptions
    };
  },
  methods: {
    confirmDelete(id) {
      this.deleteId = id;
      this.showDeleteModal = true;
    },
    async deleteNews() {
      const token = localStorage.getItem('authToken');
      this.newsData = this.newsData.filter(news => news._id !== this.deleteId);
      await axios.delete(`${process.env.VUE_APP_BACKENDURL}/news/${this.deleteId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      this.showDeleteModal = false;
      this.deleteId = null; 
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteId = null; 
    },
    openEditModal(news) {
      this.editForm = { 
        ...news,
        tags: news.tags ? news.tags.map(tag => this.tagsOptions.find(option => option.name === tag) || { name: tag }) : [],
        image: news.image,
        content: news.content
      };
      this.editIndex = this.newsData.findIndex(item => item._id === news._id);
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editForm = { title: "", category: "", tags: [], image: null, content: "" };
      this.editIndex = null;
    },
    onEditImageChange(event) {
      const file = event.target.files[0];
      this.editForm.image = file;
    },
    openContentModal() {
      this.showContentModal = true;
    },
    closeContentModal() {
      this.showContentModal = false;
    },
    async saveEdit() {
      const token = localStorage.getItem('authToken');
      let imageUrl = this.editForm.image;

      if (this.editForm.image && typeof this.editForm.image !== 'string') {
        const formData = new FormData();
        formData.append("image", this.editForm.image);

        try {
          const imageResponse = await axios.post(`${process.env.VUE_APP_BACKENDURL}/subirimagen`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            },
          });
          imageUrl = imageResponse.data.filename;
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          return;
        }
      }

      const updatedNews = {
        ...this.editForm,
        image: imageUrl,
        tags: this.editForm.tags.map(tag => tag.name)
      };

      try {
        await axios.put(`${process.env.VUE_APP_BACKENDURL}/news/${this.editForm._id}`, updatedNews, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.newsData.splice(this.editIndex, 1, updatedNews);
        this.closeEditModal();
      } catch (error) {
        console.error("Error al guardar la noticia:", error);
      }
    },
    async getNews() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/news`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    // Asigna los datos de la respuesta a `newsData`
        this.newsData = response.data;

    this.newsData = response.data.map(news => ({
      ...news,
      image: `${process.env.VUE_APP_IMAGEROUTE}/${news.image}`,
    }));

    // Muestra los datos en consola para depuración
    console.log("Noticias obtenidas:", this.newsData);
      } catch (error) {
      console.error("Error al obtener las noticias:", error.response || error.message);
  }
    },
     formatDate(isoDate) {
      return moment(isoDate).format('MM/DD/YYYY');
    },

  },
  computed: {
    filteredNews() {
      return this.newsData.filter(news => {
        const matchesTitle = news.title.toLowerCase().includes(this.filter.title.toLowerCase());
        const matchesCategory = this.filter.category ? news.category === this.filter.category : true;
        const matchesTags = this.filter.tags.length
          ? this.filter.tags.every(tag => news.tags.includes(tag.name))
          : true;
        return matchesTitle && matchesCategory && matchesTags;
      });
    }
  },
  mounted(){
    this.getNews();
  }
};
</script>

<style scoped>
.news-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
}

.filter-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em;
  width: 200px;
}

.filter-multiselect {
  width: 200px;
}

.news-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
}

.news-card {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  position: relative;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 15px;
}

.news-title {
  font-size: 1.2em;
  margin: 10px 0;
  color: #333;
}

.news-category,
.news-date {
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 10px;
}

.tag-pill {
  background-color: #28a745;
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8em;
}

.news-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.edit-btn {
  background-color: #007bff;
  color: #fff;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
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

.modal-content-large {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  height: 80%;
  text-align: center;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.styled-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.styled-multiselect .multiselect__tags {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.styled-textarea {
  flex-grow: 1;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
  margin-bottom: 10px;
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

.confirm-btn {
  background-color: #28a745;
  color: #fff;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

.edit-content-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin: 5px;
  background-color: #007bff;
  color: #fff;
}

</style>
