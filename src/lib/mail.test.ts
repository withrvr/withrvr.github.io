import { describe, it, expect } from "vitest";
import { buildContactCompose, buildScheduleCompose } from "@/lib/mail";
import { site } from "@/lib/content";

function params(url: string): URLSearchParams {
  return new URL(url).searchParams;
}

describe("contact compose", () => {
  it("opens a Gmail compose addressed to Raghav with the form fields in the body", () => {
    const url = buildContactCompose({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello there",
    });
    expect(url.startsWith("https://mail.google.com/mail/?")).toBe(true);

    const p = params(url);
    expect(p.get("view")).toBe("cm");
    expect(p.get("to")).toBe(site.email);
    const body = p.get("body") ?? "";
    expect(body).toContain("Jane Doe");
    expect(body).toContain("jane@example.com");
    expect(body).toContain("Hello there");
  });
});

describe("schedule compose", () => {
  it("uses the default schedule subject and body", () => {
    const p = params(buildScheduleCompose());
    expect(p.get("to")).toBe(site.email);
    expect(p.get("su")).toBe(site.mail.scheduleSubject);
    expect(p.get("body")).toBe(site.mail.scheduleBody);
  });
});

describe("compose targets", () => {
  it("never routes to Twitter or X", () => {
    const url = buildContactCompose({ name: "a", email: "b@c.com", message: "d" });
    expect(url.toLowerCase()).not.toContain("twitter");
    expect(url.toLowerCase()).not.toContain("x.com");
  });
});
