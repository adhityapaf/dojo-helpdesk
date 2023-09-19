"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title,
      body,
      priority,
      user_email: "adhitya@netninja.dev",
    };
    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          name="priority"
          id="priority"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button className="btn-primary" disabled={isLoading}>
          {isLoading && <span>Adding...</span>}
          {!isLoading && <span>Add Ticket</span>}
        </button>
      </label>
    </form>
  );
}
