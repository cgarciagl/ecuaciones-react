import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts/core";
import { Line3DChart, Scatter3DChart, SurfaceChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";
import { TooltipComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsType } from "echarts/core";
import { useStore } from "../store";
import {
  buildEChartsOption,
  INITIAL_VIEW_CONTROL,
} from "../lib/plotData";
import {
  ECHARTS_CONTAINER_ID,
  subscribeSurfaceActions,
} from "../lib/surfaceEvents";

echarts.use([
  SurfaceChart,
  Scatter3DChart,
  Line3DChart,
  Grid3DComponent,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

export function PlotViewer() {
  const plotData = useStore((s) => s.plotData);
  const colorScale = useStore((s) => s.colorScale);
  const surfaceMode = useStore((s) => s.surfaceMode);

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType | null>(null);

  const option = useMemo(
    () => (plotData ? buildEChartsOption(plotData, colorScale, surfaceMode) : null),
    [plotData, colorScale, surfaceMode]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chart = echarts.init(container, undefined, { renderer: "canvas" });
    chartRef.current = chart;
    chart.resize();
    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(container);
    return () => {
      ro.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !option) return;
    chart.setOption(option, true);
    chart.resize();
  }, [option]);

  useEffect(() => {
    return subscribeSurfaceActions((action) => {
      const chart = chartRef.current;
      if (!chart) return;
      if (action.type === "resetCamera") {
        chart.setOption(
          { grid3D: { viewControl: { ...INITIAL_VIEW_CONTROL } } },
          false
        );
      } else {
        const url = chart.getDataURL({
          type: "png",
          pixelRatio: 2,
          backgroundColor: "#13180f",
        });
        const a = document.createElement("a");
        a.href = url;
        a.download = "superficie-3d.png";
        a.click();
      }
    });
  }, []);

  return (
    <div className="relative flex-1 min-h-[320px] overflow-hidden border border-[#2d362a] rounded-[18px] shadow-[0_28px_80px_rgba(15,20,12,0.42)]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 22% 18%, rgba(216, 164, 65, 0.21), transparent 30%),
            radial-gradient(circle at 78% 22%, rgba(90, 176, 145, 0.16), transparent 34%),
            #13180f
          `,
        }}
      />
      <div className="absolute inset-2.5 z-20 border border-white/12 rounded-[10px] pointer-events-none" />

      <div
        id={ECHARTS_CONTAINER_ID}
        ref={containerRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
      />
      {!plotData && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white/45 text-[0.96rem] font-medium pointer-events-none">
          Presiona "Generar" para visualizar
        </div>
      )}
    </div>
  );
}
