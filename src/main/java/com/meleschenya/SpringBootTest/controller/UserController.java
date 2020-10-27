package com.meleschenya.SpringBootTest.controller;

import com.meleschenya.SpringBootTest.dto.UserDTO;
import com.meleschenya.SpringBootTest.exceptions.ValidateException;
import com.meleschenya.SpringBootTest.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;

@Controller
@RequestMapping("/users")
//@AllArgsConstructor
@Log
public class UserController {

    @Autowired
    private UserService userService;
//    private final UserService userService;

    @GetMapping("/main")
    public String main(Model model) {
        model.addAttribute("message", "HELLO");
        return "main";
    }

    @PostMapping(value = "/save")
//   @RequestMapping(value = "/save", method = RequestMethod.POST)
    public UserDTO saveUsers(@RequestBody UserDTO UserDTO) throws ValidateException {
        log.info("Handling save users: " + UserDTO);
        return userService.saveUser(UserDTO);
    }

    @GetMapping("/findAll")
    public String findAll(Model model) {
        log.info("Handling find all users request");
        model.addAttribute("users", userService.findAll());
        return "index";
    }

    @GetMapping("/findByLogin")
    public UserDTO findByLogin(@RequestParam String login) {
        log.info("Handling find by login request: " + login);
        return userService.findByLogin(login);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUsers(@PathVariable Long id) {
        log.info("Handling delete user request: " + id);
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}