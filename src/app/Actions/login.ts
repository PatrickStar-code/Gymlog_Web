"use server";

import { LoginFormData } from "@/components/formLogin";

export default async function ActionLogin(data: LoginFormData) {
    console.log("Login data received:", data);
    const email = data.email;
    const password = data.password;

    let login = await fetch("http://localhost:8080/Gymlog/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    }).then(response => {
        if (!response.ok) {
            throw new Error("Login failed");
        }
    }).catch(error => {
        console.error("Error during login:", error);
    });

    return login;
}