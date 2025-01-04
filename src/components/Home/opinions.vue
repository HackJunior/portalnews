<template>
    <div class="opinions-container">
        <div class="opinions-header">
            <h2 class="opinions-title">Opiniones</h2>
        </div>
        <div class="opinions-gallery">
            <button @click="prevOpinion" class="nav-button">‹</button>
            <transition-group name="slide-fade" tag="div" class="opinions-wrapper">
                <div class="opinion" v-for="(opinion, index) in visibleOpinions" :key="index">
                    <img :src="opinion.photo" alt="Person's photo" class="photo-circle" />
                    <p class="opinion-text">{{ opinion.text }}</p>
                </div>
            </transition-group>
            <button @click="nextOpinion" class="nav-button">›</button>
        </div>
    </div>
</template>

<script>
import opinion1 from '@/assets/opinions/opinion_1.jpg';
import opinion2 from '@/assets/opinions/opinion_2.jpeg';
import opinion3 from '@/assets/opinions/opinion_3.jpeg';
import opinion4 from '@/assets/opinions/opinion_4.jpg';
import opinion5 from '@/assets/opinions/opinion_5.jpeg';
import opinion6 from '@/assets/opinions/opinion_6.jpg';
import opinion7 from '@/assets/opinions/opinion_7.png';

export default {
    data() {
        return {
            opinions: [
                { photo: opinion1, text: 'Entre pantallas y progreso: proteger a la niñez en la era digital' },
                { photo: opinion2, text: 'Entre pantallas y progreso: proteger a la niñez en la era digital' },
                { photo: opinion3, text: 'Entre pantallas y progreso: proteger a la niñez en la era digital' },
                { photo: opinion4, text: 'Entre pantallas y progreso: proteger a la niñez en la era digital' },
                { photo: opinion5, text: 'Entre pantallas y progreso: proteger a la niñez en la era digital' },
                { photo: opinion6, text: 'Entre pantallas y progreso: proteger a la niñez en la era digital' },
                { photo: opinion7, text: 'Entre pantallas y progreso: proteger a la niñez en la era digital' },
            ],
            currentIndex: 0,
            visibleCount: 4, // Number of opinions to show at once
        };
    },
    computed: {
        visibleOpinions() {
            return this.opinions.slice(this.currentIndex, this.currentIndex + this.visibleCount);
        },
    },
    methods: {
        prevOpinion() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
        nextOpinion() {
            if (this.currentIndex < this.opinions.length - this.visibleCount) {
                this.currentIndex++;
            }
        },
    },
};
</script>

<style scoped>
.opinions-container {
    max-width: 1500px;
    margin: 20px auto;
    padding: 20px 0;
}

.opinions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 5px;
    position: relative;
}

.opinions-header::after {
    content: "";
    display: block;
    height: 5px;
    background: linear-gradient(to right, #ffc107 15%, white 15%);
    width: 100%;
    position: absolute;
    bottom: -2px;
    left: 0;
}

.opinions-title {
    font-size: 1.8em;
    font-weight: bold;
    color: #3DAAA0; /* Verde del logo */
}

.opinions-gallery {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px; /* Add space between header and gallery */
    padding-bottom: 20px; /* Add padding at the bottom */
}

.opinions-wrapper {
    display: flex;
    align-items: center;
}

.nav-button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%; 
    background-color: #3DAAA0; /* Verde del logo */
    color: white;
    transition: background-color 0.3s ease;
}

.nav-button:hover {
    background-color: #E84A4A; /* Rojo del logo */
}

.opinion {
    text-align: center;
    margin: 0 20px; /* Add space between opinions */
}

.photo-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px; /* Add space between images and text */
}

.opinion-text {
    margin-top: 10px;
}

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
</style>