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
          <input type="text" id="username" v-model="userForm.username" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="userForm.password" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input type="password" id="confirmPassword" v-model="userForm.confirmPassword" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input type="email" id="email" v-model="userForm.email" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="role">Rol</label>
          <select id="role" v-model="userForm.role" class="styled-input">
            <option value="" disabled>Seleccione un rol</option>
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
        <button @click="createUser" class="save-btn">Guardar</button>
        <button @click="closeCreateModal" class="cancel-btn">Cancelar</button>
        <p v-if="passwordError" class="error-message">Las contraseñas no coinciden.</p>
      </div>
    </div>

    <!-- Modal de edición de usuario -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Editar Usuario</h3>
        <div class="form-group">
          <label for="editUsername">Nombre de Usuario</label>
          <input type="text" id="editUsername" v-model="editForm.username" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="editPassword">Contraseña</label>
          <input type="password" id="editPassword" v-model="editForm.password" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="editEmail">Correo</label>
          <input type="email" id="editEmail" v-model="editForm.email" class="styled-input" />
        </div>
        <div class="form-group">
          <label for="editRole">Rol</label>
          <select id="editRole" v-model="editForm.role" class="styled-input">
            <option value="" disabled>Seleccione un rol</option>
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
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
      <div v-for="user in users" :key="user.id" class="user-pill">
        <p class="user-info"><strong>Usuario:</strong> {{ user.username }}</p>
        <p class="user-info"><strong>Rol:</strong> {{ user.role }}</p>
        <p class="user-info"><strong>Correo:</strong> {{ user.email }}</p>
        <div class="user-actions">
          <button @click="openEditModal(user)" class="edit-btn">Editar</button>
          <button @click="confirmDelete(user.id)" class="delete-btn">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, username: "Juan", role: "Desarrollador", email: "juan@example.com" },
        { id: 2, username: "Maria", role: "Admin", email: "maria@example.com" },
        { id: 3, username: "Pedro", role: "Desarrollador", email: "pedro@example.com" },
        { id: 4, username: "Ana", role: "Admin", email: "ana@example.com" },
        { id: 5, username: "Carlos", role: "Desarrollador", email: "carlos@example.com" },
        { id: 6, username: "Lucia", role: "Admin", email: "lucia@example.com" }
      ],
      roles: ["Desarrollador", "Admin"],
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      deleteId: null,
      passwordError: false,
      userForm: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: ""
      },
      editForm: {
        username: "",
        password: "",
        email: "",
        role: ""
      }
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
    createUser() {
      if (this.userForm.password !== this.userForm.confirmPassword) {
        this.passwordError = true;
        return;
      }
      this.passwordError = false;
      const newUser = { ...this.userForm, id: Date.now() };
      this.users.push(newUser);
      this.closeCreateModal();
    },
    openEditModal(user) {
      this.editForm = { ...user };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    saveEdit() {
      const index = this.users.findIndex(user => user.id === this.editForm.id);
      if (index !== -1) {
        this.users.splice(index, 1, { ...this.editForm });
      }
      this.closeEditModal();
    },
    confirmDelete(id) {
      this.deleteId = id;
      this.showDeleteModal = true;
    },
    deleteUser() {
      this.users = this.users.filter(user => user.id !== this.deleteId);
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
        email: "",
        role: ""
      };
    }
  }
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
