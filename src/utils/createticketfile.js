import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';


const htmlPath =  "./src/docs/" + uuidv4().toString()+".html"

export async function generateAppointmentTicket({clinic,date,hour,medic,patient}) {
    const htmlText = generateHTMLText({clinic,date,hour,medic,patient})
    generateHtmlFileTicket(htmlText)
    generatePDFInPython(htmlPath)

}

function generatePDFInPython(htmlFileName) {
    const scriptString = `python src/scripts/makepdf.py ${htmlFileName}`
    exec(scriptString, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el script: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        // Mostrar la salida del script de Python
        console.log(`stdout: ${stdout}`);
      });
}

function generateHtmlFileTicket(htmlText) {
    try {
    fs.writeFileSync(htmlPath, htmlText);
    console.log('Archivo generado exitosamente');
    } catch (err) {
    console.error('Hubo un error al escribir el archivo:', err);
    }
}



function generateHTMLText({clinic,date,hour,medic,patient}) {
    return `<!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket de Turno</title>
        <style>
    /* Estilos generales */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    /* Contenedor del ticket */
    .ticket {
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      width: 300px;
      text-align: center;
    }

    /* Título del ticket */
    .ticket h1 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 1rem;
    }

    /* Detalles del turno */
    .ticket p {
      font-size: 1rem;
      color: #555;
      margin: 0.5rem 0;
    }

    /* Estilo para resaltar información importante */
    .ticket .info {
      font-weight: bold;
      color: #007bff;
    }

    /* Pie del ticket */
    .ticket .footer {
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="ticket">
    <h1>Ticket de Turno</h1>

    <!-- Detalles del turno -->
    <p><span class="info">Paciente:</span>${patient}</p>
    <p><span class="info">Médico:</span>${medic}</p>
    <p><span class="info">Fecha:</span>${date}</p>
    <p><span class="info">Hora:</span>${hour}</p>
    <p><span class="info">Institución:</span>${clinic}</p>

    <!-- Pie del ticket -->
    <div class="footer">
      <p>Gracias por confiar en nosotros.</p>
      <p>Por favor, llegue 10 minutos antes.</p>
    </div>
  </div>
</body>
</html>`
}