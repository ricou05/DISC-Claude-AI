import { fullName } from "../../utils/helpers";
import FullResult from "../FullResult";

export default function ResultModal({
  viewingResult,
  groups,
  onShareParticipant,
  onClose,
}) {
  if (!viewingResult) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`R\u00e9sultat de ${fullName(viewingResult)}`}
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h3>R&eacute;sultat — {fullName(viewingResult)}</h3>
            <p>
              {new Date(viewingResult.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}{" "}
              ·{" "}
              {groups.find((g) => g.id === viewingResult.team_id)?.name ||
                "Sans groupe"}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              className="btn-sm green"
              onClick={() => onShareParticipant(viewingResult)}
            >
              &#x1F517; Partager
            </button>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Fermer"
            >
              &#x2715;
            </button>
          </div>
        </div>
        <div className="modal-body">
          <FullResult participant={viewingResult} />
        </div>
      </div>
    </div>
  );
}
