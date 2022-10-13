DROP TABLE IF EXISTS tasks_to_do;

CREATE TABLE IF NOT EXISTS tasks_to_do (
    task_id SERIAL PRIMARY KEY,
    who varchar(100),
    phone_number varchar(10),
    email varchar(255),
    what varchar(255),
    when_at varchar(50),
    time_at varchar(50),
    where_at varchar(255),
    extra_info text
);





INSERT INTO tasks_to_do (who, phone_number, email, what, when_at, time_at, where_at, extra_info) VALUES 
('Dr. Doolittle', '7173402444', 'drdomore@gmail.com', 'Audiology Appointment', '2022-12-02', '13:00', '222 gypsum rd', 'Testing for hearing for the VA'),
('Antonio Martinez', '7062125426', 'amarty@yahoo.com', 'Helping Him Move', '2022-11-23', '09:00', '7910 dawson st', 'Stopping in Nashville, Look for AirBnB'),
('Kelly Vinson', '4042152674', 'kvins@ves.com', 'Hire Heroes Phonecall', '2022-10-13', '10:00', '232 columbus st', 'Initial call to get set up for their services (Resume Reviews, Networking, etc)');
