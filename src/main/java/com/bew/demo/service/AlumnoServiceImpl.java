package com.bew.demo.service;

import java.util.ArrayList;


import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bew.demo.dao.AlumnoRepository;
import com.bew.demo.dto.AlumnoDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.model.Alumno;
import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;


@Service
@Transactional
public class AlumnoServiceImpl implements AlumnoService {

    private static final Logger logger = LogManager.getLogger(AlumnoServiceImpl.class);

    @Autowired
    AlumnoRepository alumnoRepository;

    @Override
    public List<AlumnoDTO> findAll() {

        List<AlumnoDTO> alumnoDTO;
        List<Alumno> alumnos = alumnoRepository.findAll();
        alumnoDTO = new ArrayList<>();
        for (Alumno alumno : alumnos) {
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO.add(mapper.map(alumno, AlumnoDTO.class));
        }
        // TODO Auto-generated method stub
        return alumnoDTO;
    }

    @Override
    public AlumnoDTO findById(Long idAlumno) {

        AlumnoDTO alumnoDTO = new AlumnoDTO();
        try {
            Alumno alumno = alumnoRepository.findById(idAlumno).orElseThrow(() -> new EmptyResultException("Sin Resultados"));
            System. out.println(idAlumno);
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO = (mapper.map(alumno, AlumnoDTO.class));
        } catch (EmptyResultException e) {
        	logger.info("holaaa");
            logger.info("alumno no encontrado alterando el log " );
        }
        return alumnoDTO;
    }

    @Override
    public AlumnoDTO findByIdUsuario(Long idUsuario) {
        AlumnoDTO alumnoDTO = new AlumnoDTO();
        Alumno alumno = null;
        try {
            alumno = alumnoRepository.findByIdUsuario(idUsuario).orElseThrow(() -> new EmptyResultException("Sin Resultados"));
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO = (mapper.map(alumno, AlumnoDTO.class));
        } catch (EmptyResultException e) {
            logger.info("alumno no encontrado");
        }

        return alumnoDTO;
    }

    @Override
    public List<AlumnoDTO> AlumnoNombre(String nombre) {

        List<AlumnoDTO> alumnoDTO;
        List<Alumno> alumnos = alumnoRepository.findByNombre(nombre);
        alumnoDTO = new ArrayList<>();
        for (Alumno alumno : alumnos) {
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO.add(mapper.map(alumno, AlumnoDTO.class));
        }
        return alumnoDTO;
    }

    @Override
    public List<AlumnoDTO> AlumnoPrograma(String programaAcademico) {

        List<AlumnoDTO> alumnoDTO;
        List<Alumno> alumnos = alumnoRepository.findByPrograma(programaAcademico);
        alumnoDTO = new ArrayList<>();
        for (Alumno alumno : alumnos) {
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO.add(mapper.map(alumno, AlumnoDTO.class));
        }
        return alumnoDTO;
    }

    @Override
    public AlumnoDTO AlumnoApellidoPaterno(String apellidoPaterno) {

        AlumnoDTO alumnoDTO = new AlumnoDTO();
        try {
            Alumno alumno = alumnoRepository.findByApellidoPaterno(apellidoPaterno).orElseThrow(() -> new EmptyResultException("Sin Resultados"));
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO = (mapper.map(alumno, AlumnoDTO.class));
        } catch (EmptyResultException e) {
            logger.info("alumno no encontrado");
        }
        return alumnoDTO;
    }

    @Override
    public AlumnoDTO AlumnoApellidoMaterno(String apellidoMaterno) {

        AlumnoDTO alumnoDTO = new AlumnoDTO();
        try {
            Alumno alumno = alumnoRepository.findByApellidoMaterno(apellidoMaterno).orElseThrow(() -> new EmptyResultException("Sin Resultados"));

            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO = (mapper.map(alumno, AlumnoDTO.class));
        } catch (
                EmptyResultException e) {
            logger.info("alumno no encontrado");
        }
        return alumnoDTO;
    }

    @Override
    public AlumnoDTO AlumnoBoleta(String boleta) {

        AlumnoDTO alumnoDTO = new AlumnoDTO();
        Alumno alumno = null;
        try {

            alumno = alumnoRepository.findByBoleta(boleta).orElseThrow(() -> new EmptyResultException("Sin Resultados"));
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumnoDTO = (mapper.map(alumno, AlumnoDTO.class));
        } catch (EmptyResultException e) {
            logger.info("alumno no encontrado alterando logg");
        }

        return alumnoDTO;
    }

    @Override
    public void saveAlumno(AlumnoDTO alumnoDTO) {
        // TODO Auto-generated method stub
        Alumno alumno;
        Mapper mapper = DozerBeanMapperBuilder.buildDefault();
        alumno = (mapper.map(alumnoDTO, Alumno.class));
        alumnoRepository.save(alumno);
    }

    @Override
    public void updateAlumno(AlumnoDTO alumnoDTO) throws EmptyResultException {

        if(alumnoDTO.getIdAlumno()!=null) {
            // Aqui no se usa el dozer ya que como es un update hay datos que se deben conservar como el idUser que nunca deberia cambiar.
            Alumno alumnoBase = alumnoRepository.findById(alumnoDTO.getIdAlumno()).orElseThrow(() -> new EmptyResultException("Sin Resultados"));
            alumnoBase.setBoleta(alumnoDTO.getBoleta());
            alumnoBase.setApellidoMaterno(alumnoDTO.getApellidoMaterno());
            alumnoBase.setApellidoPaterno(alumnoDTO.getApellidoPaterno());
            alumnoBase.setNombre(alumnoDTO.getNombre());
            alumnoBase.setProgramaAcademico(alumnoDTO.getProgramaAcademico());
            alumnoBase.setSexo(alumnoDTO.getSexo());
            alumnoRepository.save(alumnoBase);
        }else{
            // guardado por primera vez
            Alumno alumno;
            Mapper mapper = DozerBeanMapperBuilder.buildDefault();
            alumno = (mapper.map(alumnoDTO, Alumno.class));
            alumnoRepository.save(alumno);
        }
    }

    @Override
    public void deleteAlumno(Long idAlumno) throws EmptyResultException {
        // TODO Auto-generated method stub
        alumnoRepository.deleteById(idAlumno);
    }


}