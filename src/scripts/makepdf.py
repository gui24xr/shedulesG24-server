import sys
import pdfkit
import os

sourceFile = sys.argv[1] #Argumento viene en posicion 1 de script
fileNameWithoutExtension = sourceFile.replace(".html", "")

output_dir = os.path.join(os.getcwd(), 'src','docs')
os.makedirs(output_dir, exist_ok=True)  # Crear el directorio si no existe

# Generar el nombre del archivo PDF, usando el mismo nombre que el HTML (con extensión .pdf)
pdfFileName = os.path.join(output_dir, os.path.basename(fileNameWithoutExtension) + ".pdf")

options = {
    'page-size': 'A4',
    'orientation': 'Landscape',  # Orientación horizontal
    'margin-top': '0mm',
    'margin-right': '0mm',
    'margin-bottom': '0mm',
    'margin-left': '0mm',
    'encoding': 'UTF-8',
}
# Ruta al archivo HTML
html_file = sourceFile
# Ruta de salida para el PDF
fileResult = fileNameWithoutExtension + ".pdf"

# Convertir HTML a PDF
pdfkit.from_file(html_file, pdfFileName, options=options)

print(f"PDF generado exitosamente: {fileResult}")