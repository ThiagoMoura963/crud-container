create database dbContainer

use dbContainer

create table container (
	id int not null auto_increment,
    nome char(11), 
    cliente varchar(100),
    tipo enum ('20', '40'),
    `status` enum ('Vazio', 'Cheio'),
    categoria enum('Importação', 'Exportação'),
    
    primary key (id)
)default charset = utf8;



desc container; 

create table movimentacao (
	id int not null auto_increment,
    idContainer int not null,
    tipo enum('Embarque', 'Descarga', 'Gate-In', 'Gate-Out', 'Reposicionamento', 'Pessagem', 'Scanner'),
    inicio varchar(30),
    fim varchar(30),
    
    primary key(id),
    foreign key(idContainer) references container(id)
    
    on delete cascade
    on update cascade
)default charset = utf8;

desc movimentacao

desc container
select * from container
select * from movimentacao

insert into container (nome, cliente, tipo, status, categoria) value
('ABCD1234567', 'Empresa1', '20', 'Vazio', 'Importação');

insert into container (nome, cliente, tipo, status, categoria) value
('EFGH4567898', 'Empresa2', '40', 'Cheio', 'Exportação');

insert into movimentacao (idContainer, tipo, inicio, fim) value
('113', 'Embarque', '17/04/2002 12:00', '18/04/2002 13:00');

