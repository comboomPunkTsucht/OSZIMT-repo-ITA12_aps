/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE TABLE IF NOT EXISTS `t_auftraege` (
  `P_ID` int(11) NOT NULL auto_increment,
  `Auftraggeber` tinytext NOT NULL,
  `Kategorie` tinytext NOT NULL,
  `Auftragsort` tinytext NOT NULL,
  `Geplant` date NOT NULL,
  `Erfolgreich` varchar(4) NOT NULL,
  `Auftragsvolumen` decimal(20,2) NOT NULL,
  `MA` int(11) NOT NULL default '1',
  PRIMARY KEY  (`P_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `t_auftraege` DISABLE KEYS */;
INSERT INTO `t_auftraege` (`P_ID`, `Auftraggeber`, `Kategorie`, `Auftragsort`, `Geplant`, `Erfolgreich`, `Auftragsvolumen`, `MA`) VALUES
	(1, 'Dagobert Duck', 'Sicherheitsüberprüfung', 'Geldspeicher', '2017-03-19', 'Ja', 123444555666.00, 3),
	(2, 'Gustav Gans', 'PC-Check', 'Institut', '2017-03-17', 'Ja', 98154.00, 1),
	(3, 'Mickey Mouse', 'Finanzanalyse', 'Eigenheim', '2017-03-15', 'Nein', 10998.00, 2),
	(4, 'Goofy', 'Alarmanlagen-Kontrolle', 'Eigenheim', '2017-02-15', 'Ja', 125.90, 1),
	(5, 'Talerbank AG', 'Sicherheitsüberprüfung', 'Geldspeicher', '2017-01-13', 'Nein', 24545.72, 2),
	(6, 'Bode-Museum', 'Alarmanlagen-Kontrolle', 'Museum', '2017-03-27', 'Ja', 37000000.00, 3),
	(7, 'Gundula Gaukelay', 'PC-Check', 'Eigenheim', '2017-02-15', 'Ja', 7200.00, 1);
/*!40000 ALTER TABLE `t_auftraege` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
