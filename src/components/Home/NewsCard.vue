
<template>
  <div class="news-card">
    <img :src="imageSrc" alt="news" class="news-image" />
    <div class="news-content">
      <h2 class="news-title">{{ title }}</h2>
      <p class="news-description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'imageSrc']
};
</script>

<style scoped>
.news-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin: 15px;
  background-color: #fff;
}
.news-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.news-title {
  font-size: 1.5em;
  margin: 10px 0;
}
.news-description {
  font-size: 1em;
  color: #555;
}
</style>
