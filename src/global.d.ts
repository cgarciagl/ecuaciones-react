declare module "*.css";

declare module "echarts-gl/charts" {
  import type { ComponentOption } from "echarts";
  export const SurfaceChart: ComponentOption;
  export const Scatter3DChart: ComponentOption;
  export const Bar3DChart: ComponentOption;
  export const Line3DChart: ComponentOption;
  export const Lines3DChart: ComponentOption;
  export const Map3DChart: ComponentOption;
  export const Polygons3DChart: ComponentOption;
  export const ScatterGLChart: ComponentOption;
  export const GraphGLChart: ComponentOption;
  export const FlowGLChart: ComponentOption;
  export const LinesGLChart: ComponentOption;
}

declare module "echarts-gl/components" {
  import type { ComponentOption } from "echarts";
  export const Grid3DComponent: ComponentOption;
  export const Geo3DComponent: ComponentOption;
  export const GlobeComponent: ComponentOption;
  export const Mapbox3DComponent: ComponentOption;
  export const Maptalks3DComponent: ComponentOption;
}
