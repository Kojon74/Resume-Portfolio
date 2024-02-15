"use client";
import React from "react";
import Button from "../components/Button";

type Props = {};

const AddExperienceBtn = (props: Props) => {
  return <Button title="Add Experience" type="link" href="/add-experience" />;
};

export default AddExperienceBtn;
