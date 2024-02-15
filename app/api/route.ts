import { NextResponse } from "next/server";
import Project from "../(models)/Project";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const projectData = body.formData;
    await Project.create(projectData);
    return NextResponse.json({ message: "Project Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
