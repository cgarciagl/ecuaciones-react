import { describe, it, expect, beforeEach } from "vitest";
import { useStore, type ColorScale, type SurfaceMode } from "../index";
import { EXAMPLES } from "../../lib/examples";
import { resetStore, getStoreState } from "../../test/storeHelpers";

const getState = getStoreState;

describe("useStore - initial state", () => {
  beforeEach(resetStore);

  it("starts with the first example's equation", () => {
    expect(getState().equation).toBe(EXAMPLES[0].eq);
  });

  it("starts with the default range", () => {
    expect(getState().xMin).toBe(-3.14);
    expect(getState().xMax).toBe(3.14);
    expect(getState().yMin).toBe(-3.14);
    expect(getState().yMax).toBe(3.14);
  });

  it("starts with resolution 60, Viridis color and surface mode", () => {
    expect(getState().resolution).toBe(80);
    expect(getState().colorScale).toBe("Viridis");
    expect(getState().surfaceMode).toBe("surface");
  });

  it("starts with the initial plot data computed eagerly, ok status and no error", () => {
    const s = getState();
    expect(s.plotData).not.toBeNull();
    expect(s.plotData?.x).toHaveLength(80);
    expect(s.plotData?.y).toHaveLength(80);
    expect(s.plotData?.z).toHaveLength(80);
    expect(s.status.type).toBe("ok");
    expect(s.error).toBeNull();
  });

  it("starts with examples panel closed", () => {
    expect(getState().examplesOpen).toBe(false);
  });
});

describe("useStore - simple setters", () => {
  beforeEach(resetStore);

  it("setEquation updates equation", () => {
    getState().setEquation("x + y");
    expect(getState().equation).toBe("x + y");
  });

  it("setDomain updates all four bounds at once", () => {
    getState().setDomain(-10, 10, -5, 5);
    const s = getState();
    expect(s.xMin).toBe(-10);
    expect(s.xMax).toBe(10);
    expect(s.yMin).toBe(-5);
    expect(s.yMax).toBe(5);
  });

  it("setDomainPreset parses a comma separated string and renders", () => {
    getState().setDomainPreset("-10,10,-5,5");
    const s = getState();
    expect(s.xMin).toBe(-10);
    expect(s.xMax).toBe(10);
    expect(s.yMin).toBe(-5);
    expect(s.yMax).toBe(5);
    expect(s.plotData).not.toBeNull();
  });

  it("setDomainPreset ignores malformed strings", () => {
    getState().setDomain(0, 1, 0, 1);
    getState().setDomainPreset("not-numbers");
    const s = getState();
    expect(s.xMin).toBe(0);
    expect(s.xMax).toBe(1);
  });

  it("setResolution updates resolution and re-renders", () => {
    getState().setResolution(40);
    const s = getState();
    expect(s.resolution).toBe(40);
    expect(s.plotData).not.toBeNull();
  });

  it("setColorScale updates color and re-renders", () => {
    const next: ColorScale = "Plasma";
    getState().setColorScale(next);
    expect(getState().colorScale).toBe("Plasma");
    expect(getState().plotData).not.toBeNull();
  });

  it("setSurfaceMode updates mode and re-renders", () => {
    const next: SurfaceMode = "wireframe";
    getState().setSurfaceMode(next);
    expect(getState().surfaceMode).toBe("wireframe");
    expect(getState().plotData).not.toBeNull();
  });

  it("clearError resets error to null", () => {
    useStore.setState({ error: "boom" });
    getState().clearError();
    expect(getState().error).toBeNull();
  });
});

describe("useStore - examples panel", () => {
  beforeEach(resetStore);

  it("toggleExamples flips the open state", () => {
    expect(getState().examplesOpen).toBe(false);
    getState().toggleExamples();
    expect(getState().examplesOpen).toBe(true);
    getState().toggleExamples();
    expect(getState().examplesOpen).toBe(false);
  });

  it("closeExamples forces the panel closed", () => {
    useStore.setState({ examplesOpen: true });
    getState().closeExamples();
    expect(getState().examplesOpen).toBe(false);
  });
});

describe("useStore - renderSurface success", () => {
  beforeEach(resetStore);

  it("generates plot data with the right resolution", () => {
    getState().setResolution(20);
    getState().renderSurface();
    const s = getState();
    expect(s.plotData).not.toBeNull();
    expect(s.plotData?.x).toHaveLength(20);
    expect(s.plotData?.y).toHaveLength(20);
    expect(s.plotData?.z).toHaveLength(20);
  });

  it("sets status to ok and clears error on success", () => {
    getState().renderSurface();
    const s = getState();
    expect(s.status.type).toBe("ok");
    expect(s.error).toBeNull();
    expect(s.status.timing).toMatch(/\d+ ms/);
  });

  it("uses the trimmed equation as plot title", () => {
    getState().setEquation("  x*y  ");
    getState().renderSurface();
    expect(getState().plotTitle).toBe("x*y");
  });
});

describe("useStore - renderSurface validation", () => {
  beforeEach(resetStore);

  it("rejects an empty equation", () => {
    getState().setEquation("   ");
    getState().renderSurface();
    const s = getState();
    expect(s.error).toMatch(/Ingresa una ecuacion/);
    expect(s.status.type).toBe("error");
  });

  it("rejects an equation with a disallowed variable", () => {
    getState().setEquation("foo + x");
    getState().renderSurface();
    const s = getState();
    expect(s.error).toMatch(/Variable no permitida/);
    expect(s.status.type).toBe("error");
  });

  it("rejects a syntactically broken expression", () => {
    getState().setEquation("sin(x");
    getState().renderSurface();
    const s = getState();
    expect(s.error).toMatch(/sintaxis/i);
    expect(s.status.type).toBe("error");
  });

  it("rejects when min >= max", () => {
    useStore.setState({ xMin: 5, xMax: 5, yMin: 0, yMax: 1 });
    getState().renderSurface();
    const s = getState();
    expect(s.error).toMatch(/minimo debe ser menor/);
    expect(s.status.type).toBe("error");
  });
});

describe("useStore - loadExample and resetDefaults", () => {
  beforeEach(resetStore);

  it("loadExample sets equation, defaults and closes the panel", () => {
    useStore.setState({ examplesOpen: true, equation: "bogus" });
    getState().loadExample(2);
    const s = getState();
    expect(s.equation).toBe(EXAMPLES[2].eq);
    expect(s.xMin).toBe(-3.14);
    expect(s.examplesOpen).toBe(false);
  });

  it("resetDefaults restores initial values and re-renders", () => {
    getState().setEquation("foo");
    getState().setResolution(20);
    getState().setColorScale("Plasma");
    getState().setSurfaceMode("wireframe");
    getState().setDomain(-1, 1, -1, 1);

    getState().resetDefaults();
    const s = getState();
    expect(s.equation).toBe(EXAMPLES[0].eq);
    expect(s.resolution).toBe(80);
    expect(s.colorScale).toBe("Viridis");
    expect(s.surfaceMode).toBe("surface");
    expect(s.xMin).toBe(-3.14);
    expect(s.xMax).toBe(3.14);
    expect(s.yMin).toBe(-3.14);
    expect(s.yMax).toBe(3.14);
  });
});
