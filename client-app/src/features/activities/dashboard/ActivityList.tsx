import React, { useState, SyntheticEvent } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { useStore } from "../../../app/layout/stores/store";
import { observer } from "mobx-react-lite";

const ActivityList = () => {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading} = activityStore;

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => {
          return (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>{" "}
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => activityStore.selectActivity(activity.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={activity.id}
                    loading={loading && target === activity.id}
                    onClick={() => deleteActivity(activity.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
