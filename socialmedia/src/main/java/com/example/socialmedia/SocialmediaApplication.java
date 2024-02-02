package com.example.socialmedia;

import com.example.socialmedia.entities.Role;
import com.example.socialmedia.repository.RoleRepository;
import com.example.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class SocialmediaApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(SocialmediaApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		try{
			Role role1 = new Role();
			role1.setId(1L);
			role1.setName("ROLE_USER");

			Role role2 = new Role();
			role2.setId(2L);
			role2.setName("ROLE_ADMIN");

			List<Role> role = List.of(role1,role2);

			roleRepository.saveAll(role);

		}catch (Exception ex){
			ex.printStackTrace();
		}
	}
}
