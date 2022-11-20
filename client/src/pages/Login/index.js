import React, { useState, useEffect } from "react";

import {
  Theme,
  Grid,
  Column,
  FormGroup,
  Stack,
  TextInput,
  Button,
  ButtonSet,
  Loading,
} from "@carbon/react";

import Header from "../../components/Header";
import { useGlobalState } from "../../hooks/globalState";
import { login, signup } from "../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";

import library from "../../images/library.png";

import "./style.scss";
import Notification from "../../components/Notification";

export default function LoginPage() {
  const {
    lightMode,
    loading,
    setLoading,
    user,
    setUser,
    setBooks,
    setShowNotification,
    setNotificationText,
  } = useGlobalState();

  const navigate = useNavigate();
  const [enableButtons, setEnableButtons] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setUser(null);
    setBooks([]);
  }, []);
  useEffect(() => {
    if (userData.username && userData.password) setEnableButtons(true);
    else setEnableButtons(false);
  }, [userData]);

  async function handleSignup() {
    setLoading(true);
    const response = await signup(userData);
    if (response.result === "created") {
      const mongoId = response?.reason.upserted[0]?._id;
      if (mongoId) userData._id = mongoId;
      setUser(userData);
      navigate("/books");
    } else if (response.result === "ignored") {
      setNotificationText({
        title: "Falha de Sign Up",
        content: "Este endereço de email já está cadastrado!",
        kind: "error",
      });
      setShowNotification(true);
    }
    setLoading(false);
  }
  async function handleLogin() {
    setLoading(true);
    const response = await login(userData);
    console.log(response);
    if (response) {
      setUser(response);
      navigate("/books");
    } else {
      setNotificationText({
        title: "Falha de Login",
        content: "Senha ou usuário incorretos.",
        kind: "error",
      });
      setShowNotification(true);
    }
    setLoading(false);
  }

  return (
    <Theme theme={lightMode ? "white" : "g100"}>
      <Header />
      <Grid>
        <Column Column sm={4} md={8} lg={10} xlg={8}>
          <div id="imageContainer">
            <img
              src={library}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "10%",
              }}
            />
          </div>
        </Column>
        <Column Column sm={4} md={8} lg={10} xlg={8}>
          <FormGroup legendId="form-group-login">
            <Grid>
              <Column sm={4} md={8} lg={10} xlg={16}>
                <Stack gap={5} style={{ heigth: "100%" }}>
                  <TextInput
                    value={userData.user}
                    id="usernameInput"
                    labelText="E-mail"
                    onChange={(e) => {
                      const clone = { ...userData };
                      clone.username = e.target.value;
                      setUserData(clone);
                    }}
                  />
                  <TextInput
                    value={userData.password}
                    id="passwordInput"
                    type="password"
                    labelText="Senha"
                    onChange={(e) => {
                      const clone = { ...userData };
                      clone.password = e.target.value;
                      setUserData(clone);
                    }}
                  />
                  <ButtonSet>
                    <Button
                      kind="secondary"
                      onClick={handleSignup}
                      disabled={!enableButtons}
                    >
                      SignUp
                    </Button>
                    <Button
                      kind="primary"
                      onClick={handleLogin}
                      disabled={!enableButtons}
                    >
                      LogIn
                    </Button>
                  </ButtonSet>
                </Stack>
              </Column>
            </Grid>
          </FormGroup>
        </Column>
      </Grid>
      <Notification />
      {loading ? <Loading /> : ""}
    </Theme>
  );
}
