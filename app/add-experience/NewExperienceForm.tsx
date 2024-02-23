"use client";
import { ChangeEvent, MouseEvent, useState } from "react";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import MultiDropdown from "../components/MultiDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import Image from "next/image";

type FormData = {
  name: string;
  expType: { type: ExpTypes | string; name?: string; url?: string };
  startDate: string;
  endDate: string;
  noEndDate: boolean;
  media: File[];
  summary: string;
  achievements: string[];
  github: string;
  link: string;
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
    startDate: "",
    endDate: "",
    noEndDate: false,
    media: [],
    summary: "",
    achievements: [""],
    github: "",
    link: "",
    projTypes: [],
    languages: [],
    libs: [],
  };

  const router = useRouter();

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
    let value: any;
    switch (name) {
      case "achievements":
        if (i !== undefined)
          value = formData.achievements.map((achievement, j) =>
            j === i ? e.target.value : achievement
          );
        break;
      case "media":
        value = [...formData.media, ...e.target.files];
        e.target.value = "";
        break;
      default:
        value = e.target.value;
    }
    if (["expName", "expURL"].includes(name))
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

  const handleToggle = () => {
    const newVal = !formData.noEndDate;
    if (newVal)
      setFormData((prev) => ({
        ...prev,
        endDate: "",
        noEndDate: newVal,
      }));
    else setFormData((prev) => ({ ...prev, noEndDate: newVal }));
  };

  const handleRemoveImage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    i: number
  ) => {
    e.preventDefault();
    console.log(formData.media.filter((_, j) => j !== i));
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, j) => j !== i),
    }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Upload images and get urls
    const mediaURLs: string[] = await Promise.all(
      formData.media.map((media, i) => uploadMedia(formData.name, i, media))
    );
    const res = await fetch("/api/Projects", {
      method: "POST",
      body: JSON.stringify({ formData: { ...formData, media: mediaURLs } }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to create new project.");

    router.refresh();
    router.push("/");
  };

  const uploadMedia = async (name: string, i: number, media: File) => {
    const storageRef = ref(storage, `${name}/${media.name}`);
    await uploadBytes(storageRef, media);
    const url = await getDownloadURL(storageRef);
    return url;
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
      <div className="w-full max-w-lg flex">
        <div className="flex-1">
          <p>Start Date</p>
          <input
            className="form-input input w-auto"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <p>End Date</p>
          <input
            className="form-input input w-auto"
            type="date"
            name="endDate"
            value={formData.endDate}
            disabled={formData.noEndDate}
            onChange={handleChange}
          />
          <label className="label cursor-pointer justify-start p-0">
            <input
              type="checkbox"
              checked={formData.noEndDate}
              className="checkbox mr-3"
              onClick={handleToggle}
            />
            <span className="label-text">Present</span>
          </label>
        </div>
      </div>
      <input
        className="form-input input"
        placeholder="GitHub"
        name="github"
        value={formData.github}
        onChange={handleChange}
      />
      <input
        className="form-input input"
        placeholder="Link"
        name="link"
        value={formData.link}
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
      <label className="form-input">
        <div className="label">
          <span className="label-text">Add media</span>
        </div>
        <input
          name="media"
          type="file"
          multiple
          className="file-input w-full"
          onChange={handleChange}
        />
      </label>
      <div className="w-full max-w-lg flex flex-wrap justify-between">
        {formData.media.map((media, i) => (
          <div
            key={i}
            className="h-40 w-40 relative rounded-md overflow-hidden my-1"
          >
            <Image
              src={URL.createObjectURL(media)}
              alt="alt"
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
            <button
              onClick={(e) => handleRemoveImage(e, i)}
              className="opacity-0 hover:opacity-100 flex hover:cursor-pointer absolute left-0 top-0 h-full w-full  justify-center items-center bg-slate-500 bg-opacity-50"
            >
              <FontAwesomeIcon icon={faTrash} className="text-red-400" />
            </button>
          </div>
        ))}
      </div>
      <Button title="Submit" onClick={handleSubmit} />
    </form>
  );
};

export default NewExperienceForm;
