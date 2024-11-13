<template>
  <div>
    <HeaderHome :logoSrc="logoSrc" />
    <MenuHome />
    <PortadaHome />
    <PortadaBottom />
    <CategoryHome :message="categoria_1"/>
  </div>
</template>

<script>
import HeaderHome from '@/components/HeaderHome.vue';
import MenuHome from '@/components/MenuHome.vue';
import PortadaHome from '@/components/PortadaHome.vue';
import PortadaBottom from '@/components/PortadaBottom.vue';
import CategoryHome from '@/components/CategoryHome.vue';


export default {
  components: { HeaderHome, MenuHome , PortadaHome, PortadaBottom,CategoryHome},
  data() {
    return {
      logoSrc: require('@/assets/logoSTE.png'),
      categories: [
        { id: 'nacionales', name: 'Nacionales' },
        { id: 'internacionales', name: 'Internacionales' },
        { id: 'politica', name: 'Política' },
        { id: 'entretenimiento', name: 'Entretenimiento' },
        { id: 'deportes', name: 'Deportes' },
        { id: 'economia', name: 'Economía' },
        { id: 'actualidad', name: 'Actualidad' },
        { id: 'tecnologia', name: 'Tecnología' },
        { id: 'no data', name: 'no data' }
      ]
    };
  },
  setup() {
    const categoria_1 = "Nacionales";
    return {
      categoria_1,
    };
  },
};
</script>

<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
