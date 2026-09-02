import { useNavigate } from "react-router";

export function ReturnButton({ fallback = "/" }: { fallback?: string }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(fallback);
  };

  return (
    <button className="return-button" type="button" onClick={goBack}>
      <span aria-hidden="true">←</span>
      Volver
    </button>
  );
}
