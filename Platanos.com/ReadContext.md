# Contexto del proyecto: Platanos.com

## 1. Descripcion general

Platanos.com sera una landing page dedicada al mundo de los platanos. El sitio debe comunicar el producto de forma clara, fresca y memorable, utilizando una experiencia visual atractiva sin perder la sencillez.

El proyecto tiene un enfoque principalmente de **UX/UI**: cada decision de contenido, composicion, animacion y navegacion debe ayudar a que la persona entienda la propuesta, disfrute el recorrido y encuentre facilmente la accion principal.

La direccion general es:

- Landing page moderna, atractiva y responsive.
- Estilo minimalista, con suficiente espacio en blanco y jerarquia visual clara.
- Identidad inspirada en el platano, la naturaleza, la frescura y la energia.
- Animaciones suaves y con intencion, evitando efectos que distraigan del contenido.
- Experiencia cuidada en desktop, tablet y dispositivos moviles.
- Interfaz accesible, legible y sencilla de recorrer.

## 2. Objetivo del producto

Crear una landing page que presente a Platanos.com como una propuesta visualmente memorable y confiable, logrando que la audiencia:

1. Entienda rapidamente que ofrece el sitio.
2. Reconozca el valor y la personalidad de la marca.
3. Explore el contenido sin friccion.
4. Se interese por conocer mas, contactar o realizar la accion principal definida por el equipo.

La pagina debe priorizar el impacto de la primera pantalla, pero tambien construir una narrativa continua: introduccion, valor del producto, beneficios o informacion relevante y llamada a la accion.

## 3. Direccion visual y UX/UI

### Principios de diseno

- **Claridad:** un mensaje principal por seccion y una jerarquia tipografica evidente.
- **Minimalismo:** eliminar elementos decorativos o informativos que no aporten a la experiencia.
- **Contraste:** combinar una base limpia con acentos relacionados con el platano para guiar la atencion.
- **Ritmo visual:** alternar bloques de contenido, imagenes, color, espacio y movimiento para mantener el interes.
- **Consistencia:** repetir patrones de botones, espaciados, bordes, tipografia y comportamiento responsive.
- **Accesibilidad:** considerar contraste de color, estados de foco, textos alternativos, navegacion por teclado y movimiento reducido.

### Animaciones

Las animaciones deben reforzar la narrativa y la percepcion de calidad. Se pueden utilizar para:

- Revelar el contenido del hero al cargar la pagina.
- Dar profundidad o movimiento sutil a elementos organicos del producto.
- Animar la entrada de secciones al hacer scroll.
- Confirmar interacciones de botones, enlaces o formularios.
- Crear transiciones fluidas entre estados sin afectar el rendimiento.

Se debe respetar `prefers-reduced-motion` y evitar animaciones permanentes, excesivamente rapidas o que dificulten la lectura.

### Contenido esperado de la landing

La estructura visual puede evolucionar durante el desarrollo, pero debe contemplar como minimo:

- **Header:** marca o logotipo, navegacion principal y accion destacada.
- **Hero:** mensaje principal, texto breve, llamada a la accion e imagen o composicion protagonista del platano.
- **Seccion de valor:** beneficios, atributos o razones para elegir la propuesta.
- **Seccion visual o narrativa:** contenido que muestre el producto, su origen, sus usos o su personalidad.
- **Prueba o informacion de confianza:** datos, caracteristicas, testimonios o elementos que respalden la propuesta, si aplica.
- **CTA final:** recordatorio de la accion principal.
- **Footer:** enlaces utiles, redes sociales y datos de contacto, si corresponden.

No todas las secciones tienen que ser tarjetas. Las secciones principales deben sentirse como partes continuas de una misma experiencia; las tarjetas se reservaran para elementos repetidos que realmente necesiten agrupacion.

## 4. Estado actual

El proyecto se encuentra en una etapa inicial de configuracion.

