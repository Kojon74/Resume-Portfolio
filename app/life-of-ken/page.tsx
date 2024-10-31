import Image from "next/image";
import React from "react";

type EntriesType = { img: string; title: string; desc: string }[];

const page = () => {
  const entries: EntriesType = [];

  return (
    <section>
      <h1>Beautiful Life of Ken</h1>
      <p>A collection of my favorite memories</p>
      {entries.map(({ img, title, desc }) => (
        <div key={title}>
          <Image src={img} alt="Error" />
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      ))}
    </section>
  );
};

export default page;
