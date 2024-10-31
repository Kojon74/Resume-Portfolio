import React from "react";

type Props = {
  data: any;
  expChecked: boolean;
  setExpChecked: any;
  achievementChecked: boolean[];
  setAchievementChecked;
};

const Experience = ({
  data,
  expChecked,
  setExpChecked,
  achievementChecked,
  setAchievementChecked,
}: Props) => {
  return (
    <div>
      <input type="checkbox" checked={expChecked} className="checkbox" />
      <h5>{data.expType.expName}</h5>
      <h6>{data.name}</h6>
      {data.achievements.map((achievement: string, i: number) => (
        <div key={i}>
          <input
            type="checkbox"
            checked={achievementChecked[i]}
            className="checkbox"
          />
          <p>{achievement}</p>
        </div>
      ))}
    </div>
  );
};

export default Experience;
