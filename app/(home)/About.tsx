import Image from "next/image";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <section className="h-screen">
      <Image />
      <h1>Hi, I'm Ken</h1>
      <h2>
        I am a software developer passionate about full-stack development and
        machine learning.
      </h2>
    </section>
  );
};

export default About;
