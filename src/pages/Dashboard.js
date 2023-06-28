/* eslint-disable */
import { useAuth0 } from "@auth0/auth0-react";
import React, {
  useEffect,
  useState,
  PureComponent,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
} from "react";
import TextField from "@mui/material/TextField";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import Typewriter from "typewriter-effect";
import emailjs from "@emailjs/browser";
import { useInView, InView } from "react-intersection-observer";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import scrollIntoView from "scroll-into-view-if-needed";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import resume from "../LazaroGranado-Resume.docx";

const CustomTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  "& .MuiInputLabel-root": { color: "rgb(167, 164, 158)" },
  "& .MuiOutlinedInput-root": {
    "& > fieldset": { borderColor: "#292b2d" },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: "rgb(125, 174, 216) !important",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& > fieldset": {
      borderColor: "#637387",
    },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: "#637387",
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused:hover": {
    "& > fieldset": {
      borderColor: "rgb(125, 174, 216) !important",
    },
  },
}));

const emailServiceId = process.env.REACT_APP_EMAILSERVICEID;

const emailTemplateId = process.env.REACT_APP_EMAILTEMPLATEID;
const emailPublicKey = process.env.REACT_APP_EMAILPUBLICKEY;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(18, 18, 18)",
  border: "2px solid #000",
  boxShadow: 25,
  p: 4,
};

