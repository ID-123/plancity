import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // En una aplicación real, aquí se enviaría el error a observabilidad.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fatal-error">
          <h1>Algo salió mal</h1>
          <p>La interfaz encontró un error inesperado.</p>
          <button className="button" onClick={() => window.location.reload()}>
            Recargar aplicación
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
