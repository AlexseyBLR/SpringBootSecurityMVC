package com.meleschenya.SpringBootTest.repository;

import com.meleschenya.SpringBootTest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByLogin(String login);

}
