package com.bew.demo.model;

import lombok.Data;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "docs_dictamen")
public class DocsDictamen implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "doc_sec", sequenceName = "doc_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doc_sec")
	private Long fileId;
	
    @Column(name = "file_name")
    private String fileName;

    @Column(name = "type")
    private String fileType;
    
    @Lob
    private byte[] data;
    
    @Column(name = "id_doc")
    private String idDoc;
    
	public DocsDictamen() {}
    
    public DocsDictamen (String fileName, String fileType, byte[] data, String idDoc) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data; 
        this.idDoc=idDoc;
        
    }
	@ManyToOne(fetch=FetchType.LAZY)
    //@ManyToOne(cascade=CascadeType.REMOVE)
	//@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name="id_dictamen",insertable=true, updatable = true)
	private Dictamen dictamen;


	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public Dictamen getDictamen() {
		return dictamen;
	}

	public void setDictamen(Dictamen dictamen) {
		this.dictamen = dictamen;
	}

    
}
