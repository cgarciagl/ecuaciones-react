import { lazy, Suspense, useEffect } from "react";
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
import { StatusBar } from "./components/StatusBar";
import { MobileModeSelector } from "./components/MobileModeSelector";
import { Footer } from "./components/Footer";
import { InstallPrompt } from "./components/InstallPrompt";
import { UpdatePrompt } from "./components/UpdatePrompt";
import { useStore } from "./store";

const PlotViewer = lazy(() =>
  import("./components/PlotViewer").then((m) => ({ default: m.PlotViewer }))
);

export default function App() {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") useStore.getState().closeExamples();
    };
    document.addEventListener("keydown", handleEscape, { passive: true });
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative z-[1] grid h-screen min-h-0 p-5 gap-4 grid-cols-[minmax(350px,420px)_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] max-[980px]:h-auto max-[980px]:min-h-screen max-[980px]:p-4 max-[980px]:gap-3 max-[980px]:grid-cols-1 max-[980px]:grid-rows-[auto_minmax(560px,68vh)_auto_auto] max-[640px]:grid-rows-[auto_minmax(520px,calc(100svh-64px))_auto_auto]">
      <Header />

      <aside className="row-[2/4] flex flex-col gap-4 min-h-0 py-4 pl-5 pr-4 overflow-y-auto border border-line/80 rounded-[18px] bg-[#f8fcf8]/90 shadow-[0_28px_70px_rgba(23,35,28,0.18)] backdrop-blur-xl animate-[rise-in_0.34s_ease-out] sidebar-scroll max-[980px]:row-[3] max-[980px]:grid max-[980px]:grid-cols-2 max-[980px]:overflow-visible max-[980px]:rounded-[20px] max-[980px]:bg-[#f8fcf8] max-[980px]:py-5 max-[980px]:pl-5 max-[980px]:pr-4 max-[980px]:shadow-[0_16px_40px_rgba(23,35,28,0.14)] max-[640px]:grid-cols-1 dark:bg-[#1a201a]/90 dark:shadow-[0_28px_70px_rgba(0,0,0,0.48)] dark:max-[980px]:bg-[#1a201a] dark:max-[980px]:shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
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
        <Suspense
          fallback={
            <div className="flex-1 min-h-[320px] flex items-center justify-center text-white/45 text-[0.96rem] font-medium border border-[#2d362a] rounded-[18px] bg-[#13180f]">
              Cargando visualizador...
            </div>
          }
        >
          <PlotViewer />
        </Suspense>
        <StatusBar />
      </main>

      <Footer />

      <div className="fixed right-3.5 bottom-3.5 z-20 flex items-center gap-2 hidden max-[980px]:flex">
        <MobileModeSelector />
        <FloatingExamplesButton />
      </div>
      <ExamplesSheet />
      <InstallPrompt />
      <UpdatePrompt />
    </div>
  );
}
