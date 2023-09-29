/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE TABLE IF NOT EXISTS `t_kita_datenzwerge` (
  `Nr` smallint(6) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Geschl` varchar(1) NOT NULL,
  `GebDatum` date default NULL,
  `Spende` decimal(6,2) NOT NULL,
  `Betreuer` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `t_kita_datenzwerge` DISABLE KEYS */;
INSERT INTO `t_kita_datenzwerge` (`Nr`, `Name`, `Geschl`, `GebDatum`, `Spende`, `Betreuer`) VALUES
	(100, 'Hannelore', 'w', '2013-02-14', 11.00, 'Sabrina'),
	(102, 'Jürgen', 'm', '2015-03-12', 5.50, 'Sabrina'),
	(104, 'Hennes', 'm', '2015-04-22', 7.50, 'Marina'),
	(120, 'Elke', 'w', '2014-10-11', 12.00, 'Schorsch'),
	(144, 'Sonja', 'w', '2014-09-14', 18.00, 'Marina'),
	(154, 'Verena', 'w', '2014-04-14', 5.50, 'Sabrina'),
	(166, 'Michael', 'm', '2014-04-30', 12.00, 'Schorsch'),
	(167, 'Jochen', 'm', '2015-03-04', 6.00, 'Sabrina'),
	(169, 'Maja', 'w', '2014-07-31', 15.00, 'Schorsch');
/*!40000 ALTER TABLE `t_kita_datenzwerge` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
