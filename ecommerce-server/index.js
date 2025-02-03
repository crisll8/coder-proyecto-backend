const app = require('./src/app'); // Asegúrate de que app.js está bien exportado
const http = require('http');

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});