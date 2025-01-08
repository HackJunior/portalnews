<template>
    <div class="info-container">
        <div class="info-box">
            <h2>Divisas</h2>
            <table class="currency-table">
                <tbody>
                    <tr>
                        <td>Moneda</td>
                        <td>Compra</td>
                        <td>Venta</td>
                    </tr>
                    <tr>
                        <td>Dólar</td>
                        <td>${{ dolarCompra }} DOP</td>
                        <td>${{ dolarVenta }} DOP</td>
                    </tr>
                    <tr>
                        <td>Euro</td>
                        <td>€{{ euroCompra }} DOP</td>
                        <td>€{{ euroVenta }} DOP</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="info-box">
            <h2>Combustible</h2>
            <table class="fuel-table">
                <tbody>
                    <tr>
                        <td>Gasolina:</td>
                        <td>${{ gasolina }} DOP</td>
                    </tr>
                    <tr>
                        <td>Diesel:</td>
                        <td>${{ diesel }} DOP</td>
                    </tr>
                    <tr>
                        <td>Gas:</td>
                        <td>${{ gas }} DOP</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="info-box">
            <h2>Encuesta</h2>
            <h3>{{ survey.title }}</h3>
            <div v-if="!hasVoted" class="survey-vote">
                <button @click="vote('yes')">SI</button>
                <button @click="vote('no')">NO</button>
            </div>
            <div v-else class="survey-results">
                <p>SI: {{ survey.percentages.yes }}</p>
                <p>NO: {{ survey.percentages.no }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'InfoDolarCombustible',
    data() {
        return {
            dolarCompra: '56.75',
            dolarVenta: '57.25',
            euroCompra: '67.89',
            euroVenta: '68.39',
            gasolina: '230.50',
            diesel: '190.75',
            gas: '125.00',
            survey: {},
            hasVoted: false
        };
    },
    methods: {
        async getSurvey() {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${process.env.VUE_APP_BACKENDURL}/surveys/active`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.survey = response.data.survey;
            } catch (error) {
                console.error("Error al obtener la encuesta:", error.response || error.message);
            }
        },
        async vote(voteType) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.post(`${process.env.VUE_APP_BACKENDURL}/surveys/vote`, { voteType }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.hasVoted = true;
                this.getSurvey();
            } catch (error) {
                console.error("Error al votar en la encuesta:", error.response || error.message);
            }
        }
    },
    mounted() {
        this.getSurvey();
    }
};
</script>

<style scoped>
.info-container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: #f9f9f9;
}

.info-box {
    border: 1px solid #ccc;
    padding: 20px;
    width: 30%;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-bottom: 20px;
    font-family: Arial, sans-serif;
}

h2 {
    margin-bottom: 10px;
    color: #333;
}

p {
    margin: 5px 0;
    color: #555;
    text-align: justify;
}

.currency-table {
    width: 100%;
    border-collapse: collapse;
}

.currency-table td {
    padding: 8px;
    text-align: center;
}

.fuel-table {
    width: 100%;
    border-collapse: collapse;
}

.fuel-table td {
    padding: 8px;
    text-align: center;
}

.survey-vote button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;

}

.survey-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    font-size: 1em;
    color: #333;
}
</style>