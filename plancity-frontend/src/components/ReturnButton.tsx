import { useNavigate } from "react-router";

export function ReturnButton({
  fallback = "/",
  homeOnly = false,
}: {
  fallback?: string;
  homeOnly?: boolean;
}) {
  const navigate = useNavigate();

  const goBack = () => {
    if (!homeOnly && window.history.length > 1) navigate(-1);
    else navigate(fallback);
  };

  return (
    <button className="return-button" type="button" onClick={goBack}>
      <span aria-hidden="true">←</span>
      Volver
    </button>
  );
}
