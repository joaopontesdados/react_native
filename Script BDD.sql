cREATE DATABASE b2;

use b2;
SELECT * FROM entities;
DELETE FROM entities WHERE id>=0;
ALTER TABLE entities AUTO_INCREMENT = 1;
SELECT User, Host FROM mysql.user WHERE User = 'root';
CREATE USER 'root'@'localhost' IDENTIFIED BY '';
CREATE USER 'root'@'192.168.100.82' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.100.82' WITH GRANT OPTION;
FLUSH PRIVILEGES;

DROP USER 'root'@'192.168.100.82';
