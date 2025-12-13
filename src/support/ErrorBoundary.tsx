import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  error?: Error;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="page">
          <section className="panel">
            <h1>Something went wrong</h1>
            <p>We couldn't render the guide. Check the console for details and please try again.</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

