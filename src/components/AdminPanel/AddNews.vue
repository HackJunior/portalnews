<template>
  <div class="admin-panel">
    <h2>Agregar Noticias</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group" :class="{ 'error': errors.title }">
        <label for="title">Título</label>
        <input
          type="text"
          id="title"
          v-model="newsForm.title"
          placeholder="Ingrese el título"
          class="centered-input"
        />
        <span v-if="errors.title" class="error-message">Este campo es obligatorio</span>
      </div>

      <div class="form-group" :class="{ 'error': errors.category }">
        <label for="category">Categoría</label>
        <select id="category" v-model="newsForm.category" class="centered-input">
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <span v-if="errors.category" class="error-message">Este campo es obligatorio</span>
      </div>

      <div v-if="newsForm.category === 'Opinión'" class="form-group" :class="{ 'error': errors.imagePerfil }">
        <label for="imagePerfil">Imagen de Perfil</label>
        <input type="file" id="imagePerfil" @change="onProfileImageChange" accept="image/*" class="centered-input" />
        <span v-if="errors.imagePerfil" class="error-message">Este campo es obligatorio</span>
      </div>

      <div class="form-group" :class="{ 'error': errors.reporter }">
        <label for="reporter">Periodista</label>
        <select id="reporter" v-model="newsForm.reporterId" class="centered-input">
          <option value="" disabled>Seleccione un periodista</option>
          <option v-for="reporter in reporters" :key="reporter._id" :value="reporter._id">
            {{ reporter.name }}
          </option>
        </select>
        <span v-if="errors.reporter" class="error-message">Este campo es obligatorio</span>
      </div>

      <div class="form-group" :class="{ 'error': errors.tags }">
        <label for="tags">Tags</label>
        <multiselect
          v-model="newsForm.tags"
          :options="tagsOptions"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Seleccione tags"
          label="name"
          track-by="name"
          @input="clearMessage"
          class="centered-input"
        />
        <span v-if="errors.tags" class="error-message">Este campo es obligatorio</span>
      </div>

      <div class="form-group" :class="{ 'error': errors.image }">
        <label for="image">Imagen</label>
        <input type="file" id="image" @change="onFileChange" accept="image/*" class="centered-input" />
        <span v-if="errors.image" class="error-message">Este campo es obligatorio</span>
      </div>

      <div class="form-group" :class="{ 'error': errors.content }">
        <label for="content">Contenido</label>
        <textarea
          id="content"
          v-model="newsForm.content"
          rows="10"
          placeholder="Escribe la noticia aquí..."
          class="centered-input"
        ></textarea>
        <span v-if="errors.content" class="error-message">Este campo es obligatorio</span>
      </div>

      <button type="submit" class="submit-btn">Guardar</button>
    </form>

    <div v-if="showError" class="error-notification">
      Por favor, complete todos los campos obligatorios.
    </div>
    
    <div v-if="showConfirmation" class="confirmation-message">
      ¡Formulario enviado exitosamente!
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from "axios";

