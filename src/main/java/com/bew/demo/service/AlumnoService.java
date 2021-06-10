/**
 *
 */
package com.bew.demo.service;

import java.util.List;

import com.bew.demo.dto.AlumnoDTO;
import com.bew.demo.exception.EmptyResultException;

/**
 * @author Erick
 *
 */
public interface AlumnoService {

    List<AlumnoDTO> findAll();

    AlumnoDTO findById(Long idAlumno);

    AlumnoDTO AlumnoBoleta(String boleta);

    void saveAlumno(AlumnoDTO alumnoDTO);

    void updateAlumno(AlumnoDTO alumnoDTO) throws EmptyResultException;

    void deleteAlumno(Long idAlumno) throws EmptyResultException;

    AlumnoDTO findByIdUsuario(Long idUsuario);

    List<AlumnoDTO> AlumnoNombre(String nombre);

    List<AlumnoDTO> AlumnoPrograma(String programaAcademico);

    AlumnoDTO AlumnoApellidoPaterno(String apellidoPaterno);

    AlumnoDTO AlumnoApellidoMaterno(String apellidoMaterno);
    
    

}
