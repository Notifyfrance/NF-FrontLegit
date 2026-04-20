import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUsernameSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().replace(/^@/, "");
    if (!trimmed) return;
    navigate(`/${encodeURIComponent(trimmed)}`);
  };

  return { query, setQuery, onSubmit };
}
