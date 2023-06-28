/* eslint-disable */
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";

export default function Header(props) {
  let toggleSidenav;
  const { collapseSidebar, toggleSidebar, toggled, collapsed, broken } =
    useProSidebar();
  const { logout, isAuthenticated } = useAuth0();

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [settingsDisplayMode, setSettingsDisplayMode] = useState("none");

  let currentRoute = window.location.pathname;

  let currentPage;
  if (
    currentRoute === "/Contacts/Details" ||
    currentRoute === "/contacts/details"
  ) {
    currentPage = "/Contacts/Details";
  }

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (window.innerWidth < 768) {
    toggleSidenav = toggleSidebar;
    // setToggleSidenav(toggleSidebar)
  } else {
    toggleSidenav = collapseSidebar;

    // setToggleSidenav(collapseSidebar)
  }

  // useEffect(() => {

  //   if (windowWidth < 768)

  // }, [windowWidth])

  let filteredNamesArray = [];

  /////////////////////////////
  function signOut() {
    return logout({
      returnTo: "https://app.com:3000/login",
      clientID: "JfJOvuhkwZQA4OnMuZr7xvvJpzt3UJB4",
    });
    // return logout({ returnTo: window.location.origin })
  }
  //////////////////////////////

  ///////////////////////
  const getContacts = () => {
    useEffect(() => {
      axios.get("http://localhost:3001/Contacts").then((response) => {
        setContacts([response.data.contacts]);
      });
    }, []);
  };
  getContacts();
  ////////////////

  let contactsForSearch = contacts[0];

  function handleSearch(event) {
    let newSearchQuery = event.target.value;
    let fullName;

    contactsForSearch.map((contact) => {
      fullName = contact.firstName + " " + contact.lastName;

      let contactInfo = {
        contact: contact,
        fullName: fullName,
      };

      if (fullName.includes(newSearchQuery)) {
        if (newSearchQuery !== "") {
          filteredNamesArray.push(contactInfo);
        }
      }
    });
    setFilteredContacts(filteredNamesArray);
  }

  function handleClickSettings() {
    if (settingsDisplayMode === "none") {
      setSettingsDisplayMode("block");
    } else {
      setSettingsDisplayMode("none");
    }
  }

  function SettingsDisplay() {
    return (
      <div
        style={{
          display: settingsDisplayMode,
          position: "relative",
          top: "7rem",
        }}
      ></div>
    );
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Navbar bg="light" style={props.style}>
        <Container className="mx-0 moveHamburgerToRight">
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
              <NavDropdown
                eventKey={3}
                title="Dropdown"
                id="basic-nav-dropdown"
              >
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link Right
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
