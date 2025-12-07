// Mock for next/server in jsdom test environment
// This is needed because next-auth tries to import next/server

export class NextRequest extends Request {
  public nextUrl: URL;

  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init);
    this.nextUrl = new URL(
      typeof input === "string"
        ? input
        : input instanceof URL
        ? input.href
        : input.url
    );
  }

  get cookies() {
    return {
      get: () => undefined,
      getAll: () => [],
      set: () => {},
      delete: () => {},
      has: () => false,
    };
  }

  get geo() {
    return {};
  }

  get ip() {
    return undefined;
  }
}

export class NextResponse extends Response {
  static json(body: unknown, init?: ResponseInit) {
    const response = new NextResponse(JSON.stringify(body), {
      ...init,
      headers: {
        ...init?.headers,
        "content-type": "application/json",
      },
    });
    return response;
  }

  static next(init?: ResponseInit) {
    return new NextResponse(null, { ...init, status: init?.status ?? 200 });
  }

  static redirect(url: string | URL, status = 302) {
    const urlString = typeof url === "string" ? url : url.href;
    return new NextResponse(null, {
      status,
      headers: { Location: urlString },
    });
  }

  static rewrite(url: string | URL) {
    return new NextResponse(null, {
      headers: {
        "x-middleware-rewrite": typeof url === "string" ? url : url.href,
      },
    });
  }

  get cookies() {
    return {
      get: () => undefined,
      getAll: () => [],
      set: () => this,
      delete: () => this,
    };
  }
}

export { NextRequest as default };
