import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Forms() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const courses = ["React", "Next", "Javascript"];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
    courses: "",
    gender: "",
  });

  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              color: "gray",
            }}
            component={"h4"}
          >
            LOGO
          </Typography>

          <Tabs
            textColor="inherit"
            indicatorColor="primary"
            centered
            value={value}
            onChange={(e, val) => {
              setValue(val);
            }}
          >
            <Tab value="home" label="Home" />
            <Tab value="about" label="About" />
            <Tab value="contact" label="Contact" />
          </Tabs>

          <Button
            variant="contained"
            sx={{
              color: "success",
              marginLeft: "auto",
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component={"img"}
          height="140"
          image="https://plus.unsplash.com/premium_photo-1714145990678-22654d741063?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="test img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Frontend
          </Typography>
          <Typography variant="body2">
            The platform allows you to invest in crypto tokens and other
            financial instruments.
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>

          <Button size="small" color="primary" onClick={() => setOpen(true)}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you Sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this Card?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button>Delete</Button>
        </DialogActions>
      </Dialog>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          position="absolute"
          bgcolor="white"
          top="50%"
          left="50%"
          sx={{
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              marginBottom: "20px",
            }}
          >
            This is Modal
          </Typography>

          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>

      <Link
        variant="h4"
        color="secondary"
        href="https://docs.google.com/document/d/1IUqMRZGjwU-pgcQbuRlv17_GHDsdqSKq-dyt4kkONH8/edit"
        underline="none"
      >
        Nav Link
      </Link>

      <Container sx={{ background: "gray", paddingY: "20px" }} maxWidth="xs">
        <Typography variant="body2">This is XS</Typography>
      </Container>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          value={inputs.name}
          onChange={handleChange}
          placeholder="Enter name"
          type="text"
          variant="outlined"
          sx={{ margin: "20px" }}
        />
        <TextField
          name="email"
          value={inputs.email}
          onChange={handleChange}
          placeholder="Enter email"
          type="email"
          variant="outlined"
          sx={{ margin: "20px" }}
        />
        <TextField
          name="password"
          value={inputs.password}
          onChange={handleChange}
          placeholder="Enter password"
          type="password"
          variant="outlined"
          sx={{ margin: "20px" }}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() =>
                  setInputs((prevState) => ({
                    ...prevState,
                    terms: !inputs.terms,
                  }))
                }
              />
            }
            label="I agrre"
          />
        </FormGroup>

        <FormControl fullWidth>
          <InputLabel id="menu">Courses</InputLabel>
          <Select
            labelId="menu"
            id="menu-list"
            label="courses"
            name="courses"
            value={inputs.courses}
            onChange={handleChange}
          >
            <MenuItem value={"mongodb"}>MongoDB</MenuItem>
            <MenuItem value={"express"}>express</MenuItem>
            <MenuItem value={"node"}>node</MenuItem>
            <MenuItem value={"react"}>react</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup name="gender" onChange={handleChange}>
            <FormControlLabel control={<Radio />} label="Male" value={"male"} />
            <FormControlLabel
              control={<Radio />}
              label="Female"
              value={"female"}
            />
            <FormControlLabel
              control={<Radio />}
              label="Other"
              value={"other"}
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained" /// contained, text, outlined
          color="success"
          sx={{
            margin: "30px",
          }}
          onClick={() => alert("you clicked")}
          size="large"
          type="submit"
        >
          Click Me
        </Button>
      </form>

      <div>
        <Autocomplete
          multiple
          limitTags={2}
          sx={{
            width: 250,
          }}
          options={courses}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="select a course" />
          )}
        />

        <div>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <List>
              {courses.map((course) => (
                <ListItem key={course}>
                  <ListItemButton>
                    <ListItemText
                      primary={course}
                      onClick={() => setOpen(false)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>

        <div>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            message="This is done!"
            autoHideDuration={6000}
          />
        </div>
        <CircularProgress variant="determinate" value={progress} />
        <LinearProgress variant="buffer" value={progress} />

        <div>
          <List sx={{ width: 250, background: "gray" }}>
            {courses.map((course) => (
              <ListItem key={course}>
                <ListItemButton>{">"}</ListItemButton>
                <ListItemText primary={course} />
              </ListItem>
            ))}
          </List>

          <Accordion>
            <AccordionSummary expandIcon={">"}>
              <Typography>What is your Name?</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>
                I am a human who has name which should be called as Mujahid.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Forms;
