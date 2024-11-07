import os

directorio_imagenes = 'd:/2__WEB\'S Coding/ManagementSchoolSystem/img/galeria/albuns/concursoArte/' 

contador = 1

while contador <= 81:
    nombre_actual = f"img {contador}.jpg"
    ruta_actual = os.path.join(directorio_imagenes, nombre_actual)

    if os.path.exists(ruta_actual):
        nuevo_nombre = f'f{contador + 2}.jpg'
        ruta_nueva = os.path.join(directorio_imagenes, nuevo_nombre)
        try:
            os.rename(ruta_actual, ruta_nueva)
            print(f'Renombrado: "{ruta_actual}" a "{ruta_nueva}"')
        except Exception as e:
            print(f'Error al renombrar "{ruta_actual}": {e}')
    else:
        print(f'Archivo "{ruta_actual}" no encontrado')
    
    contador += 1

print("Renombrado completo")
