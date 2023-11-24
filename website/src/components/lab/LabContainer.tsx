import Image from "next/image";
import Link from "next/link";
import React from "react";

const data = [
  {
    title: "Geometry",
    lessons: [
      {
        name: "Pythagorean Theorem",
        description: "Visualize how the Pythagorean theorem works",
        link: "pythagorean",
        image: "pythagorean.jpg",
      },
      {
        name: "Law of Cosines",
        description:
          "At least three given values are needed to calculate an arbitrary triangle.",
        image: "/lab/lcformula.gif",
      },
    ],
  },
  {
    title: "Mechanics",
    lessons: [
      {
        name: "Rotations Per Minute",
        description: "Uniform rotational motion",
        link: "rpm",
        image: "tire.png",
      },
      {
        name: "Gravity",
        description: "Visualize the gravitational attraction between objects",
        image: "https://cdn.mos.cms.futurecdn.net/jFaqrJF4ZpsL8u6iX4rtu7.jpg",
      },
      {
        name: "Frictional Force",
        description: "Simulation of sliding friction",
        image:
          "https://images.collegedunia.com/public/image/2788fe1d3551eb91bd2a2e6283831b90.webp?tr=w-790,h-436,c-force",
      },
      {
        name: "Kinetic and Potential Energy",
        description: "Law of conservation of energy",
        image:
          "https://sciencenotes.org/wp-content/uploads/2017/04/rollercoaster.png",
      },
      {
        name: "Momentum",
        description:
          "The law of conservation of momentum holds in closed systems",
        image:
          "https://schooltutoring.com/scholarship/wp-content/uploads/sites/8/2012/11/Impulse-Theorem1.jpg",
      },
    ],
  },
  {
    title: "Thermodynamics",
    lessons: [
      {
        name: "Fundamental Principles of Thermodynamics",
        description:
          "Familiarize yourself with the fundamental principles of thermodynamics and their significance in physics.",
        image:
          "https://img.jagranjosh.com/imported/images/E/Articles/WBJEE_Thermodynamics_2018_media.jpg",
      },
      {
        name: "Methods of Heat Transfer",
        description:
          "Learn about the methods of heat transfer and their applications in everyday life.",
        image:
          "https://www.simscale.com/wp-content/uploads/2020/04/heat-transfer-methods-1.jpg",
      },
      {
        name: "Thermodynamic Processes",
        description:
          "Study various thermodynamic processes and their characteristic parameters.",
        image:
          "https://cdn1.byjus.com/wp-content/uploads/2020/09/Thermodynamic-Processes-Types-1.png",
      },
      {
        name: "Thermochemistry",
        description:
          "Get acquainted with the basic concepts of thermochemistry and reaction heat.",
        image:
          "https://chm2046l.weebly.com/uploads/5/1/7/1/51712757/569802_orig.jpg",
      },
    ],
  },
  {
    title: "Optics",
    lessons: [
      {
        name: "Propagation of Light",
        description:
          "Explore how light waves propagate and interact with the environment.",
        image:
          "https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-3-031-04477-9_1/MediaObjects/486621_1_En_1_Fig3_HTML.png",
      },
      {
        name: "Lenses and Refraction",
        description:
          "Learn about lenses and their impact on the refraction of light.",
        image: "https://www.advancedoptics.com/images/convex-lens.jpg",
      },
      {
        name: "Color Perception",
        description:
          "Discover how the human eye perceives colors and the structure of the color spectrum.",
        image:
          "https://static.sciencelearn.org.nz/images/images/000/000/037/embed/LIS_SCI_ART_02_Colours_of_light_visible_spectrum_waves_v3.jpg?1674163610",
      },
      {
        name: "Optical Instruments",
        description:
          "Familiarize yourself with various optical instruments and their applications.",
        image:
          "https://cdn1.byjus.com/wp-content/uploads/2022/10/Optical-Instruments-3.png",
      },
    ],
  },
  {
    title: "Electromagnetism",
    lessons: [
      {
        name: "Electromagnetic Waves",
        description:
          "Study electromagnetic waves and their characteristic parameters.",
        image:
          "https://cdn.britannica.com/75/95275-050-5FC96002/Radio-waves-rays-light-gamma-ultraviolet-electromagnetic.jpg",
      },
      {
        name: "Electric Current and Magnetic Fields",
        description: "Learn how electric current generates magnetic fields.",
        image:
          "https://cdn.kastatic.org/ka-perseus-images/e054e72409bf49e89333954ec8931f998dc4a148.svg",
      },
      {
        name: "Electromagnetic Induction",
        description:
          "Get to know the phenomenon of electromagnetic induction and its applications.",
        image:
          "https://www.sciencefacts.net/wp-content/uploads/2021/09/Electromagnetic-Induction.jpg",
      },
      {
        name: "Maxwell's Equations",
        description:
          "Explore Maxwell's equations and their significance in electromagnetism.",
        image:
          "https://miro.medium.com/v2/resize:fit:336/1*db0LuwdYFFVEqHh0coMbsA.jpeg",
      },
    ],
  },
];

const LabContainer = () => {
  return (
    <div className="flex flex-col w-full pt-40">
      <h1 className="text-4xl mb-4">Understand how things work 👀</h1>

      {data.map((topic, i) => (
        <div className="flex flex-col mt-6" key={i}>
          <h3 className="text-2xl mb-2">{topic.title}</h3>

          <div className="w-full h-full grid grid-cols-4 gap-2">
            {topic.lessons.map((item, j) =>
              item.link ? (
                <Link href={`/lab/${item.link}`} key={j}>
                  <div className="w-full bg-white p-2 rounded-lg border shadow-lg flex flex-col items-center justify-start text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                    {item.image && (
                      <Image
                        src={`/lab/${item.image}`}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="h-20 object-contain w-full"
                      />
                    )}

                    <strong className="text-lg mt-2">{item.name}</strong>

                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </Link>
              ) : (
                <div className="w-full bg-white p-2 rounded-lg relative border shadow-lg flex flex-col items-center justify-start text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                  <div className="absolute w-full h-full top-0 left-0 bg-white/60 flex items-end p-2 justify-center ">
                    <p className="text-gray-500 text-xl">Comming soon</p>
                  </div>

                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="h-20 object-contain w-full"
                    />
                  )}

                  <strong className="text-lg mt-2">{item.name}</strong>

                  <p className="text-gray-400">{item.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      ))}

      <div></div>
    </div>
  );
};

export default LabContainer;