export default {
  name: "AddNews",
  components: {
    Multiselect,
  },
  setup() {
    const newsForm = ref({
      title: "",
      category: "",
      tags: [],
      image: null,
      imagePerfil: null,
      content: "",
      reporterId: ""
    });

    const errors = ref({
      title: false,
      category: false,
      tags: false,
      image: false,
      imagePerfil: false,
      content: false,
      reporter: false
    });

    const showConfirmation = ref(false);
    const showError = ref(false);

    const categories = ref(["Política", "Economía", "Deportes","Actualidad","Nacionales","Internacionales","Entretenimiento","Viral","Local", "Opinión"]);
    const tagsOptions = ref([
      { name: "Portada" },
      { name: "Portada Bottom"},
      { name: "Importante" }
    ]);

    const reporters = ref([]);

    const onFileChange = (event) => {
      const file = event.target.files[0];
      newsForm.value.image = file;
    };

    const onProfileImageChange = (event) => {
      const file = event.target.files[0];
      newsForm.value.imagePerfil = file;
    };

    const validateForm = () => {
      let isValid = true;
      showError.value = false;

      // Validación de campos
      errors.value.title = !newsForm.value.title;
      errors.value.category = !newsForm.value.category;
      errors.value.tags = newsForm.value.tags.length === 0;
      errors.value.image = !newsForm.value.image;
      errors.value.content = !newsForm.value.content;
      errors.value.reporter = !newsForm.value.reporterId;

      if (newsForm.value.category === "Opinión") {
        errors.value.imagePerfil = !newsForm.value.imagePerfil;
      }

      // Verificar si algún campo tiene error
      for (let key in errors.value) {
        if (errors.value[key]) {
          isValid = false;
          showError.value = true;
        }
      }

      return isValid;
    };

    const submitForm = async () => {
      const token = localStorage.getItem('authToken');
      if (!validateForm()) {
        return;
      }

      try {
        const formData = new FormData();
        formData.append("image", newsForm.value.image);

        const imageResponse = await axios.post(`${process.env.VUE_APP_BACKENDURL}/subirimagen`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        });

        console.log("Respuesta de la imagen:", imageResponse);
        const imageUrl = imageResponse.data.filename;

        console.log("URL de la imagen obtenida:", imageUrl);

        let imagePerfilUrl = null;
        if (newsForm.value.category === "Opinión") {
          const formDataPerfil = new FormData();
          formDataPerfil.append("image", newsForm.value.imagePerfil);

          const imagePerfilResponse = await axios.post(`${process.env.VUE_APP_BACKENDURL}/subirimagen`, formDataPerfil, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            },
          });

          imagePerfilUrl = imagePerfilResponse.data.filename;
        }

        const newsData = {
          title: newsForm.value.title,
          category: newsForm.value.category,
          content: newsForm.value.content,
          image: imageUrl,
          tags: newsForm.value.tags.map(item => item.name),
          imagePerfil: imagePerfilUrl,
          reporterId: newsForm.value.reporterId
        };

        console.log("Enviando datos de la noticia:", newsData);

        const newsResponse = await axios.post(`${process.env.VUE_APP_BACKENDURL}/news`, newsData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Respuesta de la noticia:", newsResponse);

        // Mostrar mensaje de confirmación y limpiar el formulario
        showConfirmation.value = true;
        showError.value = false;
        clearForm();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    };

    const clearForm = () => {
      newsForm.value = {
        title: "",
        category: "",
        tags: [],
        image: null,
        imagePerfil: null,
        content: "",
        reporterId: ""
      };

      errors.value = {
        title: false,
        category: false,
        tags: false,
        image: false,
        imagePerfil: false,
        content: false,
        reporter: false
      };

      // Ocultar el mensaje después de unos segundos
      setTimeout(() => {
        showConfirmation.value = false;
      }, 3000);
    };

    const clearMessage = () => {
      showConfirmation.value = false;
    };

    const getReporters = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/reporters`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        reporters.value = response.data;
      } catch (error) {
        console.error("Error al obtener los periodistas:", error.response || error.message);
      }
    };

    onMounted(() => {
      getReporters();
    });

    return {
      newsForm,
      categories,
      tagsOptions,
      reporters,
      onFileChange,
      onProfileImageChange,
      submitForm,
      showConfirmation,
      showError,
      errors,
      clearMessage,
    };
  },
};
</script>

<style scoped>
.admin-panel {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.admin-panel h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group.error input,
.form-group.error select,
.form-group.error textarea,
.form-group.error .multiselect {
  border-color: #dc3545;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  width: 100%;
}

.centered-input {
  width: 80%;
  max-width: 600px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 5px;
}

.error-notification {
  margin-top: 15px;
  padding: 10px;
  background-color: #dc3545;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 20px auto;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.confirmation-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}
</style>
