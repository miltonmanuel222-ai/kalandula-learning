import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Atualiza o state para que o próximo render mostre a UI de fallback.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            width: '100%'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: '#ef4444' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Oops! Algo deu errado.</h1>
            </div>
            
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              A aplicação encontrou um erro inesperado e não pôde continuar. 
              Por favor, partilhe a mensagem de erro abaixo com a equipa técnica para que possamos resolvê-lo rapidamente.
            </p>

            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1.5rem',
              overflowX: 'auto'
            }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#991b1b' }}>
                {this.state.error && this.state.error.toString()}
              </p>
              <pre style={{ margin: 0, fontSize: '0.85rem', color: '#7f1d1d', whiteSpace: 'pre-wrap' }}>
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: '#1c1d1f',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
                fontSize: '1rem'
              }}
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
