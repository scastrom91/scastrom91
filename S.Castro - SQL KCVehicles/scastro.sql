create schema KCVEHICLES authorization oodhuafv;

create table KCVEHICLES.Color (
	IdColor serial not null,		-- PK
	Name varchar(20) not null,
	Description varchar(512) null
	
);

create table KCVEHICLES.CompanyGroup (
	IdCGroup serial not null,		-- PK
	Name varchar(20) not null,		
	CIF varchar(20) not null,
	Description varchar(512) null
);

create table KCVEHICLES.Brand (
	IdBrand serial not null,		-- PK
	Name varchar(20) not null,		
	IdCGroup serial not null,		-- FK KCVEHICLES.CompanyGroup
	CIF varchar(20) not null,
	Description varchar(512) null
);

create table KCVEHICLES.ColorModel (
	IdColor serial not null,		-- PK FK
	IdModel serial not null,		-- PK FK
	Description varchar(512) null
);

create table KCVEHICLES.Model (
	ModelId serial not null,		-- PK FK
	Description varchar(512) null
);

