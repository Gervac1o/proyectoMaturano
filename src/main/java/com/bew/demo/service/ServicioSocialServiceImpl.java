package com.bew.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bew.demo.dao.ServicioSocialRepository;
import com.bew.demo.dto.ServicioSocialDTO;
import com.bew.demo.exception.EmptyResultException;
import com.bew.demo.model.ServicioSocial;
import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;

@Service
@Transactional
public class ServicioSocialServiceImpl implements ServicioSocialService {

	@Autowired
	ServicioSocialRepository servicioRepository;
	
	@Override
	public List<ServicioSocialDTO> findAll(){
		List<ServicioSocialDTO> servicioDTO;
		List<ServicioSocial> servicios = servicioRepository.findAll();
		servicioDTO = new ArrayList<>();
		for(ServicioSocial servicio: servicios) {
			Mapper mapper = DozerBeanMapperBuilder.buildDefault();
			servicioDTO.add(mapper.map(servicio, ServicioSocialDTO.class));
		}

		return servicioDTO;
	}

	@Override
	public ServicioSocialDTO findById(Long idServicio)  {
		ServicioSocialDTO servicioDTO = new ServicioSocialDTO(); 
		ServicioSocial servicio = null;
		Optional<ServicioSocial> opServicio = servicioRepository.findById(idServicio);
		servicio = opServicio.get();
		
		Mapper mapper = DozerBeanMapperBuilder.buildDefault();
		servicioDTO = ( mapper.map(servicio, ServicioSocialDTO.class));
		
		return servicioDTO;
	}
	@Override
	public ServicioSocialDTO findByIdAlumno(Long idAlumno) throws EmptyResultException{
		ServicioSocialDTO servicioDTO = new ServicioSocialDTO(); 
		ServicioSocial servicio = null;
		Optional<ServicioSocial> opServicio = Optional.ofNullable(servicioRepository.findByIdAlumno(idAlumno).orElseThrow(() -> new EmptyResultException ("sin resultados")));
		servicio = opServicio.get();
		
		Mapper mapper = DozerBeanMapperBuilder.buildDefault();
		servicioDTO = ( mapper.map(servicio, ServicioSocialDTO.class));
		
		return servicioDTO;
	}

	@Override
	public void saveServicioSocial(ServicioSocialDTO servicioDTO) {
		// TODO Auto-generated method stub
		ServicioSocial servicio;
		Mapper mapper = DozerBeanMapperBuilder.buildDefault();
		servicio = (mapper.map(servicioDTO, ServicioSocial.class));
    	servicioRepository.save(servicio);
	}

	@Override
	public void updateServicioSocial(ServicioSocialDTO servicioDTO) throws EmptyResultException {
	
		ServicioSocial servicio = servicioRepository.findById(servicioDTO.getIdServicio()).orElseThrow(() -> new EmptyResultException("Sin Resultados"));
		
		// servicio.setIdServicio(servicioDTO.getIdServicio());
		servicio.setLugar(servicioDTO.getLugar());
		servicio.setResponsableDirecto(servicioDTO.getResponsableDirecto());
		servicio.setNombrePrograma(servicioDTO.getNombrePrograma());
		servicio.setEstado(servicioDTO.getEstado());
		servicio.setFechaRegistro(servicioDTO.getFechaRegistro());
		servicio.setFechaInicio(servicioDTO.getFechaInicio());
		servicio.setFechaFin(servicioDTO.getFechaFin());
		servicio.setRevisado(servicioDTO.getRevisado());
		servicio.setEstadoFechas(servicioDTO.getEstadoFechas());
		servicio.setDocumentos(servicioDTO.getDocumentos());
		servicio.setCartaCompromiso(servicioDTO.getCartaCompromiso());
		
		System.out.println(servicioDTO.getCartaCompromiso());
		
		//Mapper mapper = DozerBeanMapperBuilder.buildDefault();
		//servicio = (mapper.map(servicioDTO, ServicioSocial.class));
		servicioRepository.save(servicio);
	}

	@Override
	public void deleteServicioSocial(Long idServicio) throws EmptyResultException {
		// TODO Auto-generated method stub
		servicioRepository.deleteById(idServicio);
	}

	@Override
	public List<ServicioSocialDTO> findByEstado(String estado) {
		List<ServicioSocialDTO> servicioDTO; 
		List<ServicioSocial> servicios = servicioRepository.findByEstado(estado);
		servicioDTO = new ArrayList<>();
		for(ServicioSocial servicio: servicios) {
			Mapper mapper = DozerBeanMapperBuilder.buildDefault();
			servicioDTO.add(mapper.map(servicio, ServicioSocialDTO.class));
		}
		return servicioDTO;
	}

}