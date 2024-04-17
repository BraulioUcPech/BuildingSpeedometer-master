// Importa el paquete fast-speedtest-api
import FastSpeedtest from "fast-speedtest-api";
import fetch from "node-fetch";

// Configura la API con tu token de API (puedes generar uno en la página de fast.com)
let speedtest = new FastSpeedtest({
  token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // Token proporcionado por Fast.com
  verbose: false, // Si quieres ver los mensajes de depuración en la consola
  timeout: 10000, // Tiempo máximo en ms para la prueba de velocidad
  https: true, // Si quieres que la prueba se realice a través de HTTPS
  urlCount: 5, // Cuántas URL quieres probar al mismo tiempo (para la precisión)
  bufferSize: 8, // El tamaño del buffer utilizado
  unit: FastSpeedtest.UNITS.Mbps, // La unidad en la que quieres que se muestren los resultados
});

// Endpoint para la prueba de velocidad
export async function get() {
  try {
    const speed = await speedtest.getSpeed();
    return new Response(JSON.stringify({ speed }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

module.exports = async (req, res) => {
  try {
    const response = await fetch("https://api.fast.com/netflix/speedtest/v2");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener la velocidad de Internet:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la velocidad de Internet" });
  }
};
