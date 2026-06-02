declare module "plotly.js-dist-min" {
  const Plotly: typeof import("plotly.js");
  export default Plotly;
}

declare module "react-plotly.js/factory" {
  import type { ComponentType, CSSProperties } from "react";
  import type {
    PlotlyHTMLElement,
    Layout,
    Config,
    Data,
    Frames,
  } from "plotly.js";

  export interface PlotParams {
    data: ReadonlyArray<Data | Partial<Data>>;
    layout?: Partial<Layout>;
    config?: Partial<Config>;
    frames?: Frames[];
    revision?: number;
    onInitialized?: (
      figure: { data: Data[]; layout: Partial<Layout>; frames: Frames[] | null },
      graphDiv: PlotlyHTMLElement
    ) => void;
    onUpdate?: (
      figure: { data: Data[]; layout: Partial<Layout>; frames: Frames[] | null },
      graphDiv: PlotlyHTMLElement
    ) => void;
    onPurge?: (
      figure: { data: Data[]; layout: Partial<Layout>; frames: Frames[] | null },
      graphDiv: PlotlyHTMLElement
    ) => void;
    onError?: (err: Error) => void;
    debug?: boolean;
    style?: CSSProperties;
    className?: string;
    useResizeHandler?: boolean;
    divId?: string;
    onAfterExport?: (figure: unknown) => void;
    onAfterPlot?: () => void;
    onAnimated?: () => void;
    onAnimatingFrame?: () => void;
    onAnimationInterrupted?: () => void;
    onAutoSize?: () => void;
    onBeforeExport?: () => void;
    onBeforeHover?: () => void;
    onButtonClicked?: () => void;
    onClick?: (data: unknown) => void;
    onClickAnnotation?: (data: unknown) => void;
    onDeselect?: () => void;
    onDoubleClick?: () => void;
    onFramework?: () => void;
    onHover?: (data: unknown) => void;
    onLegendClick?: (data: unknown) => void;
    onLegendDoubleClick?: (data: unknown) => void;
    onRelayout?: (data: unknown) => void;
    onRelayouting?: () => void;
    onRestyle?: (data: unknown) => void;
    onRedraw?: () => void;
    onSelected?: (data: unknown) => void;
    onSelecting?: (data: unknown) => void;
    onSliderChange?: (data: unknown) => void;
    onSliderEnd?: (data: unknown) => void;
    onSliderStart?: (data: unknown) => void;
    onSunburstClick?: (data: unknown) => void;
    onTransitioning?: () => void;
    onTransitionInterrupted?: () => void;
    onUnhover?: () => void;
    onWebGlContextLost?: (event: unknown) => void;
  }

  function createPlotlyComponent(
    plotly: typeof import("plotly.js")
  ): ComponentType<PlotParams>;

  export default createPlotlyComponent;
}

declare module "react-plotly.js" {
  import type { ComponentType } from "react";
  import type { PlotParams } from "react-plotly.js/factory";
  const Plot: ComponentType<PlotParams>;
  export default Plot;
}

declare module "*.css";
