import { Outlet } from "react-router";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { useEffect, useState } from "react";

export function Layout() {
  const [toast, setToast] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      setToast(message);
      window.setTimeout(() => setToast(""), 3500);
    };
    window.addEventListener("plancity:toast", handler);
    return () => window.removeEventListener("plancity:toast", handler);
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
      <Footer />
    </div>
  );
}
