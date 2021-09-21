create database PruebaTecnicaBF
use PruebaTecnicaBF

create table Book(
IdBook int identity primary key,
Nombre varchar(50)
)
select * from Book
insert into Book values ('El juidero')