package ru.kata.spring.boot_security_js.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security_js.demo.model.User;
import ru.kata.spring.boot_security_js.demo.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/api/admin")

public class AdminRestController {
    private final UserService userService;

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> users = userService.listAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
//    @GetMapping("/new")
//    public String createNewUser(Model model, User user) {
//        List<Role> roles = userService.listRoles();
//        model.addAttribute("user", user);
//        model.addAttribute("roles", roles);
//        return "admin";
//    }

    @PostMapping()
    public ResponseEntity<HttpStatus> createNewUser(@RequestBody User user) {
        userService.save(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") int id) {
        User user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping()
    public ResponseEntity<HttpStatus> update(@RequestBody User user) {
        userService.edit(user.getId(), user);
        return  ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        userService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}

