import { useStore } from "../store";

export function MeshControls() {
  const resolution = useStore((s) => s.resolution);
  const setResolution = useStore((s) => s.setResolution);

  const pointCount = (resolution * resolution).toLocaleString("es-MX");

  return (
    <section className="pt-4 pb-4 pl-5 pr-4 border border-line/80 rounded-[14px] bg-white/80 shadow-[0_10px_26px_rgba(20,30,24,0.06)]">
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div>
          <span className="block text-rust-500 font-mono text-[0.64rem] font-semibold tracking-[0.16em]">
            03
          </span>
          <h2 className="mt-0.5 text-ink text-[1.07rem] font-extrabold">
            Malla
          </h2>
        </div>
        <span className="text-muted font-mono text-[0.68rem] leading-relaxed">
          {pointCount} puntos
        </span>
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <label className="text-muted text-[0.72rem] font-bold tracking-[0.08em] uppercase">
            Resolucion
          </label>
          <span className="min-w-[48px] px-2.5 py-1 rounded-full bg-ochre-100 text-ochre-700 font-mono text-[0.74rem] font-bold text-center">
            {resolution}
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={200}
          step={5}
          value={resolution}
          onChange={(e) => setResolution(Number(e.target.value))}
        />
      </div>
    </section>
  );
}
