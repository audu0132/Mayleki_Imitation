import React from "react";

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-950 text-stone-200 flex items-center justify-center p-6 text-center">
          <div className="max-w-md">
            <h2 className="font-serif text-2xl text-gold mb-3">Something went wrong</h2>
            <p className="text-xs text-stone-400 mb-6">Our studio artisans are refreshing the boutique. Please reload or return home.</p>
            <button onClick={() => window.location.href = "/"} className="px-6 py-2.5 bg-gold text-stone-950 rounded-full text-xs font-semibold">
              Return to Boutique
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
