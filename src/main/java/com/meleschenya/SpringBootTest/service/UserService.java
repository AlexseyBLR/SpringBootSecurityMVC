package com.meleschenya.SpringBootTest.service;

import com.meleschenya.SpringBootTest.dto.UserDTO;
import com.meleschenya.SpringBootTest.exceptions.ValidateException;

import java.util.List;

public interface UserService {

    UserDTO saveUser(UserDTO userDTO) throws ValidateException;

    void deleteUser(Long id);

    UserDTO findByLogin(String login);

    List<UserDTO> findAll();

}
