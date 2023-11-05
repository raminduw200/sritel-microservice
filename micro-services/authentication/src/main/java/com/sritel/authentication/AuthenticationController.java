package com.sritel.authentication;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/authenticate")
public class AuthenticationController {

    // Predefined set of usernames and passwords
    private static final Map<String, String> userCredentials = new HashMap<>();

    static {
        userCredentials.put("ramindu@mail.com", "ramindu");
        userCredentials.put("oshani@mail.com", "oshani");
        userCredentials.put("idusha@mail.com", "idusha");
        userCredentials.put("inuri@mail.com", "inuri");
        userCredentials.put("pawandi@mail.com", "pawandi");
        userCredentials.put("malindu@mail.com", "malindu");
        userCredentials.put("harini@mail.com", "harini");
    }

//    @PostMapping("/login")
//    public String login(@RequestBody AuthenticationModel authenticationModel) {
//        String username = authenticationModel.getEmail();
//        String password = authenticationModel.getPassword();
//
//        if (username == null || password == null) {
//            return "Login failed. Please provide both username and password.";
//        }
//
//        String storedPassword = userCredentials.get(username);
//        if (storedPassword != null && storedPassword.equals(password)) {
//            return "Login successful for User: " + username;
//        } else {
//            return "Login Failed. Invalid username or password.";
//        }
//    }

    @PostMapping("/login/{username}/{password}")
    public String login(@PathVariable String username, @PathVariable String password) {

        System.out.println("username: " + username);
        System.out.println("password: " + password);

        if (username == null || password == null) {
            return "No Credentials";
        }

        String storedPassword = userCredentials.get(username);
        if (storedPassword != null && storedPassword.equals(password)) {
            return "Success";
        } else {
            return "User not found";
        }

    }

}
