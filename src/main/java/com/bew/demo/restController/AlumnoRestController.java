package com.bew.demo.restController;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.bew.demo.dto.AlumnoDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.service.AlumnoService;

import java.util.List;

@RestController
@RequestMapping("/alumno")
@CrossOrigin("*")
public class AlumnoRestController {
	
	@Autowired
	private AlumnoService alumnoService;

	@GetMapping(path = "/findAll", produces = "application/json")
	public ResponseEntity<?> buscar(){
		List<AlumnoDTO> alumnos;
		alumnos = alumnoService.findAll();
		return ResponseEntity.ok(alumnos);
	}
	@GetMapping(path = "/find/{idAlumno}", produces = "application/json")
	public ResponseEntity<?>find(@PathVariable("idAlumno") Long idAlumno){
		AlumnoDTO alumnoDTO;
		alumnoDTO = alumnoService.findById(idAlumno);
		return ResponseEntity.ok(alumnoDTO);		
	}
	@GetMapping(path = "/findNombre/{nombre}", produces = "application/json")
	public ResponseEntity<?>findN(@PathVariable("nombre") String nombre){
		List<AlumnoDTO> alumnoDTO;
		alumnoDTO = alumnoService.AlumnoNombre(nombre);
		
		return ResponseEntity.ok(alumnoDTO);
	}
	@GetMapping(path = "/findPrograma/{programaAcademico}", produces = "application/json")
	public ResponseEntity<?>findPrograma(@PathVariable("programaAcademico") String programaAcademico){
		List<AlumnoDTO> alumnoDTO;
		alumnoDTO = alumnoService.AlumnoPrograma(programaAcademico);
		
		return ResponseEntity.ok(alumnoDTO);
	}
	@GetMapping(path = "/findApellidoPaterno/{apellidoPaterno}", produces = "application/json")
	public ResponseEntity<?>find(@PathVariable("apellidoPaterno") String apellidoPaterno){
		AlumnoDTO alumnoDTO;
		alumnoDTO = alumnoService.AlumnoApellidoPaterno(apellidoPaterno);
		
		return ResponseEntity.ok(alumnoDTO);
	}
	@GetMapping(path = "/findApellidoMaterno/{apellidoMaterno}", produces = "application/json")
	public ResponseEntity<?>findAM(@PathVariable("apellidoMaterno") String apellidoMaterno){
		AlumnoDTO alumnoDTO;
		alumnoDTO = alumnoService.AlumnoApellidoMaterno(apellidoMaterno);
		
		return ResponseEntity.ok(alumnoDTO);
	}
	@GetMapping(path = "/findBoleta/{boleta}", produces = "application/json")
	public ResponseEntity<?>findB(@PathVariable("boleta") String boleta){
		AlumnoDTO alumnoDTO;
		alumnoDTO = alumnoService.AlumnoBoleta(boleta);
		return ResponseEntity.ok(alumnoDTO);
	}
	@GetMapping(path = "/findIdUsuario/{idUsuario}", produces = "application/json")
	public ResponseEntity<?>findIdUsuario(@PathVariable("idUsuario") Long idUsuario){
		AlumnoDTO alumnoDTO;
		alumnoDTO = alumnoService.findByIdUsuario(idUsuario);
		return ResponseEntity.ok(alumnoDTO);		
	}
	@PostMapping(path = "/save", consumes = "application/json")
	public ResponseEntity<?> save(@RequestBody AlumnoDTO alumnoDTO)throws EmptyResultException{
	alumnoService.saveAlumno (alumnoDTO);
	return ResponseEntity.ok().build();
	}
	@PatchMapping(path = "/update", consumes = "application/json")
	public ResponseEntity<?> update(@RequestBody AlumnoDTO alumnoDTO)throws EmptyResultException{
	alumnoService.updateAlumno(alumnoDTO);
	return ResponseEntity.ok().build();
	}
	
	@DeleteMapping(path = "/delete/{idAlumno}")
	public ResponseEntity<?> delete(@PathVariable("idAlumno") Long idAlumno) throws EmptyResultException{
	alumnoService.deleteAlumno(idAlumno);
	return ResponseEntity.ok().build();
	}
}
