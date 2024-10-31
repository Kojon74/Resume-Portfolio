import React from "react";

type Props = { experienceTitle: string; company?: string; companyURL?: string };

const ExperienceCardHeader = ({
  experienceTitle,
  company,
  companyURL,
}: Props) => {
  return (
    <h2>
      {experienceTitle}
      {company && (
        <h2>
          {" | "}
          <a href={companyURL}>{company}</a>
        </h2>
      )}
    </h2>
  );
};

export default ExperienceCardHeader;
