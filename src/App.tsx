import { useEffect } from "react";
import { Header } from "./components/Header";
import { EquationInput } from "./components/EquationInput";
import { DomainControls } from "./components/DomainControls";
import { MeshControls } from "./components/MeshControls";
import { ColorPicker } from "./components/ColorPicker";
import { ActionRow } from "./components/ActionRow";
import {
  ExamplesPanel,
  ExamplesSheet,
  FloatingExamplesButton,
} from "./components/ExamplesPanel";
import { WorkspaceBar } from "./components/WorkspaceBar";
import { PlotViewer } from "./components/PlotViewer";
import { StatusBar } from "./components/StatusBar";
import { Footer } from "./components/Footer";
import { useStore } from "./store";

export default function App() {
  const renderSurface = useStore((s) => s.renderSurface);

  useEffect(() => {
    renderSurface();
  }, [renderSurface]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") useStore.getState().closeExamples();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative z-[1] grid h-screen min-h-0 p-5 gap-4 grid-cols-[minmax(350px,420px)_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] max-[980px]:h-auto max-[980px]:min-h-screen max-[980px]:p-4 max-[980px]:gap-3 max-[980px]:grid-cols-1 max-[980px]:grid-rows-[auto_minmax(560px,68vh)_auto_auto] max-[640px]:grid-rows-[auto_minmax(520px,calc(100svh-64px))_auto_auto]">
      <Header />

      <aside className="row-[2/4] flex flex-col gap-4 min-h-0 py-4 pl-5 pr-4 overflow-y-auto border border-line/80 rounded-[18px] bg-[#f8fcf8]/90 shadow-[0_28px_70px_rgba(23,35,28,0.18)] backdrop-blur-xl animate-[rise-in_0.34s_ease-out] sidebar-scroll max-[980px]:row-[3] max-[980px]:grid max-[980px]:grid-cols-2 max-[980px]:overflow-visible max-[980px]:rounded-[20px] max-[980px]:bg-[#f8fcf8] max-[980px]:py-5 max-[980px]:pl-5 max-[980px]:pr-4 max-[980px]:shadow-[0_16px_40px_rgba(23,35,28,0.14)] max-[640px]:grid-cols-1">
        <div className="max-[980px]:col-span-full max-[640px]:col-span-1">
          <EquationInput />
        </div>
        <DomainControls />
        <MeshControls />
        <ColorPicker />
        <div className="max-[980px]:col-span-full max-[640px]:col-span-1">
          <ActionRow />
        </div>
        <div className="max-[980px]:col-span-full max-[640px]:col-span-1">
          <ExamplesPanel />
        </div>
      </aside>

      <main className="flex flex-col min-w-0 min-h-0 gap-3.5 max-[980px]:row-[2] max-[980px]:gap-0 max-[980px]:bg-dark-bg">
        <WorkspaceBar />
        <PlotViewer />
        <StatusBar />
      </main>

      <Footer />

      <FloatingExamplesButton />
      <ExamplesSheet />
    </div>
  );
}
