<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <img src="@/assets/logoSTE.png" alt="SDEtoday Logo" />
      </div>
      <h1 class="title">Welcome to SDEtoday.com</h1>
      <form @submit.prevent="submitForm" class="login-form">
        <div class="form-group">
          <label for="email">Username</label>
          <input
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p class="footer-text">
        Don't have an account? <a href="#">Sign up here</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
async submitForm() {

    try {
        const response = await axios.post(
            process.env.VUE_APP_BACKENDURL + '/login', 
            {
                username: this.email,
                password: this.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        const token = response.data.token;
        localStorage.setItem('authToken', token);
        this.$router.push('/account/AdminPanel');
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
    }
}

  },
};
</script>

<style scoped>
/* Contenedor Principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e64980, #20c997); /* Fondo uniforme */
  background-size: cover; /* Asegura que el fondo cubra toda el área */
  color: #fff;
  font-family: 'Arial', sans-serif;
  margin: 0; /* Elimina cualquier margen predeterminado */
  padding: 0; /* Elimina padding adicional */
  box-sizing: border-box; /* Asegura el modelo de caja */
}

/* Cuadrado Central */
.login-box {
  background: #fff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-sizing: border-box;
}

/* Estilo del Logo */
.logo img {
width: 300px;
height: 41px;
}

/* Título */
.title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

/* Formulario */
.login-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

/* Botón */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: #e64980;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background-color: #d6336c;
}

/* Texto del Pie */
.footer-text {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #333;
}

.footer-text a {
  color: #20c997;
  text-decoration: none;
  font-weight: bold;
}
</style>
