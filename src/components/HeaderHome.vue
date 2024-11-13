<template>
  <div class="header-space"></div>
  <header class="header-home">
    <div class="logo">
      <img src="@/assets/logoSTE.png" alt="Logo" />
    </div>
  </header>
  <div class="bottom-border"></div>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: [
        { src: require('@/assets/icons/instagram.svg'), alt: 'Instagram', href: 'https://instagram.com' },
        { src: require('@/assets/icons/facebook.svg'), alt: 'Facebook', href: 'https://facebook.com' },
        { src: require('@/assets/icons/whatsapp.svg'), alt: 'WhatsApp', href: 'https://whatsapp.com' },
        { src: require('@/assets/icons/youtube.svg'), alt: 'YouTube', href: 'https://youtube.com' }
      ]
    };
  }
};
</script>

<style scoped>
.header-home {
  flex-direction: column;
  padding: 0 20px; /* Padding interno */
  margin: 0; /* Elimina los márgenes externos */
}
.header-space {
  height: 50px;
  background-color: #E0E0E0;
  border-bottom: 2px solid #CCCCCC; 
  width: 100%;
  margin-top: 0; /* Alinea con el límite superior */
}
.logo img {
  height: 50px;
}
.bottom-border {
  height: 5px;
  background-color: #F2665E;
}
</style>