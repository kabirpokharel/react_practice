import { useState } from "react";
import { InfniteScroll } from "../public/index.js";

interface ProjectId {
  projectId: number;
}

const GetProject = (props: ProjectId) => {
  const { projectId } = props;

  switch (projectId) {
    case 1:
      return <InfniteScroll />;
    default:
      return <InfniteScroll />;
  }
};
function App() {
  const [projectId, setProjectID] = useState(0);

  return (
    <div>
      <GetProject {...{ projectId }} />
    </div>
  );
}

export default App;
