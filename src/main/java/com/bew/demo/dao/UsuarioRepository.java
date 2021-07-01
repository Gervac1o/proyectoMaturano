package com.bew.demo.dao;

import com.bew.demo.dto.UsuarioDTO;
import org.springframework.stereotype.Repository;

import com.bew.demo.model.Usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UsuarioRepository extends JpaRepository <Usuario,Long>{

	@Query(
            value = "SELECT s FROM Usuario s WHERE s.email = :email",
            nativeQuery = false)
    Optional<Usuario> findByEmail(@Param("email") String email);
	
	@Query(
            value = "SELECT s FROM Usuario s WHERE s.password = :password",
            nativeQuery = false)
    Optional<Usuario> findByContraseña(@Param("password") String password);
	
	@Query(
            value = "SELECT s FROM Usuario s WHERE s.tipoUsuario = :tipoUsuario",
            nativeQuery = false)
    Optional<Usuario> findByTipo(@Param("tipoUsuario") Boolean tipoUsuario);

    @Query(
            value = "SELECT exists (SELECT s FROM Usuario s WHERE s.password = :password and s.email = :email)",
            nativeQuery = true)
    Boolean findByEmailPassword(@Param("email") String email,@Param("password")  String password);
    
    @Query(
            value = "SELECT s FROM Usuario s WHERE s.status = NULL",
            nativeQuery = false)
    List<Usuario> findByStatusNULL();
    
    @Query(
            value = "SELECT s FROM Usuario s WHERE s.status = :status and s.tipoUsuario = false",
            nativeQuery = false)
    List<Usuario> findByStatus(@Param("status")Boolean status);
}
