import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./support/ErrorBoundary";
import "./styles.css";

const renderFatalError = (message: string) => {
  const existing = document.getElementById("fatal-error");
  if (existing) {
    existing.textContent = message;
    return;
  }

  const container = document.createElement("div");
  container.id = "fatal-error";
  container.className = "fatal";
  container.innerHTML = `
    <div class="fatal__panel">
      <p class="fatal__eyebrow">App crash</p>
      <h1>Wizard101 Guide failed to load.</h1>
      <p>${message}</p>
      <p class="fatal__hint">Check your connection and refresh. If the issue persists, open the browser console for details.</p>
    </div>
  `;

  document.body.prepend(container);
};

window.addEventListener("error", (event) => {
  const message = event?.error?.message ?? event.message ?? "An unknown error occurred.";
  renderFatalError(message);
});

window.addEventListener("unhandledrejection", (event) => {
  const reason =
    typeof event.reason === "string"
      ? event.reason
      : event.reason?.message ?? "An unknown promise rejection occurred.";
  renderFatalError(reason);
});

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Make sure index.html has a div#root.");
}
