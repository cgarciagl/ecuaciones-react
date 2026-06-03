<div align="center">

```
    ███████╗ ██████╗██╗   ██╗ █████╗  ██████╗██╗ ██████╗ ███╗   ██╗███████╗███████╗
    ██╔════╝██╔════╝██║   ██║██╔══██╗██╔════╝██║██╔═══██╗████╗  ██║██╔════╝██╔════╝
    █████╗  ██║     ██║   ██║███████║██║     ██║██║   ██║██╔██╗ ██║█████╗  ███████╗
    ██╔══╝  ██║     ██║   ██║██╔══██║██║     ██║██║   ██║██║╚██╗██║██╔══╝  ╚════██║
    ███████╗╚██████╗╚██████╔╝██║  ██║╚██████╗██║╚██████╔╝██║ ╚████║███████╗███████║
    ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝
```

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-0969da?style=for-the-badge&logo=github&logoColor=white)](https://cgarciagl.github.io/ecuaciones-react/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Rspack](https://img.shields.io/badge/Rspack-F7A41D?style=for-the-badge&logo=rspack&logoColor=white)](https://rspack.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-3B3B3B?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

---

## Que es?

**Superficie3D** es una aplicacion web interactiva que te permite visualizar ecuaciones matematicas como superficies 3D en tiempo real. Escribe cualquier ecuacion `z = f(x, y)` y explorala con rotacion, zoom y multiples escalas de color.

## Caracteristicas

- **Editor de ecuaciones** con autocompletado de funciones (sin, cos, sqrt, exp, log, abs)
- **Visualizacion 3D** interactiva con ECharts + echarts-gl (rotar, hacer zoom, desplazar)
- **Controles de dominio** para ajustar rangos de X e Y con presets
- **Slider de resolucion** de malla (20x20 a 200x200 puntos)
- **6 escalas de color**: Viridis, Plasma, Hot, Electric, Earth, Greys
- **10 ejemplos precargados**: ondas concentricas, silla de montar, gaussiana, y mas
- **Descarga PNG** de la superficie generada
- **Responsive** - funciona en desktop y mobile
- **Mensajes de error claros** para ecuaciones invalidas

## Stack tecnologico

| Capa     | Tecnologia           | Por que?                                           |
| -------- | -------------------- | -------------------------------------------------- |
| Build    | **Rsbuild (Rspack)** | Builds ~10x mas rapidos que Webpack                |
| UI       | **React 19**         | Rendering eficiente con concurrent features        |
| Estado   | **Zustand**          | State management ligero, sin boilerplate           |
| Estilos  | **Tailwind CSS v4**  | Utility-first, CSS optimizado en produccion        |
| Graficos | **ECharts + echarts-gl** | Motor 3D WebGL, lazy-loaded como chunk async (~730 KB) |
| Paquetes | **pnpm**             | Deduplicacion global, ~70% menos espacio en disco  |

## Empezar

### Requisitos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Instalacion

```bash
git clone https://github.com/cgarciagl/ecuaciones-react.git
cd ecuaciones-react
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Produccion

```bash
pnpm build
pnpm preview
```

### Tests

```bash
pnpm test          # corre la suite una vez
pnpm test:watch    # modo watch
pnpm typecheck     # TypeScript sin emitir
```

La suite usa [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) sobre `happy-dom`. Cubre el parser matematico, el store de Zustand y los componentes de UI.

## Estructura del proyecto

```
ecuaciones-react/
├── src/
│   ├── components/
│   │   ├── ActionRow.tsx        # Botones generar/reset
│   │   ├── ColorPicker.tsx      # Selector de escala de color
│   │   ├── DomainControls.tsx   # Controles de rango X/Y
│   │   ├── EquationInput.tsx    # Input de ecuacion + funciones
│   │   ├── ExamplesPanel.tsx    # Panel de ejemplos + sheet mobile
│   │   ├── Footer.tsx           # Barra de atajos de teclado
│   │   ├── Header.tsx           # Logo y titulo
│   │   ├── MeshControls.tsx     # Slider de resolucion
│   │   ├── PlotViewer.tsx       # Grafico 3D ECharts (lazy)
│   │   ├── StatusBar.tsx        # Indicador de estado
│   │   └── WorkspaceBar.tsx     # Barra de herramientas
│   ├── lib/
│   │   ├── mathParser.ts        # Parser de ecuaciones
│   │   └── examples.ts          # Definiciones de ejemplos
│   ├── store/
│   │   └── index.ts             # Zustand store global
│   ├── global.d.ts              # Shims de tipos (echarts, echarts-gl, css)
│   ├── App.tsx                  # Layout principal
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globales + Tailwind
├── rsbuild.config.mjs           # Configuracion de Rspack
├── tsconfig.json                # Configuracion de TypeScript
└── package.json
```

## Ejemplos incluidos

| Nombre             | Ecuacion                                              |
| ------------------ | ----------------------------------------------------- |
| Ondas concentricas | `sin(sqrt(x^2 + y^2))`                                |
| Silla de montar    | `x^2 - y^2 * 2`                                       |
| Gaussiana 2D       | `exp(-(x^2 + y^2) / 8)`                               |
| Sombrero mexicano  | `(1 - (x^2 + y^2)/2) * exp(-(x^2 + y^2)/4)`           |
| Rosenbrock         | `(1 - x)^2 + 100*(y - x^2)^2`                         |
| Onda sinusoidal    | `sin(x) * cos(y)`                                     |
| Funcion Peaks      | `3*(1-x)^2*exp(-x^2 - (y+1)^2) - ...`                 |
| Espirales          | `sin(x^2 + y^2) * cos(x*y)`                           |
| Toroide            | `cos(sqrt((x-3)^2 + y^2)) + cos(sqrt((x+3)^2 + y^2))` |
| Fractal suave      | `sin(x) * sin(y) + sin(3*x) * cos(3*y) / 3`           |

## Funciones soportadas

| Tipo            | Funciones                                            |
| --------------- | ---------------------------------------------------- |
| Trigonometricas | `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2` |
| Hiperbolicas    | `sinh`, `cosh`, `tanh`                               |
| Potencia        | `sqrt`, `cbrt`, `pow`, `exp`                         |
| Logaritmos      | `log`, `log2`, `log10`                               |
| Redondeo        | `floor`, `ceil`, `round`, `abs`                      |
| Otros           | `max`, `min`, `random`, `pi`, `e`                    |

## Controles del mouse

| Accion    | Control           |
| --------- | ----------------- |
| Rotar     | Arrastrar         |
| Zoom      | Scroll            |
| Desplazar | Shift + Arrastrar |

## License

MIT

---

<div align="center">
  <sub>Hecho con math y mucho cafe.</sub>
</div>
