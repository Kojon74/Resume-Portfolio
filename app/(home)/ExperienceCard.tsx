import Image from "next/image";
import React from "react";
import ExperienceCardHeader from "./ExperienceCardHeader";
import ExperienceCardTags from "./ExperienceCardTags";

type Props = { experience: any };

const ExperienceCard = ({ experience }: Props) => {
  const {
    experienceTitle,
    company,
    companyURL,
    img,
    achievements,
    github,
    link,
    startDate,
    endDate,
    noEndDate,
    description,
    projectType,
    languages,
    libs,
  } = experience;

  return (
    <section>
      <Image src={img} alt="Error" />
      <div>
        <ExperienceCardHeader
          experienceTitle={experienceTitle}
          company={company}
          companyURL={companyURL}
        />
        <ExperienceCardTags tags={{ projectType, languages, libs }} />
        <p>{description}</p>
        <ul>
          {achievements.map((achievement: string) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperienceCard;
