import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for analysis
  app.post("/api/analyze", (req, res) => {
    const { data } = req.body;
    // Simulate complex ML analysis
    // In a real app, this would process Excel/CSV data
    const anomalies = [
      { id: 1, type: "GST Variance", severity: "High", description: "Mismatch between GSTR-1 and GSTR-3B filings.", date: "2026-05-15" },
      { id: 2, type: "Duplicate Invoice", severity: "Medium", description: "Identified potential duplicate invoice (Inv: #8821).", date: "2026-05-14" },
      { id: 3, type: "Late Payment", severity: "Low", description: "Interest calculation missing for late tax settlement.", date: "2026-05-10" },
    ];
    
    res.json({
      status: "success",
      summary: {
        totalRecords: data?.length || 1500,
        anomaliesDetected: anomalies.length,
        complianceScore: 88,
      },
      anomalies
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AutoAudit Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
