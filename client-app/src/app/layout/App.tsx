import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import {v4 as uuid} from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((respone) => {
        setActivities(respone.data);
      });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleDeleteActivity = (id:string) =>{
    setActivities([...activities.filter((x) => x.id !==id)])
  }

  const handleCreateIrEditActivity = (activity: Activity) => {
    activity.id 
    ? setActivities([...activities.filter((x) => x.id !== activity.id), activity])
    : setActivities([...activities,{...activity, id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

 

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectedActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateIrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
