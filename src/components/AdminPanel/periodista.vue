<template>
  <div class="journalist-list">
    <!-- Botón para crear periodista -->
    <button @click="openCreateModal" class="create-btn">Crear Periodista</button>

    <!-- Modal de creación de periodista -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Crear Periodista</h3>
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" v-model="journalistForm.name" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input type="email" id="email" v-model="journalistForm.email" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="image">Imagen</label>
          <input type="file" id="image" @change="handleImageUpload" class="styled-input" />
        </div>
        <button @click="createJournalist" class="save-btn">Guardar</button>
        <button @click="closeCreateModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>

    <!-- Modal de edición de periodista -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Editar Periodista</h3>
        <div class="form-group">
          <label for="editName">Nombre</label>
          <input type="text" id="editName" v-model="editForm.name" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="editEmail">Correo</label>
          <input type="email" id="editEmail" v-model="editForm.email" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="editImage">Imagen</label>
          <input type="file" id="editImage" @change="handleEditImageUpload" class="styled-input" />
        </div>
        <button @click="saveEdit" class="save-btn">Guardar</button>
        <button @click="closeEditModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>¿Estás seguro de que deseas eliminar este periodista?</h3>
        <button @click="deleteJournalist" class="confirm-btn">Sí</button>
        <button @click="cancelDelete" class="cancel-btn">No</button>
      </div>
    </div>

    <!-- Lista de periodistas en formato de píldoras -->
    <div class="journalist-list-wrapper">
      <div v-for="journalist in journalists" :key="journalist._id" class="journalist-pill">
        <img :src="journalist.image" alt="Imagen del periodista" class="journalist-image" />
        <p class="journalist-info"><strong>Nombre:</strong> {{ journalist.name }}</p>
        <p class="journalist-info"><strong>Correo:</strong> {{ journalist.email }}</p>
        <div class="journalist-actions">
          <button @click="openEditModal(journalist)" class="edit-btn">Editar</button>
          <button @click="confirmDelete(journalist._id)" class="delete-btn">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      journalists: [
      ],
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      deleteId: null,
      journalistForm: {
        name: "",
        email: "",
        image: null
      },
      editForm: {
        _id: "",
        name: "",
        email: "",
        image: null
      }
    };
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true;
      this.resetJournalistForm();
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    async createJournalist() {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('image', this.journalistForm.image);

      const imageResponse = await axios.post(`${process.env.VUE_APP_BACKENDURL}/subirimagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      const imageUrl = imageResponse.data.filename;

      const journalistData = {
        name: this.journalistForm.name,
        email: this.journalistForm.email,
        image: imageUrl
      };

      const response = await axios.post(`${process.env.VUE_APP_BACKENDURL}/reporters`, journalistData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.journalists.push(response.data.journalist);
      this.closeCreateModal();
    },
    handleImageUpload(event) {
      this.journalistForm.image = event.target.files[0];
    },
    openEditModal(journalist) {
      this.editForm = { ...journalist };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async saveEdit() {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('name', this.editForm.name);
      formData.append('email', this.editForm.email);
      if (this.editForm.image instanceof File) {
        formData.append('image', this.editForm.image);

        const imageResponse = await axios.post(`${process.env.VUE_APP_BACKENDURL}/subirimagen`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });

        this.editForm.image = imageResponse.data.filename;
      }

      await axios.put(`${process.env.VUE_APP_BACKENDURL}/reporters/${this.editForm._id}`, this.editForm, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await this.getJournalists();
      this.closeEditModal();
    },
    handleEditImageUpload(event) {
      this.editForm.image = event.target.files[0];
    },
    confirmDelete(id) {
      this.deleteId = id;
      this.showDeleteModal = true;
    },
    async deleteJournalist() {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${process.env.VUE_APP_BACKENDURL}/reporters/${this.deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.journalists = this.journalists.filter(journalist => journalist._id !== this.deleteId);
      this.showDeleteModal = false;
      this.deleteId = null;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteId = null;
    },
    resetJournalistForm() {
      this.journalistForm = {
        name: "",
        email: "",
        image: null
      };
    },
    async getJournalists() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/reporters`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.journalists = response.data;
        this.journalists.forEach(journalist => {
          journalist.image = `${process.env.VUE_APP_IMAGEROUTE}${journalist.image}`;
        });
      } catch (error) {
        console.error("Error al obtener los periodistas:", error.response || error.message);
      }
    }
  },
  mounted() {
    this.getJournalists();
  }
};
</script>

<style scoped>
.journalist-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.create-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 20px;
}

.journalist-list-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.journalist-pill {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.journalist-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.journalist-info {
  margin: 5px 0;
  color: #333;
}

.journalist-actions {
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
