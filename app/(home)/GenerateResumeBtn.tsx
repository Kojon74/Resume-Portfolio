"use client";
import React from "react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

const GenerateResumeBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/generate-resume");
  };

  return <Button title="Generate Resume" onClick={handleClick} />;
};

export default GenerateResumeBtn;
