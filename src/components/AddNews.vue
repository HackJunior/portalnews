<template>
  <div class="admin-panel">
    <h2>Agregar Noticias</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Título</label>
        <input
          type="text"
          id="title"
          v-model="newsForm.title"
          placeholder="Ingrese el título"
        />
      </div>

      <div class="form-group">
        <label for="category">Categoría</label>
        <select id="category" v-model="newsForm.category">
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="form-group">
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
        />
      </div>

      <div class="form-group">
        <label for="image">Imagen</label>
        <input type="file" id="image" @change="onFileChange" accept="image/*" />
      </div>

      <div class="form-group">
        <label for="content">Contenido</label>
        <textarea
          id="content"
          v-model="newsForm.content"
          rows="10"
          placeholder="Escribe la noticia aquí..."
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Guardar</button>
    </form>

    <div v-if="showConfirmation" class="confirmation-message">
      ¡Formulario enviado exitosamente!
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
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
      content: "",
    });

    const categories = ref(["Política", "Economía", "Deportes"]);
    const tagsOptions = ref([
      { name: "Portada" },
      { name: "Portada Bottom"},
      { name: "Mas Leidas" },
      { name: "Importante" }
    ]);

    const showConfirmation = ref(false);

    const onFileChange = (event) => {
      const file = event.target.files[0];
      newsForm.value.image = file;
    };

    const submitForm = async () => {
      try {
        console.log("Iniciando la subida de imagen...");

        // Subimos la imagen primero
        const formData = new FormData();
        formData.append("image", newsForm.value.image);

        const apiUrl = "/api"; // NGINX lo redirigirá al backend
        const imageResponse = await axios.post(`${apiUrl}/subirimagen`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Respuesta de la imagen:", imageResponse);

        // Obtenemos la URL de la imagen desde la respuesta
        const imageUrl = imageResponse.data.filename;

        console.log("URL de la imagen obtenida:", imageUrl);

        const newsData = {
          title: newsForm.value.title,
          category: newsForm.value.category,
          content: newsForm.value.content,
          image: imageUrl,
          tags: newsForm.value.tags.map(item => item.name),
        };

        console.log("Enviando datos de la noticia:", newsData);

        const newsResponse = await axios.post(`${apiUrl}/addnews`, newsData);
        console.log("Respuesta de la noticia:", newsResponse);

        // Mostrar mensaje de confirmación y limpiar el formulario
        showConfirmation.value = true;
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
        content: "",
      };

      // Ocultar el mensaje después de unos segundos
      setTimeout(() => {
        showConfirmation.value = false;
      }, 3000);
    };

    const clearMessage = () => {
      showConfirmation.value = false;
    };

    return {
      newsForm,
      categories,
      tagsOptions,
      onFileChange,
      submitForm,
      showConfirmation,
      clearMessage,
    };
  },
};
</script>

<style scoped>
.admin-panel {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.admin-panel h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input[type="file"] {
  border: none;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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
