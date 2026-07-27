import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "@/components/Footer";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import { projects } from "@/lib/content";

function hrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href") ?? "");
}

describe("Footer", () => {
  it("shows the brand and the injected build version", () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain("RVR");
    expect(container.textContent).toContain("v2.0.2");
  });

  it("has no Twitter or X links", () => {
    const { container } = render(<Footer />);
    hrefs(container).forEach((h) => {
      expect(h.toLowerCase()).not.toContain("twitter.com");
      expect(h.toLowerCase()).not.toContain("x.com");
    });
  });
});

describe("Skills", () => {
  it("renders the backend-first stack", () => {
    render(<Skills />);
    expect(screen.getByText("Django")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
  });
});

describe("Projects", () => {
  it("shows the featured projects (1Link, TypeRush) open by default", () => {
    render(<Projects />);
    expect(screen.getByText("1Link")).toBeInTheDocument();
    expect(screen.getByText("TypeRush")).toBeInTheDocument();
  });

  it("renders every project by name once expanded", async () => {
    render(<Projects />);
    await userEvent.click(screen.getByRole("button", { name: /show more projects/i }));
    projects.projects.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });
});
