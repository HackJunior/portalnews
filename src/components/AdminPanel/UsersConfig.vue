<template>
  <div class="user-list">
    <!-- Botón para crear usuario -->
    <button @click="openCreateModal" class="create-btn">Crear Usuario</button>

    <!-- Modal de creación de usuario -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Crear Usuario</h3>
        <div class="form-group">
          <label for="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            v-model="userForm.username"
            class="styled-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="userForm.password"
            class="styled-input"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="userForm.confirmPassword"
            class="styled-input"
          />
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input
            type="email"
            id="email"
            v-model="userForm.correo"
            class="styled-input"
          />
        </div>
        <div class="form-group">
          <label for="role">Rol</label>
          <select id="role" v-model="userForm.rol" class="styled-input">
            <option value="" disabled>Seleccione un rol</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>
        <button @click="createUser" class="save-btn">Guardar</button>
        <button @click="closeCreateModal" class="cancel-btn">Cancelar</button>
        <p v-if="passwordError" class="error-message">
          Las contraseñas no coinciden.
        </p>
      </div>
    </div>

    <!-- Modal de edición de usuario -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Editar Usuario</h3>
        <div class="form-group">
          <label for="editUsername">Nombre de Usuario</label>
          <input
            type="text"
            id="editUsername"
            v-model="editForm.username"
            class="styled-input"
          />
        </div>
        <div class="form-group">
          <label for="editPassword">Contraseña</label>
          <input
            type="password"
            id="editPassword"
            v-model="editForm.password"
            class="styled-input"
          />
        </div>
        <div class="form-group">
          <label for="editEmail">Correo</label>
          <input
            type="email"
            id="editEmail"
            v-model="editForm.correo"
            class="styled-input"
          />
        </div>
        <div class="form-group">
          <label for="editRole">Rol</label>
          <select id="editRole" v-model="editForm.rol" class="styled-input">
            <option value="" disabled>Seleccione un rol</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>
        <button @click="saveEdit" class="save-btn">Guardar</button>
        <button @click="closeEditModal" class="cancel-btn">Cancelar</button>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>¿Estás seguro de que deseas eliminar este usuario?</h3>
        <button @click="deleteUser" class="confirm-btn">Sí</button>
        <button @click="cancelDelete" class="cancel-btn">No</button>
      </div>
    </div>

    <!-- Lista de usuarios en formato de píldoras -->
    <div class="user-list-wrapper">
      <div v-for="user in users" :key="user._id" class="user-pill">
        <p class="user-info"><strong>Usuario:</strong> {{ user.username }}</p>
        <p class="user-info"><strong>Rol:</strong> {{ user.rol }}</p>
        <p class="user-info"><strong>Correo:</strong> {{ user.correo }}</p>
        <div class="user-actions">
          <button @click="openEditModal(user)" class="edit-btn">Editar</button>
          <button @click="confirmDelete(user._id)" class="delete-btn">
            Eliminar
          </button>
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
      users: [],
      roles: ["admin", "user", "editor"],
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      deleteId: null,
      passwordError: false,
      userForm: {
        username: "",
        password: "",
        confirmPassword: "",
        correo: "",
        rol: "",
      },
      editForm: {
        username: "",
        password: "",
        correo: "",
        rol: "",
      },
    };
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true;
      this.resetUserForm();
    },
    closeCreateModal() {
      this.showCreateModal = false;
      this.passwordError = false;
    },
    async createUser() {
      const token = localStorage.getItem("authToken");
      if (this.userForm.password !== this.userForm.confirmPassword) {
        this.passwordError = true;
        return;
      }
      this.passwordError = false;
      //const { confirmPassword, ...dataToSend } = this.userForm;
      delete this.userForm.confirmPassword;
      await axios.post(
        `${process.env.VUE_APP_BACKENDURL}/users`,
        this.userForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await this.getUsers();
      this.closeCreateModal();
    },
    openEditModal(user) {
      this.editForm = { ...user };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    async saveEdit() {
      const token = localStorage.getItem("authToken");
      const index = this.users.findIndex(
        (user) => user._id === this.editForm.id
      );

      if (index !== -1) {
        this.users.splice(index, 1, { ...this.editForm });
      }
      await axios.put(
        `${process.env.VUE_APP_BACKENDURL}/users/${this.editForm._id}`,
        this.editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.closeEditModal();
    },
    confirmDelete(id) {
      this.deleteId = id;
      this.showDeleteModal = true;
    },
    async deleteUser() {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `${process.env.VUE_APP_BACKENDURL}/users/${this.deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.users = this.users.filter((user) => user._id !== this.deleteId);
      this.showDeleteModal = false;
      this.deleteId = null;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteId = null;
    },
    resetUserForm() {
      this.userForm = {
        username: "",
        password: "",
        confirmPassword: "",
        correo: "",
        rol: "",
      };
    },
    async getUsers() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.VUE_APP_BACKENDURL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Asigna los datos de la respuesta a `newsData`
        this.users = response.data.users;
        console.log(this.users);
      } catch (error) {
        console.error(
          "Error al obtener las noticias:",
          error.response || error.message
        );
      }
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
.user-list {
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

.user-list-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.user-pill {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-info {
  margin: 5px 0;
  color: #333;
}

.user-actions {
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

.error-message {
  color: red;
  font-size: 0.9em;
}
</style>
