package com.bew.demo.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

@Data
@Entity
@Table(name="admin")
public class Admin implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "admin_sec", sequenceName = "admin_seq", allocationSize = 1, initialValue=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_sec")
	@Column(name="id_admin")
	private Long idAdmin;
	
	@Column(name="nombre")
	private String nombre;
	
	@Column(name="apellidos")
	private String apellidos;
	
	@Column(name="telefono")
	private String telefono;
	
	@Column(name="id_usuario")
	private Long idUsuario;

	public Admin() {}
	public Admin( Long idAdmin, String nombre, String apellidos, String telefono, Long idUsuario) {

		this.nombre=nombre;	
		this.idAdmin=idAdmin;
		this.apellidos=apellidos;
		this.telefono=telefono;
		this.idUsuario=idUsuario;
}
	//@ManyToOne(fetch=FetchType.LAZY)
	@ManyToOne(cascade=CascadeType.REMOVE)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name="id_usuario",insertable=false, updatable = false)
	private Usuario usuario;

}