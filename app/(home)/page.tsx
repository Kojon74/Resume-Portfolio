import Image from "next/image";
import Dropdown from "../components/Dropdown";
import projects from "@/projects";
import GenerateResumeBtn from "./GenerateResumeBtn";

type ProjectsType = {
  name: string;
  expType: { type: string; company?: string; companyURL: string };
  img: string;
  tags: string[];
  description: string;
}[];

export default function Home() {
  return (
    <main className="mx-10">
      <h1 className="text-3xl text-center">Ken Johnson</h1>
      <GenerateResumeBtn />
      <h1 className="text-3xl text-center">Technical Experience</h1>
      <Dropdown
        title="Experience Type"
        items={[
          "Work Experience",
          "Extracurricular",
          "Hackathon",
          "Personal Project",
          "Class Project",
        ]}
      />
      <Dropdown
        title="Project Type"
        items={[
          "Machine Learning",
          "Data Science",
          "Full Stack",
          "Frontend",
          "Backend",
        ]}
      />
      <Dropdown
        title="Programming Language"
        items={["Python", "JavaScript", "Java"]}
      />

      {projects.map(({ name, expType, img, tags, desc, details }) => (
        <div className="collapse bg-base-200 my-5" key={name}>
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title">
            <Image
              src={img}
              alt="Project Image"
              width={300}
              height={300}
              className="float-left mr-5"
            />
            <div className="flex-1">
              <h2 className="text-xl">{name}</h2>
              <h2>
                {expType.type}{" "}
                {expType.company && (
                  <>
                    - <a href={expType.companyURL}>{expType.company}</a>
                  </>
                )}
              </h2>
              {tags.map((tagName) => (
                <p className="inline pr-2" key={tagName}>
                  {tagName}
                </p>
              ))}
              <p className="text-slate-400">{desc}</p>
            </div>
          </div>
          <div className="collapse-content">
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
