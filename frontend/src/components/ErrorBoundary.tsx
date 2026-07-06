import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-primary)' }}>
          <h2 style={{ color: 'var(--accent-danger)', marginBottom: '1rem' }}>Something went wrong.</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>We're sorry, an unexpected error occurred.</p>
          {this.state.error && (
             <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', textAlign: 'left', overflowX: 'auto' }}>
               <code>{this.state.error.toString()}</code>
             </div>
          )}
          <button 
            className="btn btn-primary"
            style={{ marginTop: '2rem' }}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
