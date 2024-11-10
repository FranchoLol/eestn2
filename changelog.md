# Changelog

### 7-11
- **Conversión de formatos de imágenes**: Se transformaron las imágenes de la galería de `.jpg` a `.webp`, reduciendo el tamaño de 711 MB a 76 MB para optimizar el tiempo de carga y reducir el uso de recursos.
- **Primer imagen optimizada**: Reducción de tiempo de carga de la primera imagen de la galería en la página de inicio de 1 s a 0.5 s para mejorar la velocidad de visualización.

### Registro detallado de días anteriores

#### 29-10
- **Rediseño de la página de inicio**: 
  - Cambio de formulario de login simple a una página inicial con un banner de presentación.
  - Agregada la historia del colegio (versión inicial).
  - Nuevas secciones: datos del colegio, programas extracurriculares, tasa de graduación, especialidades (mencionadas).
  - Implementación de secciones de portales para alumnos, profesores y cursos (sin funcionalidad de acceso).
  - Sección de ubicación con mapa y contactos en el pie de página.

#### 30-10
- **Actualización de la historia**: Se mejoró la redacción y se añadió una imagen.
- **Expansión de información escolar**:
  - Nuevos datos: número de cursos, laboratorios, biblioteca, kiosko, comedor, deportes de vóley, y cantidad de canchas de educación física.
  - Corrección de datos de profesores a +130.
  - Acceso al sitio de la tienda del kiosko.
  - Descripciones detalladas de las especialidades y requisitos de inscripción.

#### 31-10
- **Portales de cursos**: 
  - Se añadió una página accesible desde el portal de cursos con una tabla de actividades extracurriculares. 
  - La estructura de la tabla se organizó en base a la información proporcionada por el colegio, que fue inicialmente confusa.

#### 01-11
- **Nuevo menú de navegación**: Se agregó un menú desplegable en el encabezado con acceso rápido a la sección de cuentas.
- **Mejoras de diseño**: 
  - La historia y los requisitos de inscripción fueron centrados y mejorados visualmente.
  - Añadida una ilustración a la sección de inscripción para mejorar la estética.
  - Expansión del banner de bienvenida a una altura de 100vh para ocupar toda la pantalla.

#### 02-11
- **Adaptación responsiva**: Ajustes para optimización en dispositivos móviles y diversos tamaños de pantalla.

#### 04-11
- **Mejoras en la redacción de inscripciones**: La explicación de requisitos se redactó de forma más clara.
- **Optimización de visualización del portal de cursos**: Ajustes en el cuadro para hacerlo más limpio y legible, junto con mejoras en la adaptabilidad responsiva.
- **Idea de galería**: Se propuso y diseñó una galería para la página de inicio.

#### 05-11
- **Detalles visuales**:
  - Ajustes en la visualización de tarjetas de datos.
  - Modificación de botones en portales de cursos (cambio de "Salir" a "Inicio").
  - Diseño de galería con tarjeta informativa sobre la cantidad de imágenes y un botón de acceso a la misma.
  - Presentación de imágenes en rotación aleatoria cada 4 s con 5 de los 6 álbumes de imágenes, limitando a las primeras 20 imágenes de cada uno.
  - Estilo de explorador de archivos en la página de galería, similar al sistema iOS.

#### 06-11
- **Conversión masiva de imágenes**: Script en Python para convertir 310 imágenes de `.jpg` a `.webp`, reduciendo espacio de 711 MB a 76 MB.
- **Ajustes de diseño y responsividad en la página de inicio**.
- Eliminación de ilustraciones e imágenes en desuso.

#### 07-11
- **Optimización de la galería en la página de inicio**: Primer imagen configurada para cargarse en 0.5 s, con problemas pendientes de solución en cuanto al rendimiento.

#### 08-11
- **Mejora del script de imágenes**:
  - Registro de imágenes mostradas para evitar repeticiones.
  - Primer imagen ajustada a 10 ms de carga inicial, cargando solo la imagen visible para optimizar el rendimiento.

### 09-11

- **Ajustes en el encabezado (header) de la página de inicio**:
  - **Acceso rápido**: Se mantiene visible el acceso rápido a la cuenta (ícono de usuario) en pantallas pequeñas, mientras que el título del colegio se oculta para optimizar el espacio. Esto facilita la navegación y mejora la visualización en dispositivos móviles.
  - **Menú desplegable**: El ícono del menú desplegable permanece visible en la versión responsiva, ocultándose solo el título del colegio en pantallas pequeñas.

- **Ajustes en el encabezado de portales de cursos y galería**:
  - **Botón de salida (Inicio)**: Se mantiene visible el botón de "Inicio" en el encabezado, mientras que el título del colegio se oculta para mejorar la experiencia de navegación en dispositivos pequeños. Este ajuste se implementa tanto en los portales de cursos como en el de la galería.

- **Corrección en la sincronización del cambio de imagen en la galería de la página de inicio**:
  - Se solucionó el problema en el que la imagen no cambiaba correctamente durante la animación. Ahora, el cambio de imagen ocurre durante la reducción de tamaño y solo después de que la nueva imagen ha sido precargada. Esto asegura una transición más fluida y sincronizada, eliminando el desfase que ocurría previamente al esperar la finalización de la animación antes de cambiar la imagen. Este ajuste mejora la experiencia del usuario al ver las imágenes de la galería.

- **Ajuste de tamaños y márgenes en la tabla del portal de cursos**:
  - Se realizaron mejoras en la visualización de la tabla del portal de cursos, ajustando los tamaños y márgenes para una presentación más clara y organizada de la información.

- **Ajustes adicionales en las secciones del portal**:
  - Se realizaron ajustes en el tamaño y diseño de las siguientes secciones para mejorar la coherencia visual y la accesibilidad:
    - **Portal de cursos**
    - **Galería**
    - **Sección galería completa en el portal de galería**
    - **Sección de ubicación**
    - **Sección de curriculares en el portal de cursos**

- **Modificación en el perfil de usuarios en la sección de asistencias**:
  - Se agregó una columna adicional en la tabla de resumen de asistencias que muestra el total de faltas por área, por ejemplo, las faltas acumuladas en Taller, Teórico, o Educación Física.

| v1 | v2 |
|-|-|
|![asistenciaV1](img/markdown/userAsistenciaV1.png)|![asistenciaV2](img/markdown/userAsistenciaV2.png)|

- **Rediseño de la sección de biblioteca**:
La estructura de la tabla de biblioteca fue modificada de un diseño complejo de múltiples columnas para presentar los materiales (Libros, Tareas, Videos) a una presentación más intuitiva, mejorando la visualización y el acceso a los recursos de cada materia.

| v1 | v2 |
|-|-|
|![bibliotecaV1](img/markdown/userBibliotecaV1.png)|![bibliotecaV1](img/markdown/userBibliotecaV2.png)|

