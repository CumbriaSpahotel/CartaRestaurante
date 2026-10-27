# Reglas del Proyecto - Carta Restaurante

## Control de Versión Global Única y Automática
- Existe una **única versión global** para todo el sistema (compartida por todos los módulos y archivos: `*.html`, `*.js`, `*.css`, `*.json`, etc.).
- **EJECUCIÓN 100% AUTOMÁTICA**: Cada vez que se realice cualquier modificación, corrección o mejora en el código o estructura del sistema:
  1. El asistente actualizará **automáticamente en ese mismo turno** (sin necesidad de que el usuario lo pida) la versión global y la fecha de última actualización.
  2. Puede ejecutarse mediante el script auxiliar:
     ```bash
     node bump-version.js [patch|minor|major] "Descripción de los cambios" "archivos modificados"
     ```
     o actualizando directamente [`version.json`](file:///c:/Users/comun/Documents/GitHub/CartaRestaurante/version.json) y [`REGISTRO_VERSIONES.md`](file:///c:/Users/comun/Documents/GitHub/CartaRestaurante/REGISTRO_VERSIONES.md).
  3. Criterio de versionado semántico (`MAJOR.MINOR.PATCH`):
     - `patch`: Correcciones de bugs, textos, pequeños ajustes de estilo o mantenimiento.
     - `minor`: Nuevas funcionalidades, nuevas secciones de carta, nuevas herramientas de administración.
     - `major`: Reestructuraciones mayores o cambios de arquitectura incompatibles.
  4. Mantener siempre sincronizados [`version.json`](file:///c:/Users/comun/Documents/GitHub/CartaRestaurante/version.json) y [`REGISTRO_VERSIONES.md`](file:///c:/Users/comun/Documents/GitHub/CartaRestaurante/REGISTRO_VERSIONES.md).
