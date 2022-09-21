import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { useStore } from "./stores/store";
import { Link,useLocation } from "react-router-dom";


const NavBar = () => {
  const { activityStore } = useStore();
  const onPath = useLocation().pathname;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>{" "}
        <Menu.Item name="Home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item name="Activities">
          <Link to="/activities">Activities</Link>
        </Menu.Item>
        {onPath == '/activities' &&
        <Menu.Item>
          <Button
            onClick={() => activityStore.openForm()}
            positive
            content="Create Activity"
          />
        </Menu.Item> }
      </Container>
    </Menu>
  );
};

export default NavBar;
