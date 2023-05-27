package ru.kata.spring.boot_security_js.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security_js.demo.model.User;
import ru.kata.spring.boot_security_js.demo.repository.RoleRepository;
import ru.kata.spring.boot_security_js.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final RoleRepository roleRepository;

    public UserController(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @GetMapping()
    public String userPage( Principal principal) {
        User user = userService.findByEmail(principal.getName()).orElseThrow();
        return "user";
    }
}
