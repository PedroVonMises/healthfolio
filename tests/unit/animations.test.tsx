import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";

// Mock framer-motion for deterministic test output
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  );
  return {
    ...actual,
    // Provide a simple pass-through MotionConfig for tests
    MotionConfig: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// Mock next/navigation for page transitions testing
vi.mock("next/navigation", () => ({
  usePathname: () => "/mock-path",
}));

/* ------------------------------------------------------------------ */
/* MotionProvider                                                      */
/* ------------------------------------------------------------------ */

describe("MotionProvider", () => {
  it("renders children correctly", async () => {
    // Re-import after mock is set up
    const { default: MotionProvider } = await import(
      "@/components/ui/MotionProvider"
    );

    render(
      <MotionProvider>
        <p>child content</p>
      </MotionProvider>
    );

    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("wraps children with MotionConfig", async () => {
    const { default: MotionProvider } = await import(
      "@/components/ui/MotionProvider"
    );

    const { container } = render(
      <MotionProvider>
        <div data-testid="inner">wrapped</div>
      </MotionProvider>
    );

    // The MotionProvider should render its children (no extra wrapper in mock)
    expect(container.querySelector("[data-testid='inner']")).toBeTruthy();
  });
});

/* ------------------------------------------------------------------ */
/* FadeIn                                                              */
/* ------------------------------------------------------------------ */

describe("FadeIn", () => {
  it("renders children correctly", async () => {
    const { default: FadeIn } = await import("@/components/ui/FadeIn");

    render(
      <FadeIn>
        <span>hello</span>
      </FadeIn>
    );

    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies custom className", async () => {
    const { default: FadeIn } = await import("@/components/ui/FadeIn");

    const { container } = render(
      <FadeIn className="my-class">
        <span>content</span>
      </FadeIn>
    );

    // The outer motion.div should have the class
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("my-class");
  });

  it("applies fullWidth class when prop is true", async () => {
    const { default: FadeIn } = await import("@/components/ui/FadeIn");

    const { container } = render(
      <FadeIn fullWidth>
        <span>full</span>
      </FadeIn>
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("w-full");
  });
});

/* ------------------------------------------------------------------ */
/* StaggerContainer                                                    */
/* ------------------------------------------------------------------ */

describe("StaggerContainer", () => {
  it("renders children inside a motion.div", async () => {
    const { StaggerContainer } = await import("@/components/ui/FadeIn");

    render(
      <StaggerContainer>
        <div>child 1</div>
        <div>child 2</div>
      </StaggerContainer>
    );

    expect(screen.getByText("child 1")).toBeInTheDocument();
    expect(screen.getByText("child 2")).toBeInTheDocument();
  });

  it("applies custom className", async () => {
    const { StaggerContainer } = await import("@/components/ui/FadeIn");

    const { container } = render(
      <StaggerContainer className="grid gap-4">
        <div>item</div>
      </StaggerContainer>
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("grid");
    expect(wrapper?.className).toContain("gap-4");
  });
});

/* ------------------------------------------------------------------ */
/* TrustMetrics (AnimatedCounter)                                      */
/* ------------------------------------------------------------------ */

describe("TrustMetrics", () => {
  it("renders all metric labels", async () => {
    const { default: TrustMetrics } = await import(
      "@/components/ui/TrustMetrics"
    );

    render(<TrustMetrics />);

    expect(screen.getByText("Aumento na Conversão")).toBeInTheDocument();
    expect(screen.getByText("Redução de No-show")).toBeInTheDocument();
    expect(screen.getByText("Adequação LGPD")).toBeInTheDocument();
    expect(screen.getByText("Satisfação do Paciente")).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/* AnimatedCounter                                                     */
/* ------------------------------------------------------------------ */

describe("AnimatedCounter", () => {
  it("renderiza com aria-label correto para acessibilidade", async () => {
    const { AnimatedCounter } = await import("@/components/ui/AnimatedCounter");
    render(<AnimatedCounter value={98} suffix="%" />);
    expect(screen.getByLabelText("98%")).toBeInTheDocument();
  });

  it("exibe prefixo e sufixo corretamente no aria-label", async () => {
    const { AnimatedCounter } = await import("@/components/ui/AnimatedCounter");
    render(<AnimatedCounter value={1200} prefix="R$ " suffix="+" />);
    expect(screen.getByLabelText("R$ 1.200+")).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/* StaggerList & StaggerItem                                           */
/* ------------------------------------------------------------------ */

describe("StaggerList & StaggerItem", () => {
  it("renders all items inside the list", async () => {
    const { StaggerList, StaggerItem } = await import(
      "@/components/ui/StaggerList"
    );

    render(
      <StaggerList>
        <StaggerItem>Item A</StaggerItem>
        <StaggerItem>Item B</StaggerItem>
      </StaggerList>
    );

    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
  });

  it("applies custom classNames", async () => {
    const { StaggerList, StaggerItem } = await import(
      "@/components/ui/StaggerList"
    );

    const { container } = render(
      <StaggerList className="stagger-list-class">
        <StaggerItem className="stagger-item-class">Item</StaggerItem>
      </StaggerList>
    );

    const list = container.querySelector(".stagger-list-class");
    const item = container.querySelector(".stagger-item-class");

    expect(list).toBeInTheDocument();
    expect(item).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/* PageTransition                                                      */
/* ------------------------------------------------------------------ */

describe("PageTransition", () => {
  it("renders children successfully", async () => {
    const { PageTransition } = await import(
      "@/components/ui/PageTransition"
    );

    render(
      <PageTransition>
        <div data-testid="page-content">Page Content</div>
      </PageTransition>
    );

    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });
});

