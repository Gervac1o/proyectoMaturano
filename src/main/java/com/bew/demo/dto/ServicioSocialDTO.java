package com.bew.demo.dto;



import java.io.Serializable;

public class ServicioSocialDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long idServicio;
	private String semestre;
	private String responsableDirecto;
	private String estado;
	private String fechaRegistro;
	private String revisado;
	private Long idAlumno;
	private String lugar;
	private String nombrePrograma;
	private String fechaInicio;
	private String fechaFin;
	private String documentos;
	private String cartaCompromiso;
	private String estadoFechas;
	
	public String getEstadoFechas() {
		return estadoFechas;
	}
	public void setEstadoFechas(String estadoFechas) {
		this.estadoFechas = estadoFechas;
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
	
	
}
