<template>
    <div class="info-container">
        <div class="info-box">
            <h2>Clima</h2>
            <p>{{ clima }}</p>
        </div>
        <div class="info-box">
            <h2>Conversión de Monedas</h2>
            <p>Dólar: ${{ dolar }} DOP</p>
            <p>Euro: €{{ euro }} DOP</p>
            <p>Libras: £{{ libra }} DOP</p>
        </div>
        <div class="info-box">
            <h2>Precios de Combustible</h2>
            <p>Gasolina: ${{ gasolina }} DOP</p>
            <p>Diesel: ${{ diesel }} DOP</p>
            <p>Gas: ${{ gas }} DOP</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoDolarCombustible',
    data() {
        return {
            clima: 'Soleado, 25°C',
            dolar: '56.75',
            euro: '67.89',
            libra: '78.34',
            gasolina: '230.50',
            diesel: '190.75',
            gas: '125.00'
        };
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
}

h2 {
    margin-bottom: 10px;
    color: #333;
}

p {
    margin: 5px 0;
    color: #555;
}
</style>