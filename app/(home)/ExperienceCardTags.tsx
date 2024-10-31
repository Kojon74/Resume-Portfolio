import React from "react";

type Props = {
  tags: { languages: string[]; projectType: string[]; libs: string[] };
};

const ExperienceCardTags = ({ tags }: Props) => {
  return (
    <section>
      {Object.keys(tags).map((tagType: string) =>
        tags[tagType].map((tag: string) => <p key={tag}>{tag}</p>)
      )}
    </section>
  );
};

export default ExperienceCardTags;
