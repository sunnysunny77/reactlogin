CREATE DATABASE react;

USE react;

CREATE TABLE login ( email varchar(255) NOT NULL, pass CHAR(60) NOT NULL , PRIMARY KEY (email) ); 

INSERT INTO login (email, pass) VALUES ("daniel@gmail.com","$2y$10$Xdamxgj3W9hmBhQateFVxeMf8f4DV0U5Rzk3WCOkU0cZI/92j6zz6");