- La aplicacion usa React con Vite.
- Tailwind CSS esta instalado e integrado mediante `@tailwindcss/vite`.
- `src/App.jsx` contiene actualmente una vista temporal de prueba.
- `src/App.css` conserva estilos heredados de la plantilla inicial y debera reemplazarse o limpiarse al construir la landing.
- `src/index.css` importa Tailwind CSS.
- `src/assets/` esta destinado a recursos visuales del proyecto.
- Todavia no existe una arquitectura definitiva de componentes ni secciones de la landing.

Por lo tanto, los estilos y el contenido actuales no representan aun el diseno final de Platanos.com.

## 5. Estructura del proyecto

```text
Platanos.com/
|-- index.html              # Documento HTML de entrada
|-- package.json            # Dependencias y scripts del proyecto
|-- vite.config.js          # Configuracion de Vite
|-- eslint.config.js        # Reglas de ESLint
|-- README.md               # Informacion basica del proyecto
|-- ReadContext.md          # Contexto, objetivos y criterios de diseno
|-- public/                 # Archivos publicos servidos sin procesamiento
|-- src/
	|-- main.jsx            # Punto de entrada de React
	|-- App.jsx             # Componente raiz de la aplicacion
	|-- App.css             # Estilos del componente raiz
	|-- index.css           # Estilos globales e importacion de Tailwind
	|-- assets/              # Imagenes, iconos y otros recursos visuales
```

Cuando la interfaz crezca, se recomienda organizar las piezas visuales dentro de `src/components/` y mantener en `App.jsx` la composicion general de la pagina. Las secciones grandes pueden vivir en `src/sections/` si la cantidad de contenido lo justifica.

## 6. Stack y comandos

### Tecnologias

- React `19.2.8`
- React DOM `19.2.8`
- Vite `8.2.2`
- Tailwind CSS `4.3.3`
- ESLint `10.9.0`

### Comandos disponibles

```bash
npm install       # Instala las dependencias
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Genera la compilacion de produccion
npm run lint      # Ejecuta las validaciones de ESLint
npm run preview   # Sirve localmente la compilacion generada
```

## 7. Criterios de implementacion

- Diseñar primero la experiencia y la jerarquia del contenido; despues ajustar los detalles visuales.
- Mantener componentes pequenos, reutilizables y con nombres descriptivos.
- Usar imagenes optimizadas y con textos alternativos cuando sean contenido relevante.
- Definir una paleta y tokens visuales consistentes para colores, tipografia, espaciado y sombras.
- Evitar estilos globales que afecten componentes de forma inesperada.
- Verificar cada cambio en mobile y desktop.
- Comprobar estados hover, focus, active, disabled y de carga cuando existan.
- Priorizar rendimiento: evitar imagenes innecesariamente pesadas y animaciones costosas.
- Validar el resultado con `npm run lint` y `npm run build` antes de considerar una entrega terminada.

## 8. Proximos pasos

1. Definir la identidad visual: paleta, tipografias, tratamiento fotografico e iconografia.
2. Crear el wireframe de la landing y establecer la accion principal.
3. Seleccionar o producir los recursos visuales del hero y las secciones.
4. Dividir la pagina en componentes y construir primero la experiencia responsive.
5. Integrar animaciones de entrada, scroll e interaccion de manera progresiva.
6. Revisar accesibilidad, rendimiento y consistencia visual.
7. Ejecutar lint y build, y hacer una revision final en distintos tamanos de pantalla.

## 9. Definicion de terminado

La landing page estara lista cuando:

- El mensaje principal se entienda en los primeros segundos.
- La accion principal sea visible y facil de identificar.
- El diseno mantenga una apariencia minimalista, distintiva y coherente.
- Las animaciones mejoren la experiencia sin perjudicar la usabilidad.
- La pagina sea responsive y no presente desbordamientos ni elementos superpuestos.
- La navegacion y los controles sean accesibles.
- Los recursos visuales carguen correctamente.
- `npm run lint` y `npm run build` finalicen correctamente.
