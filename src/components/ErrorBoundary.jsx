import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-card">
            <h2>Oups, quelque chose s'est mal passé</h2>
            <p>Une erreur inattendue est survenue. Rechargez la page pour réessayer.</p>
            <button
              className="btn-start"
              style={{ maxWidth: 260 }}
              onClick={() => window.location.reload()}
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
