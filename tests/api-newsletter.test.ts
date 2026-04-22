import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { POST } from "@/app/api/newsletter/route";

function buildRequest(body: string | object): Request {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
  });
}

describe("POST /api/newsletter", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("returns 200 for a valid email", async () => {
    const response = await POST(
      buildRequest({ email: "andreas@example.com" }),
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });

  it("returns 400 with fieldErrors.email for invalid email", async () => {
    const response = await POST(
      buildRequest({ email: "not-an-email" }),
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(Array.isArray(body.fieldErrors?.email)).toBe(true);
    expect(body.fieldErrors.email.length).toBeGreaterThan(0);
  });

  it("returns 200 but logs dropped:honeypot when website is filled", async () => {
    const response = await POST(
      buildRequest({
        email: "andreas@example.com",
        website: "http://spam",
      }),
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);

    const honeypotCall = logSpy.mock.calls.find((call: unknown[]) => {
      try {
        const parsed = JSON.parse(String(call[0]));
        return parsed.dropped === "honeypot";
      } catch {
        return false;
      }
    });
    expect(honeypotCall).toBeDefined();
  });
});
