import { useStore } from "../store";

export function MeshControls() {
  const resolution = useStore((s) => s.resolution);
  const setResolution = useStore((s) => s.setResolution);

  const pointCount = (resolution * resolution).toLocaleString("es-MX");

  return (
    <section className="p-3.5 border border-line rounded-lg bg-white/72">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="block text-rust-500 font-mono text-[0.62rem] font-bold tracking-[0.18em]">
            03
          </span>
          <h2 className="mt-0.5 text-ink text-[0.95rem] font-extrabold">
            Malla
          </h2>
        </div>
        <span className="text-muted font-mono text-[0.66rem] leading-relaxed">
          {pointCount} puntos
        </span>
      </div>

      <div className="grid gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <label className="text-muted text-[0.68rem] font-extrabold tracking-[0.09em] uppercase">
            Resolucion
          </label>
          <span className="min-w-[42px] px-2 py-1 rounded-full bg-ochre-100 text-ochre-700 font-mono text-[0.72rem] font-extrabold text-center">
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
