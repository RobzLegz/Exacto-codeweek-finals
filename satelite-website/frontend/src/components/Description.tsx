import Image from "next/image";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Description = () => {
  const [activeItem, setActiveItem] = useState<{
    title: string;
    images: string[];
    description: string;
  } | null>(null);

  return (
    <section className="w-full p-4 pb-20 md:p-20 flex flex-col gap-16 md:gap-36 z-20 bg-black/80">
      {activeItem ? (
        <div className="w-full h-screen overflow-y-auto fixed top-0 left-0 bg-black p-4 pt-20 md:pt-20 md:p-20">
          <button
            className="absolute top-4 right-4"
            onClick={() => {
              setActiveItem(null);
              document.body.style.overflow = "auto";
            }}
          >
            <XMarkIcon className="text-white h-12" />
          </button>

          <div className="flex flex-col md:flex-row md:gap-8 gap-4 md:items-end mb-4">
            {activeItem.images.length === 1 ? (
              <Image
                src={activeItem.images[0]}
                alt={activeItem.title}
                width={400}
                height={400}
                className="w-[400px] rounded-lg"
              />
            ) : activeItem.images.length > 1 ? (
              <div className="grid grid-cols-2 gap-2">
                {activeItem.images.map((img, i) => (
                  <Image
                    src={img}
                    alt={activeItem.title}
                    width={400}
                    height={400}
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : null}

            <h1 className="text-white text-2xl md:text-5xl">
              {activeItem.title}
            </h1>
          </div>

          <p className="text-gray-300 md:mt-8 whitespace-pre-line">
            {activeItem.description}
          </p>
        </div>
      ) : null}

      {data.map((item, i) => (
        <div
          className={`flex w-full items-center justify-center gap-4 md:gap-8 ${
            i % 2 === 0 ? "flex-col" : "flex-col-reverse"
          } md:flex-row`}
          key={i}
        >
          {i % 2 === 0 ? (
            item.images.length === 1 ? (
              <Image
                src={item.images[0]}
                alt={item.title}
                width={400}
                height={400}
                className="w-full max-w-[500px] lg:w-[400px] rounded-lg"
              />
            ) : item.images.length > 1 ? (
              <div className="grid grid-cols-2 gap-2">
                {item.images.map((img, i) => (
                  <Image
                    src={img}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : null
          ) : null}

          <div className="flex flex-col">
            <strong className="text-white text-3xl md:text-4xl max-w-[500px]">
              {item.title}
            </strong>

            <button
              className="w-48 h-12 rounded-full bg-black text-white border-2 border-white mt-6"
              onClick={() => {
                setActiveItem(item);
                document.body.style.overflow = "hidden";
              }}
            >
              Learn more
            </button>
          </div>

          {i % 2 !== 0 ? (
            item.images.length === 1 ? (
              <Image
                src={item.images[0]}
                alt={item.title}
                width={400}
                height={400}
                className="w-full max-w-[500px] lg:w-[400px] rounded-lg"
              />
            ) : item.images.length > 1 ? (
              <div className="grid grid-cols-2 gap-2">
                {item.images.map((img, i) => (
                  <Image
                    src={img}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-[200px] h-[200px] object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : null
          ) : null}
        </div>
      ))}
    </section>
  );
};

export default Description;

const dummyDescription = `In the fast-paced world of modern technology, 24/7 data collection and communication have become the lifeblood of our digital existence. This unceasing process is akin to a tireless sentinel, continuously monitoring, gathering, and disseminating information around the clock.

In a world where data is the new currency, our systems tirelessly work day and night, tirelessly sifting through the vast digital landscape to acquire valuable insights and information. These tireless digital sentinels are the backbone of businesses, governments, and individuals, ensuring that the flow of data is unbroken and relentless.

Around the clock, data collectors tirelessly track and record information from various sources, including sensors, devices, and online platforms. They meticulously capture and store data, ensuring that no fragment of information escapes their watchful eyes. It is as though they never sleep, perpetually alert to the digital universe's happenings.

Simultaneously, the communication networks remain fully operational, facilitating the rapid exchange of information. In this ever-connected world, data is transmitted seamlessly and instantaneously, bridging distances and allowing individuals and organizations to be in perpetual contact. It's as if there's a digital heartbeat that never stops, pulsating with the constant flow of data.

The 24/7 data collection and communication infrastructure is not only an integral part of our digital lives but also the driving force behind innovation and progress. It fuels the algorithms that make personalized recommendations, optimizes traffic flows, and even enables the swift response to emergencies. It is the life force of the information age, perpetually active and vigilant, ensuring the world never misses a beat.
`;

const data = [
  {
    title: "24/7 data collection & comunication",
    images: ["/resources/communication.jpg"],
    description: `
    Welcome to the future of satellite technology, where innovation meets efficiency. Our groundbreaking nanosatellite network redefines the way we observe and communicate with world. These compact marvels of engineering are not just cost-effective; they also offer capabilities comparable to their larger counterparts but at a fraction of their cost.

    Our nanosatellites are equipped with state-of-the-art sensors and advances imaging technology, enabling real-time, 24/7 capture and transmission of live data and imagery from any corner of the world.

    But what sets us apart from other satellite networks is the independence and security. Designed with governments and military in mind the satellites are compliant with all military standards and the European Space Agency standards. Our nanosatellites offer lifeline of communication that’s both reliable and resistant to jamming - crucial asset in times of conflict. While our primary clients are governments and military organizations, we also extend this unparalleled technology to other companies and private individuals.

    Experience the future with our nanosatellite network. Explore the limitless possibilities of data collection, sensor capabilities and independent communication. Join us in shaping a world where innovation meets accessibility.
    `,
  },
  {
    title: "Real-time 3D satelite geopositioning",
    images: ["/resources/3d-satelite-positioning.png"],
    description: `
    Step into the future of satellite technology with our groundbreaking independent nanosatellite network. We've redefined the boundaries of what's possible by delivering real-time, 24/7 live data and 3D positioning information—all without relying on traditional GPS satellites. In an age where jamming and disruptions can be significant concerns, our 3D positioning system sets a new standard. Through advanced triangulation, we can precisely determine the location of any object by measuring the distances between our ground stations and our satellites, as well as between the satellites themselves. This remarkable achievement is made possible by the implementation of a specialized chip on our satellites and ground stations, ensuring exceptional accuracy and reliability.

    Our 3D positioning data opens up a world of possibilities. It's invaluable for industries, governments, and individuals alike, providing essential location information for a wide range of applications. Whether you're tracking assets, managing logistics, or enhancing security, our nanosatellite network is here to empower your needs with real-time, dependable, and jam-resistant 3D positioning data. Welcome to the future of satellite technology.
    `,
  },
  {
    title: "Independent from other networks and entities",
    images: ["/resources/independence.jpg"],
    description: `
    Welcome to the future of satellite technology, where independence and innovation converge in our state-of-the-art nanosatellite network. Our satellites stand apart from all other networks, offering real-time, 24/7 communication and 3D positioning data without reliance on traditional GPS and telecommunication satellites, which can be susceptible to jamming.

    Our groundbreaking 3D positioning system leverages radio frequency signals and triangulation to accurately determine the location of any object. Unlike conventional systems, we have the flexibility to swiftly adapt and change frequencies in case of interference, ensuring uninterrupted communication and 3D positioning data. This resilience is made possible by the implementation of a special chip on both our satellites and ground stations.

    Our independent network is a game-changer, offering unparalleled data and positioning capabilities. Whether you're tracking assets, optimizing logistics, or ensuring robust communication, our system empowers you with dependable and jam-resistant technology. Embrace the future with us, and experience the true meaning of satellite independence and innovation.
    `,
  },
  {
    title: "Self-deorbiting mechanism",
    images: [
      "/resources/deorbiting.jpg",
      "/resources/deorbiting-1.jpg",
      "/resources/deorbiting-1.gif",
      "/resources/deorbiting.gif",
    ],
    description: `
    To comply with international law and military standards, our nanosatellites will feature a deorbitiation mechanism that will deorbit the satellite at the end of its lifespan. We understand the urgent need to address the issue of space debris, a growing concern in the realm of satellite technology. To align with the international law mandating all new satellites to have a deorbitation mechanism by 2030, we've implemented an innovative solution.

    Our deorbiting mechanism is achieved through a cutting-edge solar sail technology. At the end of a satellite's operational lifespan, this solar sail unfurls, providing a sustainable and efficient method for deorbiting the satellite, thus preventing the creation of additional space debris. This forward-thinking approach not only aligns with international legal requirements but also safeguards the integrity of our shared space environment for future generations.

    By integrating these deorbiting mechanisms into our nanosatellites, we aim to set a new standard for responsible satellite deployment. We invite you to be a part of our mission, where technology and environmental responsibility converge, ensuring the sustainability of our presence in outer space.
    `,
  },
];