function Dashboard(props) {
  let isInitialLoad = true;

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [noNameError, setNoNameError] = useState();
  const [noEmailError, setNoEmailError] = useState();
  const [noMessageError, setNoMessageError] = useState();

  const [noNameInvalidFeedback, setNoNameInvalidFeedback] = useState();
  const [noEmailInvalidFeedback, setNoEmailInvalidFeedback] = useState();
  const [noMessageInvalidFeedback, setNoMessageInvalidFeedback] = useState();

  if (location.search !== "") {
    window.history.replaceState("", "", "/");
  }

  const [listBottomPosition, setListBottomPosition] = useState();

  const [isCollapsed, setIsCollapsed] = useState();

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  let width = windowSize[0];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function DisplayTypeWriter() {
    const [start, setStart] = useState();

    const [display, setDisplay] = useState();

    if (isInitialLoad) {
      return (
        <div>
          <h3
            className="welcomeMargin helloText"
            style={{ color: "rgb(248,245,247)", marginBottom: "1.89rem" }}
          >
            <Typewriter
              options={{
                cursorClassName: "Typewriter__cursor cursorClass",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Hello")
                  .stop()
                  .pauseFor(300)

                  .callFunction(() => {
                    setStart(true);

                    document.getElementsByClassName(
                      "cursorClass"
                    )[0].style.display = "none";
                  })
                  .start();
              }}
            />
          </h3>

          <div className=" mainTextContainer">
            <h1 className="mainText" style={{ color: "rgb(248,245,247)" }}>
              {start && (
                <Typewriter
                  options={{
                    cursorClassName: "Typewriter__cursor cursorClass1",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("I'm Lazaro Granado.")

                      .pauseFor(800)
                      .deleteAll()
                      .typeString("I'm a Software Developer.")

                      .pauseFor(500)

                      .callFunction(() => {
                        document.getElementsByClassName(
                          "cursorClass1"
                        )[0].style.display = "none";

                        setDisplay(true);
                      })
                      .start();
                  }}
                />
              )}
            </h1>
          </div>

          <div className="basedInContainer">
            {display && (
              <p
                className="fs-5"
                style={{
                  fontWeight: "400",
                  color: "rgb(248,245,247)",
                  marginBottom: "1.8rem",
                }}
              >
                {
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .pauseFor(1)
                        .typeString("based in Naples, FL.")

                        .callFunction(() => {})
                        .start();
                    }}
                  />
                }
              </p>
            )}
          </div>
        </div>
      );
    }
  }

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }
  function handleSetMessage(e) {
    setMessage(e.target.value);
  }

  function handleSetSubject(e) {
    setSubject(e.target.value);
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);

  const handleCloseSuccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessAlert(false);
  };

  function SuccessAlert(props) {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSuccessAlert}
          autoHideDuration={6000}
          onClose={handleCloseSuccessAlert}
        >
          <Alert
            onClose={handleCloseSuccessAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully sent message.
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);

  const handleCloseErrorAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorAlert(false);
  };

  function ErrorAlert(props) {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={17400}
          onClose={handleCloseErrorAlert}
        >
          <Alert
            onClose={handleCloseErrorAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            Error sending message, please contact directly through phone, email,
            or try again later.
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  function sendMessage() {
    //|| !email || !message
    if (!name || !email || !message) {
      if (!name) {
        setNoNameError("is-invalid");
        setNoNameInvalidFeedback("Enter name");
      }
      if (!email) {
        setNoEmailError("is-invalid");
        setNoEmailInvalidFeedback("Enter your email");
      }
      if (!message) {
        setNoMessageError("is-invalid");
        setNoMessageInvalidFeedback("Enter message");
      }
    } else {
      setNoNameError("is-valid");
      setNoEmailError("is-valid");
      setNoMessageError("is-valid");

      setNoNameInvalidFeedback("");
      setNoEmailInvalidFeedback("");
      setNoMessageInvalidFeedback("");

      const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message,
      };

      emailjs
        .send(emailServiceId, emailTemplateId, templateParams, emailPublicKey)
        .then(
          (response) => {
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");

            setOpenSuccessAlert(true);
          },
          (err) => {
            setOpenErrorAlert(true);
          }
        );
    }
  }

  function scrollToHomePage() {
    const homePageMain = document.getElementById("homePageMainScroll");

    scrollIntoView(homePageMain, {
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToAboutMe() {
    const aboutMeMain = document.getElementById("aboutMeMainScroll");

    const elementOffsetFromTopOfPage = aboutMeMain.getBoundingClientRect().y;

    scrollIntoView(aboutMeMain, {
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToProjects() {
    const projectsMain = document.getElementById("projectsMainScroll");

    scrollIntoView(projectsMain, {
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToResume() {
    const resumeMain = document.getElementById("resumeMainScroll");

    scrollIntoView(resumeMain, {
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToContact() {
    const contactMain = document.getElementById("contactMainScroll");

    scrollIntoView(contactMain, {
      behavior: "smooth",
      block: "start",
    });
  }

  function getPage(page) {
    return page;
  }

  let currentSection = null;
  let setCurrentSection = null;

  const onChildMount = (dataFromChild) => {
    currentSection = dataFromChild[0];
    setCurrentSection = dataFromChild[1];
  };

  let currentSectionNav = null;
  let setCurrentSectionNav = null;

  const setSection = (dataFromChild) => {
    currentSectionNav = dataFromChild[0];
    setCurrentSectionNav = dataFromChild[1];
  };

  function NestedList({ onMount }) {
    const [currentSection, setCurrentSection] = useState("");

    useEffect(() => {
      onMount([currentSection, setCurrentSection]);
    }, [onMount, currentSection]);

    return (
      <List
        sx={{
          paddingLeft: "5.7px",
          width: "100%",
          maxWidth: 360,
          bgcolor: "f1f1f1",
          bottom: listBottomPosition,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <div className={"siderbarButtonDiv"} onClick={scrollToHomePage}>
          <ListItemButton
            style={{ paddingBottom: "1rem" }}
            className="sideNavMuiButton"
            disableRipple
          >
            {
              <div>
                {" "}
                <HomeOutlinedIcon
                  style={{
                    color: "#f1f1f1",
                    fontSize: "1.7rem",
                    position: "relative",
                    right: "1.448px",
                  }}
                />{" "}
              </div>
            }

            {!isCollapsed && (
              <span
                className="navButton"
                style={{
                  color:
                    currentSection === "homePageMain"
                      ? "rgb(125, 174, 216)"
                      : "#f1f1f1",
                  fontSize: "1.14rem",
                  marginLeft: ".8rem",
                }}
              >
                Home
              </span>
            )}
          </ListItemButton>
          {isCollapsed && (
            <p
              className="mb-0 mediumFont pt-1"
              style={{
                color: "#f1f1f1",
                right: ".59rem",
                marginTop: ".3rem",
                position: "relative",
              }}
            >
              Home
            </p>
          )}
        </div>

        <div className={"siderbarButtonDiv"} onClick={scrollToAboutMe}>
          <ListItemButton
            style={{ paddingBottom: "1rem" }}
            className="sideNavMuiButton"
            disableRipple
          >
            {
              <div>
                <PersonOutlineOutlinedIcon style={{ color: "#f1f1f1" }} />
              </div>
            }

            {!isCollapsed && (
              <span
                className="navButton"
                style={{
                  color:
                    currentSection === "aboutMeMain"
                      ? "rgb(125, 174, 216)"
                      : "#f1f1f1",
                  fontSize: "1.14rem",
                  marginLeft: "1.058rem",
                }}
              >
                About
              </span>
            )}
          </ListItemButton>
          {isCollapsed && (
            <p
              className="mb-0 mediumFont pt-1"
              style={{
                color: "#f1f1f1",
                right: ".59rem",
                marginTop: ".3rem",
                position: "relative",
              }}
            >
              About
            </p>
          )}
        </div>

        <div className={"siderbarButtonDiv"} onClick={scrollToProjects}>
          <ListItemButton
            style={{ paddingBottom: "1rem" }}
            className="sideNavMuiButton"
            disableRipple
          >
            <div>
              <GridViewOutlinedIcon style={{ color: "#f1f1f1" }} />
            </div>

            {!isCollapsed && (
              <span
                className="navButton"
                style={{
                  color:
                    currentSection === "projectsMain"
                      ? "rgb(125, 174, 216)"
                      : "#f1f1f1",
                  fontSize: "1.14rem",
                }}
              >
                Projects
              </span>
            )}
          </ListItemButton>
          {isCollapsed && (
            <p
              className="mb-0 mediumFont pt-1"
              style={{
                color: "#f1f1f1",
                right: ".59rem",
                marginTop: ".3rem",
                position: "relative",
              }}
            >
              Projects
            </p>
          )}
        </div>

        <div className={"siderbarButtonDiv"} onClick={scrollToResume}>
          <ListItemButton
            style={{ paddingBottom: "1rem" }}
            className="sideNavMuiButton"
            disableRipple
          >
            <div>
              <DescriptionOutlinedIcon style={{ color: "#f1f1f1" }} />
            </div>

            {!isCollapsed && (
              <span
                className="navButton"
                style={{
                  color:
                    currentSection === "resumeMain"
                      ? "rgb(125, 174, 216)"
                      : "#f1f1f1",
                  fontSize: "1.14rem",
                }}
              >
                Resume
              </span>
            )}
          </ListItemButton>
          {isCollapsed && (
            <p
              className="mb-0 mediumFont pt-1"
              style={{
                color: "#f1f1f1",
                right: ".59rem",
                marginTop: ".3rem",
                position: "relative",
              }}
            >
              Resume
            </p>
          )}
        </div>

        <div className={"siderbarButtonDiv"} onClick={scrollToContact}>
          <ListItemButton className="sideNavMuiButton" disableRipple>
            <div>
              {" "}
              <EmailOutlinedIcon style={{ color: "#f1f1f1" }} />
            </div>

            {!isCollapsed && (
              <span
                className="navButton"
                style={{
                  color:
                    currentSection === "contactMain"
                      ? "rgb(125, 174, 216)"
                      : "#f1f1f1",
                  fontSize: "1.14rem",
                }}
              >
                Contact
              </span>
            )}
          </ListItemButton>
          {isCollapsed && (
            <p
              className="mb-0 mediumFont pt-1"
              style={{
                color: "#f1f1f1",
                right: ".59rem",
                marginTop: ".3rem",
                position: "relative",
              }}
            >
              Contact
            </p>
          )}
        </div>
      </List>
    );
  }

  function DisplayNav({ setSection }) {
    const [currentSection, setCurrentSection] = useState("");

    useEffect(() => {
      setSection([currentSection, setCurrentSection]);
    }, [setSection, currentSection]);

    return (
      <nav class="bootstrapNav  navbar navbar-expand-xl navbar-dark bg-dark pb-0">
        <div class="container-fluid px-0">
          <a onClick={scrollToHomePage} class="navbar-brand">
            Lazaro Granado
          </a>

          <MenuIcon
            className="navToggle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              class="navbar-nav me-auto pt-2 pb-2  mb-lg-0 navItems"
              style={{ backgroundColor: "rgb(.5,.5,.5)" }}
            >
              <li
                class="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a
                  onClick={scrollToHomePage}
                  class="nav-link headerButton active"
                  aria-current="page"
                  href="#"
                  style={{
                    color:
                      currentSection === "homePageMain"
                        ? "rgb(125, 174, 216)"
                        : "#e1e1e1",
                  }}
                >
                  Home
                </a>
              </li>
              <Divider />
              <li
                class="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a
                  onClick={scrollToAboutMe}
                  class="nav-link headerButton active"
                  aria-current="page"
                  href="#"
                  style={{
                    color:
                      currentSection === "aboutMeMain"
                        ? "rgb(125, 174, 216)"
                        : "#e1e1e1",
                  }}
                >
                  About
                </a>
              </li>
              <Divider />

              <li
                class="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a
                  onClick={scrollToProjects}
                  class="nav-link headerButton active"
                  aria-current="page"
                  href="#"
                  style={{
                    color:
                      currentSection === "projectsMain"
                        ? "rgb(125, 174, 216)"
                        : "#e1e1e1",
                  }}
                >
                  Projects
                </a>
              </li>
              <Divider />

              <li
                class="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a
                  onClick={scrollToResume}
                  class="nav-link headerButton active"
                  aria-current="page"
                  href="#"
                  style={{
                    color:
                      currentSection === "resumeMain"
                        ? "rgb(125, 174, 216)"
                        : "#e1e1e1",
                  }}
                >
                  Resume
                </a>
              </li>
              <Divider />

              <li
                class="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <a
                  onClick={scrollToContact}
                  class="nav-link headerButton active"
                  aria-current="page"
                  href="#"
                  style={{
                    color:
                      currentSection === "contactMain"
                        ? "rgb(125, 174, 216)"
                        : "#e1e1e1",
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  function DisplayProjects() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openContactsModal, setOpenContactsModal] = React.useState(false);
    const handleOpenContactsModal = () => setOpenContactsModal(true);
    const handleCloseContactsModal = () => setOpenContactsModal(false);

    const [openCalculatorModal, setOpenCalculatorModal] = React.useState(false);
    const handleOpenCalculatorModal = () => setOpenCalculatorModal(true);
    const handleCloseCalculatorModal = () => setOpenCalculatorModal(false);

    function MainModal() {
      return (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
            slotProps={{
              backdrop: { style: { background: "rgba(0, 0, 0, .8)" } },
            }}
          >
            <Box sx={style} className="mainModal">
              <CloseRoundedIcon onClick={handleClose} className="modalClose" />

              <h2 className="text-center modalTitle" style={{ color: "white" }}>
                Tracker
              </h2>

              <div className="row">
                <div className="col-lg-7 pb-4">
                  <Carousel
                    showThumbs={false}
                    // autoPlay={true}
                    infiniteLoop={true}
                    interval={4998}
                  >
                    <div>
                      <img
                        className="projectImage"
                        src="./images/trackerDashboard.png"
                      ></img>
                    </div>
                    <div>
                      <img
                        className="projectImage"
                        src="./images/trackerCreate.png"
                      ></img>
                    </div>
                    <div>
                      <img
                        className="projectImage"
                        src="./images/trackerLogin.png"
                      ></img>
                    </div>
                    <div>
                      <img
                        className="projectImage"
                        src="./images/projectsPage.png"
                      ></img>
                    </div>
                  </Carousel>
                </div>

                <div className="col-lg-5 ">
                  <ul className="list-unstyled">
                    <strong className="listColor fs-5">Details</strong>
                    <li className="pb-2 pt-2">
                      <span className="listText paragraphHeight">
                        Tracker is an online, feature-rich issue tracking
                        software application that is functional and effective,
                        designed to mirror any of a wide variety of bug tracking
                        software systems in use by corporations throughout the
                        world, it can be used by either small or large
                        businesses{" "}
                      </span>
                    </li>
                    <Divider component="li" className="modalDividerColor" />

                    <li className="pt-3 pb-2">
                      <strong className="listColor">Technologies:</strong>
                      <span className="listText">
                        {" "}
                        HTML, CSS, JavaScript, Node JS, React JS, PostgreSQL,
                        Bootstrap{" "}
                      </span>
                    </li>

                    <li className="pt-4 trackerModalPadding">
                      <a href="https://lazaro-tracker.com">
                        <Button
                          style={{ fontSize: "10px" }}
                          size="large"
                          className="visitSiteButton  px-0 me-3"
                          variant="outlined"
                        >
                          <LinkRoundedIcon
                            style={{ position: "relative", right: "8.9px" }}
                          />
                          Visit
                        </Button>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row"></div>
            </Box>
          </Modal>
        </div>
      );
    }

    function ContactsModal() {
      return (
        <div>
          <Modal
            open={openContactsModal}
            onClose={handleCloseContactsModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
            slotProps={{
              backdrop: { style: { background: "rgba(0, 0, 0, .8)" } },
            }}
          >
            <Box sx={style} className="mainModal">
              <CloseRoundedIcon
                onClick={handleCloseContactsModal}
                className="modalClose"
              />

              <h2 className="text-center modalTitle" style={{ color: "white" }}>
                Contacts Book
              </h2>

              <div className="row">
                <div className="col-lg-7  pb-4  pb-4">
                  <Carousel
                    showThumbs={false}
                    // autoPlay={true}
                    infiniteLoop={true}
                    interval={4998}
                  >
                    <div>
                      <img
                        className="projectImage"
                        src="./images/cbMain.png"
                      ></img>
                    </div>
                    <div>
                      <img
                        className="projectImage"
                        src="./images/cbCreateContact.png"
                      ></img>
                    </div>
                    <div>
                      <img
                        className="projectImage"
                        src="./images/cbLogin.png"
                      ></img>
                    </div>
                  </Carousel>
                </div>

                <div className="col-lg-5">
                  <ul className="list-unstyled">
                    <strong className="listColor fs-5">Details</strong>
                    <li className="pb-2 pt-2">
                      <span className="listText paragraphHeight">
                        A contacts book used to keep web based profiles for
                        friends, family and colleagues, all while providing the
                        ability to contact them either individually or as a
                        group, it utilizes CRUD functionalities to add, update
                        and delete contacts.
                      </span>
                    </li>
                    <Divider component="li" className="modalDividerColor" />

                    <li className="pt-3 pb-2">
                      <strong className="listColor">Technologies:</strong>
                      <span className="listText">
                        {" "}
                        HTML, CSS, JavaScript, Node JS, React JS, PostgreSQL,
                        Bootstrap
                      </span>
                    </li>

                    <li className="pt-4  trackerModalPadding">
                      <a href="https://lazaro-contactbook.com">
                        <Button
                          style={{ fontSize: "10px" }}
                          size="large"
                          className="visitSiteButton  px-0 me-3"
                          variant="outlined"
                        >
                          {" "}
                          <LinkRoundedIcon
                            style={{ position: "relative", right: "8.9px" }}
                          />
                          Visit
                        </Button>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row"></div>
            </Box>
          </Modal>
        </div>
      );
    }

    function CalculatorModal() {
      return (
        <div>
          <Modal
            open={openCalculatorModal}
            onClose={handleCloseCalculatorModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
            slotProps={{
              backdrop: { style: { background: "rgba(0, 0, 0, .8)" } },
            }}
          >
            <Box sx={style} className="mainModal">
              <CloseRoundedIcon
                onClick={handleCloseCalculatorModal}
                className="modalClose"
              />

              <h2 className="text-center modalTitle" style={{ color: "white" }}>
                Mortgage Calculator
              </h2>

              <div className="row">
                <div className="col-lg-7  pb-4">
                  <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    interval={4998}
                    swipeable={true}
                  >
                    <div>
                      <img
                        className="projectImage"
                        src="./images/calculatorUsed.png"
                      ></img>
                    </div>
                    <div>
                      <img
                        className="projectImage"
                        src="./images/calculatorMain.png"
                      ></img>
                    </div>
                    <div>
                      <img
                        className="projectImage"
                        src="./images/calculatorTable.png"
                      ></img>
                    </div>
                  </Carousel>
                </div>

                <div className="col-lg-5">
                  <ul className="list-unstyled">
                    <strong className="listColor fs-5">Details</strong>
                    <li className="pb-2 pt-2">
                      <span className="listText paragraphHeight">
                        {" "}
                        A mortgage calculator built using JavaScript and React
                        JS, it generates an amortization schedule for a simple
                        interest loan.{" "}
                      </span>
                    </li>
                    <Divider component="li" className="modalDividerColor" />

                    <li className="pt-3 pb-2">
                      <strong className="listColor">Technologies:</strong>
                      <span className="listText">
                        {" "}
                        HTML, CSS, JavaScript, React JS, Bootstrap
                      </span>
                    </li>

                    <li className="pt-4 trackerModalPadding">
                      <a href="https://lazaro-mortgagecalculator.com">
                        <Button
                          style={{ fontSize: "10px" }}
                          size="large"
                          className="visitSiteButton  px-0 me-3"
                          variant="outlined"
                        >
                          {" "}
                          <LinkRoundedIcon
                            style={{ position: "relative", right: "8.9px" }}
                          />
                          Visit
                        </Button>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row"></div>
            </Box>
          </Modal>
        </div>
      );
    }

    return (
      <InView
        threshold={0.55}
        as="div"
        onChange={(inView, entry) => {
          if (inView) {
            let currentPage = entry.target.firstChild.id;
            getPage(currentPage);

            setCurrentSection(currentPage);
            setCurrentSectionNav(currentPage);
          }
        }}
      >
        <div id="projectsMain" className="projectsMain">
          <div id="projectsMainScroll" className="projectsMainScroll"></div>

          <div className="container">
            <div className="projects">
              <div className="row projectsTitleWrapper">
                <h3 className="fs-2 pageTitle">Projects</h3>
                <p className="pageTitleBar"></p>

                <p className="pt-1 projectsIntro ">
                  Feel free to check out some of the projects I have been
                  working on, click on them for details!
                </p>
              </div>

              <div className="projectsContent">
                <div className="row">
                  <div className="col-md-12 text-center justify-content-center d-flex">
                    <div onClick={handleOpen} className="mainProjectCard">
                      <div id="mainCardText" className="mainCardText">
                        Tracker
                      </div>

                      <img
                        className="dashboardImage"
                        src="./images/dashboard.png"
                        width=""
                        height=""
                      ></img>
                      <div className="imageBlur"></div>

                      <AddCircleRoundedIcon
                        style={{ color: "rgb(239, 87, 85)" }}
                        className="mainCardButton"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 justify-content-center d-flex">
                    <div
                      onClick={handleOpenContactsModal}
                      className="subProjectCard"
                    >
                      <div className="contactsCardText">Contacts Book</div>

                      <img
                        className="notebookImage"
                        src="./images/notebook.png"
                        width="192"
                        height="170"
                      ></img>
                      <div className="imageBlurNotebook"></div>

                      <AddCircleRoundedIcon
                        style={{ color: "rgb(239, 87, 85)" }}
                        className="contactsCardButton"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 justify-content-center d-flex">
                    <div
                      onClick={handleOpenCalculatorModal}
                      className="subProjectCard"
                    >
                      <div className="calculatorCardText">
                        Mortgage Calculator
                      </div>

                      <img
                        className="calculatorImage"
                        src="./images/calculator.png"
                        width="192"
                        height="170"
                      ></img>
                      <div className="imageBlurCalculator"></div>

                      <AddCircleRoundedIcon
                        style={{ color: "rgb(239, 87, 85)" }}
                        className="calculatorCardButton"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <MainModal />
              <ContactsModal />
              <CalculatorModal />
            </div>
          </div>
        </div>
      </InView>
    );
  }

  if (isLoading) {
    return <div></div>;
  } else {
    return (
      <div>
        {/* <MenuAppBar /> */}

        <DisplayNav setSection={setSection} />

        <div
          style={{
            display: "flex",
            position: "sticky",
          }}
        >
          <Sidebar
            backgroundColor={"#111418"}
            customBreakPoint={0}
            transitionDuration="0"
            className="proNav"
          >
            <div className="mt-1">
              <Menu>
                <div
                  onClick={scrollToHomePage}
                  style={{
                    justifyContent: "start",
                    textAlign: "start",
                    "margin-top": "2.58rem",
                    marginRight: "0rem",
                    cursor: "pointer",
                  }}
                >
                  <img
                    className="navImage"
                    src="./images/pic.jpeg"
                    width="89"
                    height="89"
                  ></img>
                </div>
                <MenuItem
                  onClick={scrollToHomePage}
                  style={{
                    width: "15.625rem",
                    textAlign: "start",
                    backgroundColor: "transparent",
                    marginTop: ".3rem",
                    marginBottom: "1rem",
                    paddingLeft: "1.35rem",
                    position: "relative",
                  }}
                >
                  <h4 style={{ fontWeight: "588", color: "white" }}>
                    Lazaro Granado
                  </h4>
                  <div className="nameDeco"></div>
                </MenuItem>

                <NestedList getPage={getPage} onMount={onChildMount} />
              </Menu>
            </div>

            <a href="https://github.com/LazaroGranado" target="_blank">
              <Button className="linkToProfile">GitHub</Button>
            </a>

            <a href="https://www.linkedin.com/in/lazarogranado" target="_blank">
              <Button className="linkedInIcon">
                {" "}
                <LinkedInIcon
                  style={{ color: "#0a66c2", fontSize: "1.59rem" }}
                />
              </Button>
            </a>
          </Sidebar>
        </div>

        <div className="width">
          <SuccessAlert />
          <ErrorAlert />

          <InView
            threshold={0.55}
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                let currentPage = entry.target.firstChild.id;

                getPage(currentPage);
                setCurrentSection(currentPage);
                setCurrentSectionNav(currentPage);
              }
            }}
          >
            <div id="homePageMain" className="homePageMain">
              <div id="homePageMainScroll" className="homePageMainScroll"></div>

              <div className="container">
                <div className="row">
                  <div className="col text-center">
                    <div id="homePage" className="homePage">
                      {<DisplayTypeWriter />}

                      <Button
                        onClick={scrollToProjects}
                        style={{ fontSize: "10px" }}
                        size="large"
                        className="mainButton px-0 me-3"
                        variant="outlined"
                      >
                        View Projects
                      </Button>

                      <Button
                        onClick={scrollToContact}
                        size="large"
                        className="mainButton ms-3"
                        variant="outlined"
                      >
                        Hire Me
                      </Button>

                      <div onClick={scrollToAboutMe}>
                        <ArrowDownwardRoundedIcon className="animate text-center" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InView>

          <InView
            threshold={0.55}
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                let currentPage = entry.target.firstChild.id;

                getPage(currentPage);

                setCurrentSection(currentPage);
                setCurrentSectionNav(currentPage);
              }
            }}
          >
            <section id="aboutMeMain" className="aboutMeMain">
              <div id="aboutMeMainScroll" className="aboutMeMainScroll"></div>

              <div className="container">
                <div className="aboutMe">
                  <div className="row">
                    <h3 className="fs-2 pageTitle">About Me</h3>
                    <p className="pageTitleBar"></p>
                  </div>

                  <div className="row aboutMeInfo">
                    <div className="col-md-8 aboutMeParagraph">
                      <div style={{ paddingRight: "2rem" }}>
                        <p>
                          Welcome, my name is Lazaro Granado. I am a
                          self-taught, Full-Stack software developer based in
                          place, placeholder. I am a dynamic and bilingual
                          professional with the skillset to analyze complex
                          information and efficiently resolve issues. I
                          thoughtfully develop client and server software to
                          capture their destined design, all while ensuring I
                          maintain a strong work ethic, I am comfortable working
                          in teams or independently to ensure solutions
                          consistently meet or exceed business goals.
                        </p>

                        <p></p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <ul className="list-unstyled">
                        <li className="pb-2">
                          <strong className="listColor">Name:</strong>
                          <span className="listText"> Lazaro Granado</span>
                        </li>
                        <Divider component="li" />
                        <li className="pt-3 pb-2">
                          <strong className="listColor">Phone:</strong>
                          <span className="listText"> +1 786 361 5078</span>
                        </li>
                        <Divider component="li" />
                        <li className="pt-3 pb-2">
                          <strong className="listColor">Email:</strong>
                          <span className="listText">
                            {" "}
                            lazaro.granado7@gmail.com
                          </span>
                        </li>
                        <Divider component="li" />
                        <li className="pt-3 pb-1">
                          <strong className="listColor">From:</strong>
                          <span className="listText"> Naples, FL </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </InView>

          <DisplayProjects />

          <InView
            threshold={0.55}
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                let currentPage = entry.target.firstChild.id;
                getPage(currentPage);

                setCurrentSection(currentPage);
                setCurrentSectionNav(currentPage);
              }
            }}
          >
            <div id="resumeMain" className="resumeMain">
              <div id="resumeMainScroll" className="resumeMainScroll"></div>

              <div className="container">
                <div className="resume">
                  <div className="row">
                    <h3 className="fs-2 pageTitle">Resume</h3>
                    <p className="pageTitleBar"></p>
                  </div>

                  <div className="row resumeInner">
                    <div className="col-md-6">
                      <h4 style={{ color: "rgb(250, 250, 250)" }}>Summary</h4>

                      <div className="resumeSummary">
                        <div className="dividerTop"></div>
                        <h5
                          style={{
                            color: "rgb(250, 250, 250)",
                            fontSize: "1.17rem",
                          }}
                        >
                          Lazaro Granado
                        </h5>

                        <div className="col-md-11">
                          <p>
                            Innovative and driven placeholder placeholder in
                            training, aiming to be the best.
                          </p>
                        </div>

                        <ul
                          className="list-unstyled"
                          style={{ paddingTop: "1rem" }}
                        >
                          <div className="row">
                            <li className="pb-2">
                              <PlaceRoundedIcon
                                style={{
                                  fontSize: "1.08rem",
                                  color: "rgb(239, 87, 85)",
                                  paddingTop: ".25rem",
                                  paddingRight: ".7302rem",
                                  paddingBottom: ".3rem",
                                }}
                                className="placeRoundedIcon"
                              />
                              Naples, FL
                            </li>
                          </div>

                          <div className="row">
                            <li className="pb-2">
                              <PhoneRoundedIcon
                                style={{
                                  fontSize: "1.08rem",
                                  color: "rgb(239, 87, 85)",
                                  paddingTop: ".25rem",
                                  paddingRight: ".48rem",
                                }}
                                className="placeRoundedIcon"
                              />
                              +1 786 361 5078
                            </li>
                          </div>

                          <div className="row">
                            <li
                              className="pb-2"
                              style={{
                                paddingLeft: ".8rem",
                                paddingTop: "3px",
                              }}
                            >
                              <EmailRoundedIcon
                                style={{
                                  fontSize: "1.08rem",
                                  color: "rgb(239, 87, 85)",
                                  paddingRight: ".48rem",
                                  marginRight: "3px",
                                }}
                                className="EmailRoundedIcon"
                              />
                              lazaro.granado7@gmail.com
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-6 resumeInnerCol">
                      <h4 style={{ color: "rgb(250, 250, 250)" }}>
                        Professional Experience
                      </h4>
                      <div
                        className="professionalExperience"
                        style={{
                          position: "relative",
                          borderLeftWidth: "2.44px",
                          borderLeftStyle: "solid",
                          borderLeftColor: "rgb(239, 87, 85)",
                          paddingLeft: "1.4rem",
                          top: "1.4rem",
                        }}
                      >
                        <div className="dividerTop"></div>
                        <h5
                          style={{
                            color: "rgb(250, 250, 250)",
                            fontSize: "1.17rem",
                          }}
                        >
                          Delivery driver
                        </h5>

                        <div className="experienceDate">
                          {" "}
                          <h5 style={{ fontSize: "1rem", marginBottom: 0 }}>
                            {" "}
                            2018 - Ongoing
                          </h5>
                        </div>

                        <ul
                          className=" experienceList"
                          style={{ paddingTop: "1rem" }}
                        >
                          <div className="row">
                            <div
                              className="col-md-12"
                              style={{
                                paddingLeft: "0",
                                paddingBottom: "1rem",
                              }}
                            >
                              <li className="pb-2">
                                <span className="listText">
                                  {" "}
                                  Delivered exceptional service to customers and
                                  maintained a 94% satisfaction rating.{" "}
                                </span>
                              </li>
                            </div>
                          </div>

                          <div className="row">
                            <div
                              className="col-md-12"
                              style={{
                                paddingLeft: "0",
                                paddingBottom: "1rem",
                              }}
                            >
                              <li className="pb-2">
                                {" "}
                                <span className="listText">
                                  {" "}
                                  Used the driver App for reporting completion
                                  of deliveries, GPS tracking, and payments.{" "}
                                </span>
                              </li>
                            </div>
                          </div>

                          <div className="row">
                            <div
                              className="col-md-12"
                              style={{
                                paddingLeft: "0",
                                paddingBottom: "1rem",
                              }}
                            >
                              <li className="pb-2">
                                {" "}
                                <span className="listText">
                                  {" "}
                                  Completed deliveries in a timely manner to
                                  ensure customers received a positive
                                  experience.
                                </span>
                              </li>
                            </div>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <a
                      href={resume}
                      download="LazaroGranado-Resume"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        style={{ fontSize: "10px" }}
                        size="large"
                        className=" resumeButton px-0 "
                        variant="outlined"
                      >
                        Download Resume
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </InView>

          <InView
            threshold={0.99}
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                let currentPage = entry.target.firstChild.id;
                getPage(currentPage);

                setCurrentSection(currentPage);
                setCurrentSectionNav(currentPage);
              }
            }}
          >
            <div id="mainSkills" className="mainSkills">
              <div className="container">
                <div className="skills">
                  <div className="row">
                    <h3 className="fs-2 pageTitle mb-0">Skills</h3>
                    <p className="pageTitleBar"></p>
                  </div>

                  <div className="row skillsContent">
                    <div className="row d-flex justify-content-center">
                      <div className="col-md-2 text-center skillWidthTop">
                        <div className="skill">
                          <h4 className="skillInside">HTML</h4>
                        </div>
                      </div>
                      <div className="col-md-2 text-center skillWidthTop">
                        <div className="skill">
                          <h4 className="skillInside">CSS</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center skillWidthTop">
                        <div className="skill">
                          <h4 className="skillInside">JAVASCRIPT</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center skillWidthTop">
                        <div className="skill">
                          <h4 className="skillInside">NODE JS</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center skillWidthTop">
                        <div className="skill">
                          <h4 className="skillInside">REACT JS</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center skillWidthTop smallWidthMain">
                        <div className="skill">
                          <h4 className="skillInside">BOOTSTRAP</h4>
                        </div>
                      </div>
                    </div>

                    <div className="row d-flex justify-content-center pt-5">
                      <div className="col-md-2 text-center skillWidth">
                        <div className="skillTools">
                          <h4 className="skillInsideTools">POSTGRE</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center smallWidth">
                        <div className="skillTools">
                          <h4 className="skillInsideTools">BOOTSTRAP</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center skillWidth">
                        <div className="skillTools">
                          <h4 className="skillInsideTools">SQL</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center skillWidth">
                        <div className="skillTools">
                          <h4 className="skillInsideTools">GITHUB</h4>
                        </div>
                      </div>

                      <div className="col-md-2 text-center skillWidth">
                        <div className="skillTools">
                          <h4 className="skillInsideTools">VS CODE</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InView>

          <InView
            threshold={0.55}
            as="div"
            onChange={(inView, entry) => {
              if (inView) {
                let currentPage = entry.target.firstChild.id;
                getPage(currentPage);

                setCurrentSection(currentPage);
                setCurrentSectionNav(currentPage);
              }
            }}
          >
            <div id="contactMain" className="contactMain">
              <div id="contactMainScroll" className="contactMainScroll"></div>

              <div className="container contactContainer">
                <div className="contact">
                  <div className="row">
                    <h3 className="fs-2 pageTitle">Get in touch </h3>
                    <p className="pageTitleBar"></p>
                  </div>

                  <div className="row contactDiv">
                    <div className="col-lg-4">
                      <ul className="list-unstyled">
                        <div className="row">
                          <div className="col-md-1 contactIcon">
                            <PhoneRoundedIcon
                              style={{
                                color: "rgb(239, 87, 85)",
                                paddingTop: "2.3px",
                              }}
                              className="phoneRoundedIconContactSection"
                            />
                          </div>

                          <div className="col-md-11 contactInfo">
                            <li>
                              {" "}
                              <strong className="listColorContact">
                                Phone
                              </strong>
                            </li>
                            <span className="listText">+1 786 361 5078 </span>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-1 contactIcon">
                            <EmailRoundedIcon
                              style={{
                                color: "rgb(239, 87, 85)",
                                paddingTop: "2.3px",
                              }}
                              className="EmailRoundedIconContactSection"
                            />
                          </div>

                          <div className="col-md-11 contactInfo">
                            <li>
                              {" "}
                              <strong className="listColorContact">
                                Email
                              </strong>
                            </li>
                            <a href="mailto:lazaro.granado7@gmail.com">
                              <span className="listText email">
                                {" "}
                                lazaro.granado7@gmail.com
                              </span>
                            </a>
                          </div>
                        </div>

                        <div className="row contactInfoDisplay">
                          <div className="col-md-1 contactIcon">
                            <PlaceRoundedIcon
                              style={{
                                color: "rgb(239, 87, 85)",
                                paddingTop: "2.3px",
                              }}
                              className="placeRoundedIconContactSection"
                            />
                          </div>

                          <div
                            className="col-md-11 contactInfo"
                            style={{
                              paddingLeft: "1.4rem",
                              paddingBottom: "2.38rem",
                            }}
                          >
                            <li>
                              {" "}
                              <strong className="listColorContact">
                                Located in
                              </strong>
                            </li>
                            <span className="listText"> Naples, FL</span>
                          </div>
                        </div>
                      </ul>
                    </div>

                    <div className="col-lg-8">
                      <h5
                        className="pb-2"
                        style={{ color: "rgb(223, 223, 223)" }}
                      >
                        SEND ME A NOTE
                      </h5>

                      <div className="messageDiv">
                        <div className="row pb-4 form-group ">
                          <div className="col-md-6 contactNameCol">
                            <input
                              className={
                                "form-control textInput " + noNameError
                              }
                              onChange={handleSetName}
                              value={name}
                              placeholder="Name"
                            ></input>
                            <div className="invalid-feedback pt-1">
                              {noNameInvalidFeedback}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <input
                              className={
                                "form-control textInput " + noEmailError
                              }
                              onChange={handleSetEmail}
                              value={email}
                              placeholder="Email"
                            ></input>
                            <div className="invalid-feedback pt-1">
                              {noEmailInvalidFeedback}
                            </div>
                          </div>
                        </div>

                        <div className="row pb-4">
                          <div className="col">
                            <input
                              className="form-control textInput"
                              onChange={handleSetSubject}
                              value={subject}
                              placeholder="Subject"
                            ></input>
                          </div>
                        </div>

                        <div className="row pb-4">
                          <div className="col">
                            <textarea
                              className={
                                "form-control textInput " + noMessageError
                              }
                              onChange={handleSetMessage}
                              value={message}
                              placeholder="Message"
                            ></textarea>

                            <div className="invalid-feedback pt-1">
                              {noMessageInvalidFeedback}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={sendMessage}
                        style={{ fontSize: "10px" }}
                        size="large"
                        className=" messageButton px-0 me-3"
                        variant="outlined"
                      >
                        <SendRoundedIcon
                          style={{
                            position: "relative",
                            right: "8px",
                            bottom: "1px",
                          }}
                          className="sendRoundedIcon"
                        />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer d-flex justify-content-center align-content-center">
                <a
                  className="linkedInIconFooter"
                  href="https://github.com/LazaroGranado"
                  target="_blank"
                >
                  <Button className="linkToProfileFooter">GitHub</Button>
                </a>

                <a
                  className="linkedInIconFooter"
                  href="https://www.linkedin.com/in/lazarogranado"
                  target="_blank"
                >
                  <Button>
                    {" "}
                    <LinkedInIcon
                      style={{ color: "#0a66c2", fontSize: "1.59rem" }}
                    />
                  </Button>
                </a>
              </div>
            </div>
          </InView>
        </div>
      </div>
    );
  }
}

export default Dashboard;
