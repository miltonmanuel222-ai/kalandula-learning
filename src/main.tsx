import { StrictMode, Component, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by boundary:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Error details:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#FEE2E2', color: '#991B1B', minHeight: '100vh', fontFamily: 'monospace', fontSize: '14px' }}>
          <h2>⚠️ Algo correu mal</h2>
          <p>A aplicação encontrou um erro. Verifique o console para mais detalhes.</p>
          <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Detalhes do Erro</summary>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#FEF2F2', padding: '1rem', border: '1px solid #F87171', overflow: 'auto', maxHeight: '300px' }}>
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#EF4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Recarregar a página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
