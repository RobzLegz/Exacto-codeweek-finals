import React from "react";
import PageModule from "../../PageModule";
import PythagoreanContainer from "../../../components/lab/pythagorean/PythagoreanContainer";

const Pythagorean = () => {
  return (
    <PageModule
      title="Pythagorean | Exacto Lab"
      description="Vizualizē pitagora teorēmu"
    >
      <PythagoreanContainer />
    </PageModule>
  );
};

export default Pythagorean;
