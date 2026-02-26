export default function ConfirmDialog({ title, message, onCancel, onConfirm }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-btns">
          <button className="btn-cancel" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn-confirm-del" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
