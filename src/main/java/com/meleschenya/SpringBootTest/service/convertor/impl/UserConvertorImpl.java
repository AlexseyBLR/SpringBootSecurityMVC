package com.meleschenya.SpringBootTest.service.convertor.impl;

import com.meleschenya.SpringBootTest.dto.UserDTO;
import com.meleschenya.SpringBootTest.entity.User;
import com.meleschenya.SpringBootTest.exceptions.ValidateException;
import com.meleschenya.SpringBootTest.service.convertor.UserConvertor;
import org.springframework.stereotype.Component;

import static java.util.Objects.isNull;

@Component
public class UserConvertorImpl{

    public User convertFromDtoToObj(UserDTO userDTO) {
        User user = User.builder().
                id(userDTO.getId()).
                age(userDTO.getAge()).
                login(userDTO.getLogin()).
                name(userDTO.getName()).
                surname(userDTO.getSurname()).
                build();
        return user;
    }

    public UserDTO fromUserToUserDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .age(user.getAge())
                .login(user.getLogin())
                .name(user.getName())
                .surname(user.getSurname())
                .build();
    }

}
