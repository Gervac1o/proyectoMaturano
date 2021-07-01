package com.bew.demo.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

@Data
@Entity
@Table(name="dictamen")
public class Dictamen implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="id_dictamen")
	private Long idDictamen;
	
	@Column(name = "porcentaje_creditos")
	private Float porcentajeCreditos;
	
	@Column(name = "semestre")
	private String semestre;
	
	@Column(name="estado")
	private String estado;
	
	@Column(name="fecha_registro")
	private String fechaRegistro;
	
	@Column(name="revisado")
	private String revisado;
	
	@Column(name="id_alumno")
	private Long idAlumno;
	
	public Dictamen () {}
	
	public Dictamen (Long idDictamen , Float porcentajeCreditos ,String semestre, String estado,String fechaRegistro,
			String revisado, Long idAlumno) {
		this.idDictamen=idDictamen;
		this.porcentajeCreditos=porcentajeCreditos;
		this.semestre=semestre;
		this.estado=estado;
		this.fechaRegistro=fechaRegistro;
		this.revisado=revisado;
		this.idAlumno=idAlumno;
	}
	
	@ManyToOne(fetch=FetchType.LAZY)
	//@ManyToOne(cascade=CascadeType.REMOVE)
	//@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name="id_alumno",insertable=false, updatable = false)
	private Alumno alumno;

	public Long getIdDictamen() {
		return idDictamen;
	}

	public void setIdDictamen(Long idDictamen) {
		this.idDictamen = idDictamen;
	}

	public Float getPorcentajeCreditos() {
		return porcentajeCreditos;
	}

	public void setPorcentajeCreditos(Float porcentajeCreditos) {
		this.porcentajeCreditos = porcentajeCreditos;
	}

	public String getSemestre() {
		return semestre;
	}

	public void setSemestre(String semestre) {
		this.semestre = semestre;
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

	public Alumno getAlumno() {
		return alumno;
	}

	public void setAlumno(Alumno alumno) {
		this.alumno = alumno;
	}




}
