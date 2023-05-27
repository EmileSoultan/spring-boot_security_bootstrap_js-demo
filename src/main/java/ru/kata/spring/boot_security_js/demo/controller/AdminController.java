package ru.kata.spring.boot_security_js.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security_js.demo.model.User;
import ru.kata.spring.boot_security_js.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String showAllUsers(Principal principal) {
        User user = userService.findByEmail(principal.getName()).orElseThrow();
        return "admin";
    }
}

