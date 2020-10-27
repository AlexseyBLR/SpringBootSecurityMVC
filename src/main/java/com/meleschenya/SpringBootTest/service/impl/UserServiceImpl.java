package com.meleschenya.SpringBootTest.service.impl;

import com.meleschenya.SpringBootTest.dto.UserDTO;
import com.meleschenya.SpringBootTest.entity.User;
import com.meleschenya.SpringBootTest.exceptions.ValidateException;
import com.meleschenya.SpringBootTest.repository.UserRepository;
import com.meleschenya.SpringBootTest.service.UserService;
import com.meleschenya.SpringBootTest.service.convertor.impl.UserConvertorImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserConvertorImpl convertor;

//    private final UserConvertor convertor;



    @Override
    public UserDTO saveUser(UserDTO userDTO) throws ValidateException {
        validate(userDTO);
        User user = repository.save(convertor.convertFromDtoToObj(userDTO));
        return convertor.fromUserToUserDto(user);
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    @Override
    public UserDTO findByLogin(String login) {
        User user = repository.findByLogin(login);
        if(user!=null){
            return convertor.fromUserToUserDto(user);
        }
        return null;
    }

    @Override
    public List<UserDTO> findAll() {
        return repository.findAll().stream().map(convertor::fromUserToUserDto).collect(Collectors.toList());
    }

    private void validate(UserDTO user) throws ValidateException {
        if (isNull(user)) {
            throw new ValidateException("User is null!");
        }
        if (isNull(user.getLogin()) || user.getLogin().isEmpty()) {
            throw new ValidateException("Login is empty");
        }
    }
}
