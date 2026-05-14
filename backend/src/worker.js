// backend/src/index.js - Cloudflare Workers with Fetch API

export default {
  async fetch(request, env, ctx) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "3600",
        },
      });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;

      // CORS headers for all responses
      const corsHeaders = {
        "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      };

      // Health check
      if (path === "/health") {
        return new Response(
          JSON.stringify({
            status: "ok",
            timestamp: new Date().toISOString(),
            environment: env.ENVIRONMENT || "development",
          }),
          { status: 200, headers: corsHeaders },
        );
      }

      // Routes
      if (path.startsWith("/api/auth")) {
        return handleAuth(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/newborns")) {
        return handleNewborns(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/vaccinations")) {
        return handleVaccinations(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/growth")) {
        return handleGrowth(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/consultations")) {
        return handleConsultations(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/prescriptions")) {
        return handlePrescriptions(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/billing")) {
        return handleBilling(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/smartcards")) {
        return handleSmartcards(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/notifications")) {
        return handleNotifications(request, env, path, method, corsHeaders);
      }

      if (path.startsWith("/api/analytics")) {
        return handleAnalytics(request, env, path, method, corsHeaders);
      }

      // 404
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Route not found",
          path,
        }),
        { status: 404, headers: corsHeaders },
      );
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(
        JSON.stringify({
          status: "error",
          message: error.message || "Internal server error",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }
  },

  async scheduled(event, env, ctx) {
    // Scheduled tasks for D1 maintenance
    console.log("Scheduled task executed");
  },
};

// ============ ROUTE HANDLERS ============

async function handleAuth(request, env, path, method, corsHeaders) {
  try {
    if (method === "POST" && path === "/api/auth/register") {
      const body = await request.json();
      // TODO: Implement register logic with D1
      return new Response(
        JSON.stringify({ status: "success", message: "Register endpoint" }),
        { status: 201, headers: corsHeaders },
      );
    }

    if (method === "POST" && path === "/api/auth/login") {
      const body = await request.json();
      // TODO: Implement login logic with D1
      return new Response(
        JSON.stringify({ status: "success", message: "Login endpoint" }),
        { status: 200, headers: corsHeaders },
      );
    }

    if (method === "POST" && path === "/api/auth/refresh") {
      // TODO: Implement refresh token logic
      return new Response(
        JSON.stringify({ status: "success", message: "Refresh endpoint" }),
        { status: 200, headers: corsHeaders },
      );
    }

    return new Response(
      JSON.stringify({ status: "error", message: "Auth endpoint not found" }),
      { status: 404, headers: corsHeaders },
    );
  } catch (error) {
    return errorResponse(error, corsHeaders);
  }
}

async function handleNewborns(request, env, path, method, corsHeaders) {
  try {
    // GET /api/newborns
    if (method === "GET" && path === "/api/newborns") {
      return new Response(JSON.stringify({ status: "success", data: [] }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // POST /api/newborns
    if (method === "POST" && path === "/api/newborns") {
      const body = await request.json();
      return new Response(
        JSON.stringify({ status: "success", message: "Newborn created" }),
        { status: 201, headers: corsHeaders },
      );
    }

    // GET /api/newborns/:id
    const match = path.match(/^\/api\/newborns\/([a-z0-9-]+)$/);
    if (method === "GET" && match) {
      const id = match[1];
      return new Response(JSON.stringify({ status: "success", data: { id } }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // PUT /api/newborns/:id
    if (method === "PUT" && match) {
      const id = match[1];
      const body = await request.json();
      return new Response(
        JSON.stringify({ status: "success", message: "Newborn updated" }),
        { status: 200, headers: corsHeaders },
      );
    }

    // DELETE /api/newborns/:id
    if (method === "DELETE" && match) {
      const id = match[1];
      return new Response(
        JSON.stringify({ status: "success", message: "Newborn deleted" }),
        { status: 200, headers: corsHeaders },
      );
    }

    return new Response(
      JSON.stringify({
        status: "error",
        message: "Newborn endpoint not found",
      }),
      { status: 404, headers: corsHeaders },
    );
  } catch (error) {
    return errorResponse(error, corsHeaders);
  }
}

async function handleVaccinations(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Vaccinations endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

async function handleGrowth(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Growth endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

async function handleConsultations(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Consultations endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

async function handlePrescriptions(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Prescriptions endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

async function handleBilling(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Billing endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

async function handleSmartcards(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Smartcards endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

async function handleNotifications(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Notifications endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

async function handleAnalytics(request, env, path, method, corsHeaders) {
  return new Response(
    JSON.stringify({ status: "success", message: "Analytics endpoint" }),
    { status: 200, headers: corsHeaders },
  );
}

// ============ HELPERS ============

function errorResponse(error, corsHeaders) {
  console.error("Error:", error);
  return new Response(
    JSON.stringify({
      status: "error",
      message: error.message || "Internal server error",
    }),
    { status: 500, headers: corsHeaders },
  );
}
