<?php
$directorio = 'img/galeria/';
$imagenes = glob($directorio . "*.jpg"); // Cambia la extensión si es necesario
$imagenes = array_map('basename', $imagenes); // Solo obtener los nombres de los archivos
echo json_encode($imagenes); // Convertir a JSON para que el JS pueda usarlo
?>
