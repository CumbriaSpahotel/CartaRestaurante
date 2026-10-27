# Reglas del Proyecto - Carta Restaurante

## Control de Versión Global Única
- Existe una **única versión global** para todo el sistema (compartida por todos los módulos y archivos: `*.html`, `*.js`, `*.css`, `*.json`, etc.).
- Cada vez que se realice cualquier modificación en cualquier parte del sistema:
  1. Incrementar el número de versión global en [`REGISTRO_VERSIONES.md`](file:///c:/Users/comun/Documents/GitHub/CartaRestaurante/REGISTRO_VERSIONES.md) siguiendo versionado semántico (`MAJOR.MINOR.PATCH`).
  2. Actualizar la fecha (`AAAA-MM-DD`) de última actualización del sistema.
  3. Añadir una entrada en la sección **Historial de Versiones** con la nueva versión, la fecha, los archivos modificados y el detalle de los cambios realizados.
