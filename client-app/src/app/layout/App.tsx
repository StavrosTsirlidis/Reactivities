import { useEffect } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import agent from "../../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import Homepage from "../../features/home/homepage";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    agent.Activities.list();
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="loading" />;
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/activities" element={<ActivityDashBoard />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
