package com.bew.demo.restController;

import java.io.IOException;
import java.util.List;

import com.bew.demo.exception.MailRepetidoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bew.demo.dto.DictamenDTO;
import com.bew.demo.dto.UsuarioDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioRestController {
	
	@Autowired
	UsuarioService usuarioService;
	
	@GetMapping(path = "/findAll", produces = "application/json")
	public ResponseEntity<?> buscar(){
		List<UsuarioDTO> usuarios;
		usuarios = usuarioService.findAll();
		return ResponseEntity.ok(usuarios);
	}
	@GetMapping(path = "/find/{idUsuario}", produces = "application/json")
	public ResponseEntity<?>find(@PathVariable("idUsuario") Long idUsuario){
		UsuarioDTO usuarioDTO;
		usuarioDTO = usuarioService.findById(idUsuario);
		return ResponseEntity.ok(usuarioDTO);		
	}
	
	@PostMapping(path = "/findEmail", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?>findE(@RequestBody UsuarioDTO usuarioDTO){
		UsuarioDTO usuarioRes;
		usuarioRes = usuarioService.UsuarioEmail(usuarioDTO);
		return ResponseEntity.ok(usuarioRes);
	}
	@GetMapping(path = "/findByEmail/{email}", produces = "application/json")
	public ResponseEntity<?>findE(@PathVariable("email") String email) throws EmptyResultException {
		UsuarioDTO usuarioRes;
		usuarioRes = usuarioService.findUsuarioByEmail(email);
		return ResponseEntity.ok(usuarioRes);
	}
	
	@GetMapping(path = "/findByAlumno/{idAlumno}", produces = "application/json")
	public ResponseEntity<?>findE(@PathVariable("idAlumno") Long idAlumno) throws EmptyResultException {
		UsuarioDTO usuarioRes;
		usuarioRes = usuarioService.findUsuarioByAlumno(idAlumno);
		return ResponseEntity.ok(usuarioRes);
	}
	
	
	@GetMapping(path = "/findContraseña/{contraseña}", produces = "application/json")
	public ResponseEntity<?>findC(@PathVariable("contraseña") String contraseña){
		UsuarioDTO usuarioDTO;
		usuarioDTO = usuarioService.UsuarioContraseña(contraseña);
		return ResponseEntity.ok(usuarioDTO);	
	}
	@GetMapping(path = "/findTipo/{tipoUsuario}", produces = "application/json")
	public ResponseEntity<?>findT(@PathVariable("tipoUsuario") Boolean tipoUsuario){
		UsuarioDTO usuarioDTO;
		usuarioDTO = usuarioService.UsuarioTipo(tipoUsuario);
		return ResponseEntity.ok(usuarioDTO);	
	}
	@PostMapping(path = "/save", consumes = "application/json")
	public ResponseEntity<?> save(@RequestBody UsuarioDTO usuarioDTO) throws  MailRepetidoException {
		
			usuarioService.saveUsuario (usuarioDTO);
			return ResponseEntity.ok(usuarioDTO);
	}
	@PostMapping(path = "/saveAdmin", consumes = "application/json")
	public ResponseEntity<?> saveUsuarioAdmin(@RequestBody UsuarioDTO usuarioDTO) throws  MailRepetidoException {
		
			usuarioService.saveUsuarioAdmin (usuarioDTO);
			return ResponseEntity.ok(usuarioDTO);
	}
	@PatchMapping(path = "/update", consumes = "application/json")
	public ResponseEntity<?> update(@RequestBody UsuarioDTO usuarioDTO)throws EmptyResultException{
	usuarioService.updateUsuario(usuarioDTO);
	//System.out.println(usuarioDTO.getIdUsuario());
	return ResponseEntity.ok(usuarioDTO);
	}
	@PostMapping(path = "/reset", consumes = "application/json")
	public ResponseEntity<?> recovery(@RequestBody UsuarioDTO usuarioDTO) throws  EmptyResultException {
		
			usuarioService.resetPassword (usuarioDTO);
			return ResponseEntity.ok(usuarioDTO);
	}
	
	@DeleteMapping(path = "/delete/{idUsuario}")
	public ResponseEntity<?> delete(@PathVariable("idUsuario") Long idUsuario) throws EmptyResultException{
	usuarioService.deleteUsuario(idUsuario);
	return ResponseEntity.ok().build();
	}
	
	@GetMapping(path = "/findStatusNULL", produces = "application/json")
	public ResponseEntity<?>findStatusNULL(){
		List<UsuarioDTO> usuarios;
		usuarios = usuarioService.findUsuarioByStatusNULL();
		
		return ResponseEntity.ok(usuarios);
	}
	
	@GetMapping(path = "/findStatus/{status}", produces = "application/json")
	public ResponseEntity<?>findStatus(@PathVariable("status") Boolean status) throws EmptyResultException{
		List<UsuarioDTO> usuarios;
		usuarios = usuarioService.findUsuarioByStatus(status);
		
		return ResponseEntity.ok(usuarios);
	}
	
	@PostMapping(path = "/validarStatus", consumes = "application/json")
	public ResponseEntity<?> validar(@RequestBody UsuarioDTO usuarioDTO) throws  EmptyResultException {
		
			usuarioService.validarAlumno (usuarioDTO);
			return ResponseEntity.ok(usuarioDTO);
	}
}
