import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { formatDate, formatXDate } from "../../utils/formatDate";

const spotloc_api_key = process.env.NEXT_PUBLIC_SPOTLOC_API_KEY;
const spotloc_api_url = process.env.NEXT_PUBLIC_SPOTLOC_API_URL;

const EventsSection = () => {
  const [events, setEvents] = useState<any[] | null>(null);

  const requestSent = useRef(false);

  useEffect(() => {
    if (events || requestSent.current) {
      return;
    }

    requestSent.current = true;

    getEventsFunc();
  }, []);

  const getEventsFunc = async () => {
    if (!spotloc_api_url || !spotloc_api_key) {
      return;
    }

    await axios
      .get(
        `${spotloc_api_url}/api/web/events/get_developer_events?take=6&skip=0&apiKey=${spotloc_api_key}`
      )
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (events && events.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full py-20 flex flex-col items-center justify-center"
      id="events"
    >
      <strong className="text-black text-4xl">Events</strong>

      {events ? (
        <div className="blog_container">
          {events.map((event, i) => (
            <Link
              href={`https://spotloc.lv/pasakums/${event.event_url}`}
              target="_blank"
              rel="noreferer"
              key={i}
            >
              <div className="blog_item">
                {event.cover?.src ? (
                  <Image
                    src={event.cover.src}
                    alt={event.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-60 rounded-sm"
                  />
                ) : (
                  <div className="w-full h-60 rounded-sm bg-gray-100" />
                )}

                <div className="p-4 flex flex-col items-start justify-start">
                  <strong>{event.title}</strong>

                  <strong className="text-accent">
                    {formatDate(event.start_date) !== formatDate(event.end_date)
                      ? `${formatXDate(event.start_date)} - ${formatXDate(
                          event.end_date
                        )}`
                      : formatXDate(event.start_date)}
                  </strong>
                  <p>
                    {event.info.join(" ").length > 100
                      ? `${event.info.join(" ").substring(0, 100)}...`
                      : event.info.join(" ")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="blog_container">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <div className="blog_item" key={i}>
              <div className="w-full h-60 rounded-sm bg-gray-100" />

              <div className="p-4 flex flex-col items-start justify-start w-full">
                <div className="bg-gray-200 w-full max-w-[200px] h-6" />
                <div className="bg-gray-200 w-full max-w-[240px] h-3 mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="https://spotloc.lv/kategorija/zinatne"
        target="_blank"
        rel="noreferer"
        className="w-full max-w-[200px] py-2 border-accent border-2 text-center mt-8 text-lg"
      >
        See more
      </Link>
    </section>
  );
};

export default EventsSection;
