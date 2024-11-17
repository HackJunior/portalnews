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
        :key="news.id"
        class="news-card"
      >
        <img :src="news.image" alt="Portada" class="news-image" />
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-category">Categoría: {{ news.category }}</p>
          <p class="news-date">Fecha: {{ news.date }}</p>
          <div class="news-tags">
            <span v-for="tag in news.tags" :key="tag" class="tag-pill">{{ tag }}</span>
          </div>
          <div class="news-actions">
            <button @click="openEditModal(news)" class="edit-btn">Editar</button>
            <button @click="confirmDelete(news.id)" class="delete-btn">Eliminar</button>
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

        <button @click="saveEdit" class="save-btn">Guardar</button>
        <button @click="closeEditModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

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
      newsData: Array(20).fill(null).map((_, i) => ({
        id: i + 1,
        title: `Noticia sobre ${categories[i % categories.length]}`,
        category: categories[i % categories.length],
        date: "2024-11-14",
        tags: this.assignTags(i, tagsOptions),
        image: require("@/assets/portada.jpg"),
      })),
      filter: {
        title: "",
        category: "",
        tags: []
      },
      showEditModal: false,
      showDeleteModal: false,
      deleteId: null,
      editForm: {
        title: "",
        category: "",
        tags: [],
      },
      editIndex: null,
      categories,
      tagsOptions
    };
  },
  methods: {
    assignTags(index, tagsOptions) {
      const tagsVariations = [
        [tagsOptions[0].name, tagsOptions[1].name],
        [tagsOptions[1].name, tagsOptions[2].name],
        [tagsOptions[3].name, tagsOptions[4].name],
        [tagsOptions[4].name, tagsOptions[5].name],
        [tagsOptions[5].name, tagsOptions[6].name],
        [tagsOptions[6].name, tagsOptions[0].name],
      ];
      return tagsVariations[index % tagsVariations.length];
    },
    confirmDelete(id) {
      this.deleteId = id;
      this.showDeleteModal = true;
    },
    deleteNews() {
      this.newsData = this.newsData.filter(news => news.id !== this.deleteId);
      this.showDeleteModal = false;
      this.deleteId = null; // Limpiamos el ID de eliminación
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteId = null; // Cancelamos la eliminación
    },
    openEditModal(news) {
      this.editForm = { ...news, tags: [] };
      this.editIndex = this.newsData.findIndex(item => item.id === news.id);
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editForm = { title: "", category: "", tags: [] };
    },
    saveEdit() {
      if (this.editIndex !== null) {
        this.newsData.splice(this.editIndex, 1, { ...this.editForm });
      }
      this.closeEditModal();
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

</style>
