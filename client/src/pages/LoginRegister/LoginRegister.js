import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import axios from "axios";

function LoginRegister() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //animation code
    $(document).ready(function () {
        $(".login-info-box").fadeOut();
        $(".login-show").addClass("show-log-panel");

        $('input[type="radio"]').on("change", function () {
            if ($("#log-reg-show").is(":checked")) {
                $(".register-info-box").fadeIn();
                $(".login-info-box").fadeOut();

                $(".white-panel").removeClass("right-log");

                $(".login-show").addClass("show-log-panel");
                $(".register-show").removeClass("show-log-panel");
            }
            if ($("#log-login-show").is(":checked")) {
                $(".register-info-box").fadeOut();
                $(".login-info-box").fadeIn();

                $(".white-panel").addClass("right-log");
                $(".register-show").addClass("show-log-panel");
                $(".login-show").removeClass("show-log-panel");
            }
        });
    });

    const handleLogin = (e) => {
        e.preventDefault();
        let formData = {};
        const data = new FormData(e.target);
        console.log(data);
        for (var [key, value] of data.entries()) {
            console.log(key, value);
            formData[key] = value;
        }

        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/user/login", formData)
            .then((res) => {
                console.log(res.data);
                sessionStorage.setItem("username", JSON.stringify(res.data.username)); // create session
                console.log(sessionStorage);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                alert("invalid credentials..pls try again..");
                navigate("/login-register");
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        let formData = {};
        const data = new FormData(e.target);
        console.log(data);
        for (var [key, value] of data.entries()) {
            console.log(key, value);
            formData[key] = value;
        }
        console.log(formData);
        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/user/register", formData)
            .then((res) => {
                const data = res.data;
                if (data.success) {
                    sessionStorage.setItem("username", JSON.stringify(res.data.userName)); // create session
                    navigate("/");
                } else {
                    alert("you have already registered.. pls login..");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("error occured..");
            });
    };

    return (
        <div class="login-reg-panel">
            <div class="login-info-box">
                <h2>Have an account?</h2>
                <p>Lorem ipsum dolor sit amet</p>
                <label id="label-register" for="log-reg-show">
                    Login
                </label>
                <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
            </div>

            <div class="register-info-box">
                <h2>Don't have an account?</h2>
                <p>Lorem ipsum dolor sit amet</p>
                <label id="label-login" for="log-login-show">
                    Register
                </label>
                <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
            </div>

            <div class="white-panel">
                <div class="login-show">
                    <form onSubmit={handleLogin}>
                        <h2>LOGIN</h2>
                        <input type="text" placeholder="Username" name="username" />
                        <input type="password" placeholder="Password" name="password" />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <div class="register-show">
                    <form onSubmit={handleRegister}>
                        <h2>REGISTER</h2>
                        <input type="text" placeholder="Username" name="username" id="username" />
                        <input type="password" placeholder="Password" name="password" id="password" />
                        <input type="password" placeholder="Confirm Password" name="confPass" id="confPass" />
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
