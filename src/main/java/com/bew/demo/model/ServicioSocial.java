package com.bew.demo.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="servicio_social")
public class ServicioSocial implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="id_servicio")
	private Long idServicio;

	@Column(name="semestre")
	private String semestre;

	@Column(name="responsable_directo")
	private String responsableDirecto;
	
	@Column(name="estado")
	private String estado;
	
	@Column(name="estado_fechas")
	private String estadoFechas;
	
	@Column(name="fecha_registro")
	private String fechaRegistro;
	
	@Column(name="revisado")
	private String revisado;
	
	@Column(name="id_alumno")
	private Long idAlumno;
	
	@Column(name="lugar")
	private String lugar;

	@Column(name="nombre_programa")
	private String nombrePrograma;
	
	@Column(name="fecha_inicio")
	private String fechaInicio;
	
	@Column(name="fecha_fin")
	private String fechaFin;
	
	@Column(name="documentos")
	private String documentos;
	
	@Column(name="carta_compromiso")
	private String cartaCompromiso;
	

	public ServicioSocial() {}
	public ServicioSocial(Long idServicio, String semestre, String responsableDirecto, String estado,
			String fechaRegistro, String revisado, Long idAlumno, String lugar, String nombrePrograma,
			String fechaInicio, String fechaFin, String documentos, String cartaCompromiso, Alumno alumno, String estadoFechas) {
		super();
		this.idServicio = idServicio;
		this.semestre = semestre;
		this.responsableDirecto = responsableDirecto;
		this.estado = estado;
		this.fechaRegistro = fechaRegistro;
		this.revisado = revisado;
		this.idAlumno = idAlumno;
		this.lugar = lugar;
		this.nombrePrograma = nombrePrograma;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.documentos = documentos;
		this.cartaCompromiso = cartaCompromiso;
		this.alumno = alumno;
		this.estadoFechas = estadoFechas;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_alumno",insertable=false, updatable = false)
	private Alumno alumno;

	public Long getIdServicio() {
		return idServicio;
	}

	public void setIdServicio(Long idServicio) {
		this.idServicio = idServicio;
	}

	public String getSemestre() {
		return semestre;
	}

	public void setSemestre(String semestre) {
		this.semestre = semestre;
	}

	public String getResponsableDirecto() {
		return responsableDirecto;
	}

	public void setResponsableDirecto(String responsableDirecto) {
		this.responsableDirecto = responsableDirecto;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(String fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public String getRevisado() {
		return revisado;
	}

	public void setRevisado(String revisado) {
		this.revisado = revisado;
	}

	public Long getIdAlumno() {
		return idAlumno;
	}

	public void setIdAlumno(Long idAlumno) {
		this.idAlumno = idAlumno;
	}

	public String getLugar() {
		return lugar;
	}

	public void setLugar(String lugar) {
		this.lugar = lugar;
	}

	public String getNombrePrograma() {
		return nombrePrograma;
	}

	public void setNombrePrograma(String nombrePrograma) {
		this.nombrePrograma = nombrePrograma;
	}

	public String getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(String fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public String getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(String fechaFin) {
		this.fechaFin = fechaFin;
	}

	public String getDocumentos() {
		return documentos;
	}

	public void setDocumentos(String documentos) {
		this.documentos = documentos;
	}

	public String getCartaCompromiso() {
		return cartaCompromiso;
	}

	public void setCartaCompromiso(String cartaCompromiso) {
		this.cartaCompromiso = cartaCompromiso;
	}
	public String getEstadoFechas() {
		return estadoFechas;
	}
	public void setEstadoFechas(String estadoFechas) {
		this.estadoFechas = estadoFechas;
	}
	
	
}
