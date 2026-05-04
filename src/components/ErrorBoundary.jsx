import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-light)', padding: '20px' }}>
          <div className="card" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚠️</div>
            <h2 style={{ marginBottom: '10px' }}>Something went wrong</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              style={{ width: '100%', padding: '15px' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;