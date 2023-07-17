import {
  createStyles,
  Box,
  Button,
  Text,
  Badge,
  Avatar,
  Group,
  Switch,
} from "@mantine/core";
import { ThemeContext } from "../theme/ThemeContext";
import { useContext } from "react";
const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    zIndex: 10,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : "white",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : "rgba(0, 0, 0, 0.1)"
    }`,
    width: "100%",
  },
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

const HeaderNav = () => {
  const { classes } = useStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);

  

  return (
    <Box component="header" className={classes.header}>
      <Group spacing="xs" className={classes.hiddenMobile}>
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          label={theme === "dark" ? "Dark mode" : "Light mode"}
        />
        <Avatar src="profile-image.jpg" alt="Profile" radius="xl" />
      </Group>
      <Text weight={700} size="lg" style={{ marginLeft: 4 }}>
        My Website
      </Text>
    </Box>
  );
};

export default HeaderNav;
