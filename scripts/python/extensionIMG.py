from PIL import Image
import os

carpetas = [
    {"directorio": "F:/2__WEB'S Coding/ManagementSchoolSystem/img/galeria/albuns/muestraInstitucional2022", "rango": (1, 37)},
    {"directorio": "F:/2__WEB'S Coding/ManagementSchoolSystem/img/galeria/albuns/muestraInstitucional2019", "rango": (1, 39)},
    {"directorio": "F:/2__WEB'S Coding/ManagementSchoolSystem/img/galeria/albuns/egresados2019", "rango": (1, 52)},
    {"directorio": "F:/2__WEB'S Coding/ManagementSchoolSystem/img/galeria/albuns/egresados2017", "rango": (1, 59)},
    {"directorio": "F:/2__WEB'S Coding/ManagementSchoolSystem/img/galeria/albuns/concursoArte2024", "rango": (1, 84)},
    {"directorio": "F:/2__WEB'S Coding/ManagementSchoolSystem/img/galeria/albuns/torneoVoley2024", "rango": (1, 46)}
]

for carpeta in carpetas:
    directorioImagenes = carpeta["directorio"]
    rango = carpeta["rango"]

    for i in range(rango[0], rango[1] + 1):
        nombre_imagen = f"f{i}.jpg"
        ruta_jpg = os.path.join(directorioImagenes, nombre_imagen)

        if os.path.exists(ruta_jpg):
            with Image.open(ruta_jpg) as img:
                nombre_webp = f"f{i}.webp"
                ruta_webp = os.path.join(directorioImagenes, nombre_webp)
                img.save(ruta_webp, "WEBP", quality=80)

            os.remove(ruta_jpg)
            print(f"{nombre_imagen} convertido a {nombre_webp} y eliminado el archivo original.")
        else:
            print(f"{nombre_imagen} no encontrado en el directorio {directorioImagenes}.")
