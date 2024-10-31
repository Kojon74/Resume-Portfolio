"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

type Props = {};

const getProjects = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Projects", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get projects");
  }
};

const GenerateResume = (props: Props) => {
  const [projects, setProjects] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedExperienceAchievement, setSelectedExperienceAchievement] =
    useState({});

  useEffect(() => {
    (async () => {
      const { projects } = await getProjects();
      setProjects(projects);
    })();
  }, []);

  useEffect(() => {
    setSelectedExperienceAchievement(
      Object.fromEntries(
        projects.map((project: any) => [
          project._id,
          Array(project.achievements.length).fill(false),
        ])
      )
    );
  }, [projects]);

  const handleSelectExperience = (
    projectId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked)
      setSelectedExperiences((prev) => [...prev, projectId]);
    else
      setSelectedExperiences((prev) => prev.filter((id) => id !== projectId));
  };

  const handleSelectAchievements = (
    projectId: string,
    i: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedExperienceAchievement((prev) => ({
      ...prev,
      [projectId]: prev[projectId].map((x: boolean, j: number) =>
        i === j ? e.target.checked : x
      ),
    }));
  };

  const handleGeneratePDF = () => {
    console.log(selectedExperiences);
    console.log(selectedExperienceAchievement);
  };

  return (
    <div>
      <h1>Generate Resume</h1>
      <h2>Select relevant skills</h2>
      <h2>Select Work Experiences</h2>
      {projects.map((project: any) => (
        <>
          <Checkbox
            label={project.name}
            handleChange={(e) => handleSelectExperience(project._id, e)}
          />
          {project.achievements.map((achievement: any, i: number) => (
            <Checkbox
              key={i}
              label={achievement}
              handleChange={(e) => handleSelectAchievements(project._id, i, e)}
            />
          ))}
        </>
      ))}
      <h2>Select Technical Experience</h2>
      <Button title="Done" onClick={handleGeneratePDF} />
    </div>
  );
};

export default GenerateResume;
