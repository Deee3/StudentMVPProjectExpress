DROP TABLE IF EXISTS who;

CREATE TABLE IF NOT EXISTS who (
    who_id SERIAL PRIMARY KEY,
    person varchar(100),
    phone_number varchar(10),
    email varchar(255)
);





INSERT INTO who (person, phone_number, email) VALUES 
('Dr. Doolittle', '7173402444', 'drdomore@gmail.com'),
('Antonio Martinez', '7062125426', 'amarty@yahoo.com'),
('Kelly Vinson', '4042152674', 'kvins@ves.com');
