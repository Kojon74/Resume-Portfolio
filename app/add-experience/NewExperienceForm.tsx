"use client";
import { ChangeEvent, MouseEvent, useState } from "react";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import MultiDropdown from "../components/MultiDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

type FormData = {
  name: string;
  expType: { type: ExpTypes | string; name?: string; url?: string };
  img: string;
  summary: string;
  achievements: string[];
  github: string;
  projTypes: string[];
  languages: string[];
  libs: string[];
};

enum ExpTypes {
  WORK = "Work Experience",
  HACKATHON = "Hackathon",
  PERSONAL = "Personal Project",
  CLASS = "Class Project",
  EXTRA = "Extracurricular",
}

const EXP_TYPE_NAME = {
  [ExpTypes.WORK]: "Company",
  [ExpTypes.HACKATHON]: "Hackathon",
  [ExpTypes.CLASS]: "Class",
  [ExpTypes.EXTRA]: "Extracurricular",
};

const PROJECT_TYPES = [
  "Full Stack",
  "Frontend",
  "Backend",
  "Machine Learning",
  "Data Science",
  "Embedded Systems",
];

const PROGRAMMING_LANGUAGES = [
  "Python",
  "JavaScript",
  "Java",
  "C#",
  "Swift",
  "C",
  "Matlab",
  "TypeScript",
  "HTML",
  "CSS",
  "SQL",
];

const LIBRARIES_FRAMEWORKS = [
  "React",
  "React Native",
  "Next.js",
  "Express.js",
  "Node.js",
  "Jest",
  "TensorFlow",
  "Keras",
];

const TOOLS_TECHNOLOGIES = ["Firebase", "AWS", "GCP", "GitHub"];

const NewExperienceForm = () => {
  const defaultFormData: FormData = {
    name: "",
    expType: { type: "" },
    img: "",
    summary: "",
    achievements: [""],
    github: "",
    projTypes: [],
    languages: [],
    libs: [],
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleAddAchievement = (
    e: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i?: number
  ) => {
    const name = e.target.name;
    const value =
      name === "achievements" && i !== undefined
        ? formData.achievements.map((achievement, j) =>
            j === i ? e.target.value : achievement
          )
        : e.target.value;
    if (name in ["expName", "expURL"])
      setFormData((prev) => ({
        ...prev,
        expType: { ...prev.expType, [name]: value },
      }));
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectExp = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { type: value },
    }));
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: [...prev[name], value] }));
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form className="flex flex-col items-center">
      <div className="form-input flex">
        <Dropdown
          name="expType"
          title="Experience type"
          items={Object.values(ExpTypes)}
          value={formData.expType.type}
          onSelect={handleSelectExp}
        />
        {formData.expType.type in EXP_TYPE_NAME && (
          <input
            className="input ml-2 w-full"
            placeholder={`${EXP_TYPE_NAME[formData.expType.type]} name`}
            name="expName"
            value={formData.expType.name}
            onChange={handleChange}
          />
        )}
      </div>
      {formData.expType.type in EXP_TYPE_NAME && (
        <input
          className="form-input input"
          placeholder={`${EXP_TYPE_NAME[formData.expType.type]} URL`}
          name="expURL"
          value={formData.expType.url}
          onChange={handleChange}
        />
      )}
      <input
        className="form-input input"
        placeholder="Experience name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        className="form-input textarea"
        placeholder="Short summary of this experience"
        name="summary"
        value={formData.summary}
        onChange={handleChange}
      />
      {formData.achievements.map((achievement, i) => (
        <input
          key={i}
          className="form-input input"
          placeholder={`Achievement #${i + 1}`}
          name="achievements"
          value={achievement}
          onChange={(e) => handleChange(e, i)}
        />
      ))}
      <button className="btn my-1" onClick={handleAddAchievement}>
        <FontAwesomeIcon icon={faPlus} /> Add achievement
      </button>
      <div className="form-input">
        <MultiDropdown
          name="projTypes"
          title="Project Type"
          items={PROJECT_TYPES}
          values={formData.projTypes}
          onSelect={handleMultiSelect}
        />
      </div>
      {!!formData.projTypes.length && (
        <div className="form-input">
          {formData.projTypes.map((projType) => (
            <div key={projType} className="btn mr-2">
              {projType} <FontAwesomeIcon icon={faXmark} />
            </div>
          ))}
        </div>
      )}
      <div className="form-input">
        <MultiDropdown
          name="languages"
          title="Programming Languages"
          items={PROGRAMMING_LANGUAGES}
          values={formData.languages}
          onSelect={handleMultiSelect}
        />
      </div>
      {!!formData.languages.length && (
        <div className="form-input">
          {formData.languages.map((lang) => (
            <div key={lang} className="btn mr-2">
              {lang} <FontAwesomeIcon icon={faXmark} />
            </div>
          ))}
        </div>
      )}
      <div className="form-input">
        <MultiDropdown
          name="libs"
          title="Libraries and Frameworks"
          items={LIBRARIES_FRAMEWORKS}
          values={formData.libs}
          onSelect={handleMultiSelect}
        />
      </div>
      {!!formData.libs.length && (
        <div className="form-input">
          {formData.libs.map((lib) => (
            <div key={lib} className="btn mr-2">
              {lib} <FontAwesomeIcon icon={faXmark} />
            </div>
          ))}
        </div>
      )}
      <label className="form-input form-control w-full">
        <div className="label">
          <span className="label-text">Add media</span>
        </div>
        <input type="file" className="file-input file-input-bordered w-full" />
      </label>
      <Button title="Submit" onClick={handleSubmit} />
    </form>
  );
};

export default NewExperienceForm;
