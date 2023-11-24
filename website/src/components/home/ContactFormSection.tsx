import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ContactFormSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    await axios
      .post("/api/message", { name, email, message })
      .then((res) => {
        setEmail("");
        setName("");
        setMessage("");
        setLoading(false);
        alert("Ziņa nosūtīta");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });

    setLoading(false);
  };

  return (
    <section
      className="w-full py-20 flex flex-col items-center justify-center px-4 relative"
      id="contacts"
    >
      <div className="w-screen absolute h-full bg-black">
        <Image
          src="/images/space.jpg"
          alt="Space"
          width={2000}
          height={1000}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <strong className="text-white text-4xl z-10">Contact Us</strong>

      <form
        className="w-full flex flex-col gap-4 max-w-[600px] z-10 text-white mt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start justify-start gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="off"
            className="border-0 rounded-md h-12 bg-black/30 ring-1"
          />
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            autoComplete="off"
            className="border-0 rounded-md h-12 bg-black/30 ring-1"
          />
        </div>

        <div className="flex flex-col items-start justify-start gap-1">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="h-28 border-0 rounded-md bg-black/30 ring-1"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={!email || !name || !message || loading}
          className="bg-accent mt-2"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ContactFormSection;
