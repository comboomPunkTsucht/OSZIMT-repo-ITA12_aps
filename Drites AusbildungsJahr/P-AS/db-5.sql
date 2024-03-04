CREATE DATABASE IF NOT EXISTS `db-5`;

USE `db-5`;

CREATE TABLE IF NOT EXISTS `kunden_t` (
  `p_kunden_nr` INT NOT NULL AUTO_INCREMENT,
  `vname` VARCHAR(32) NOT NULL,
  `nname` VARCHAR(32) NOT NULL,
  `strasse` VARCHAR(32) NOT NULL,
  `haus_nr` INT NOT NULL,
  `plz` INT NOT NULL,
  `ort` VARCHAR(64) NOT NULL,
  `telnum` VARCHAR(16),
  `land` VARCHAR(32) NOT NULL,
  `email` VARCHAR(32),
  PRIMARY KEY (`p_kunden_nr`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `fahrad_t` (
  `p_rahmen_nr` VARCHAR(8) NOT NULL,
  `f_model_id` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`p_rahmen_nr`),
  CONSTRAINT `fk_fahrad_model_id` FOREIGN KEY (`f_model_id`) REFERENCES `model_t` (`p_model_id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `fahrad_kunde_t` (
  `f_kunden_nr` INT NOT NULL,
  `f_rahmen_nr` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`f_kunden_nr`, `f_rahmen_nr`),
  CONSTRAINT `fk_fahrad_kunde_nr` FOREIGN KEY (`f_kunden_nr`) REFERENCES `kunden_t` (`p_kunden_nr`) ON UPDATE CASCADE,
  CONSTRAINT `fk_fahrad_rahmen_nr` FOREIGN KEY (`f_rahmen_nr`) REFERENCES `fahrad_t` (`p_rahmen_nr`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `model_t` (
  `p_model_id` VARCHAR(8) NOT NULL,
  `f_hersteller_id` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`p_model_id`),
  CONSTRAINT `fk_model_hersteller_id` FOREIGN KEY (`f_hersteller_id`) REFERENCES `hersteller_t` (`p_hersteller_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `hersteller_t` (
  `p_hersteller_id` VARCHAR(8) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `strasse` VARCHAR(32) NOT NULL,
  `haus_nr` INT NOT NULL,
  `plz` INT NOT NULL,
  `ort` VARCHAR(64) NOT NULL,
  `land` VARCHAR(32) NOT NULL,
  `vst` VARCHAR(64),
  PRIMARY KEY (`p_hersteller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `reparatur_t` (
  `p_reparatur_nr` INT NOT NULL AUTO_INCREMENT,
  `datum` DATE NOT NULL,
  `reparaturzeitinh` FLOAT,
  `abholdatum` DATE,
  `f_rechnungs_nr` INT NOT NULL,
  `f_rahmen_nr` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`p_reparatur_nr`),
  CONSTRAINT `fk_reparatur_rechnungs_nr` FOREIGN KEY (`f_rechnungs_nr`) REFERENCES `rechnung_t` (`p_rechnungs_nr`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_reparatur_rahmen_nr` FOREIGN KEY (`f_rahmen_nr`) REFERENCES `fahrad_t` (`p_rahmen_nr`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `material_t` (
  `material_nr` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `einzelpreis` FLOAT NOT NULL,
  PRIMARY KEY (`material_nr`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `rechnung_t` (
  `p_rechnungs_nr` INT NOT NULL AUTO_INCREMENT,
  `f_material_nr` INT NOT NULL,
  `anzahl` INT NOT NULL,
  `f_kunde_nr` INT NOT NULL,
  PRIMARY KEY (`p_rechnungs_nr`),
  CONSTRAINT `fk_rechnung_material_nr` FOREIGN KEY (`f_material_nr`) REFERENCES `material_t` (`material_nr`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_rechnung_kunde_nr` FOREIGN KEY (`f_kunde_nr`) REFERENCES `kunden_t` (`p_kunden_nr`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'kunden_t'
INSERT INTO `kunden_t` (`vname`, `nname`, `strasse`, `haus_nr`, `plz`, `ort`, `telnum`, `land`, `email`)
SELECT 
    CONCAT('Vorname', k.id),
    CONCAT('Nachname', k.id),
    CONCAT('Straße', k.id),
    k.id,
    k.id,
    CONCAT('Ort', k.id),
    CONCAT('Telefon', k.id),
    CONCAT('Land', k.id),
    CONCAT('email', k.id, '@example.com')
FROM
    (SELECT @rownum_k := @rownum_k + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_k := 0) AS r) AS k;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'fahrad_t'
INSERT INTO `fahrad_t` (`p_rahmen_nr`, `f_model_id`)
SELECT 
    CONCAT('R', f.id),
    CONCAT('M', f.id)
FROM
    (SELECT @rownum_f := @rownum_f + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_f := 0) AS r) AS f;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'fahrad_kunde_t'
INSERT INTO `fahrad_kunde_t` (`f_kunden_nr`, `f_rahmen_nr`)
SELECT 
    fk.id,
    CONCAT('R', fk.id)
FROM
    (SELECT @rownum_fk := @rownum_fk + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_fk := 0) AS r) AS fk;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'model_t'
INSERT INTO `model_t` (`p_model_id`, `f_hersteller_id`)
SELECT 
    CONCAT('M', m.id),
    CONCAT('H', m.id)
FROM
    (SELECT @rownum_m := @rownum_m + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_m := 0) AS r) AS m;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'hersteller_t'
INSERT INTO `hersteller_t` (`p_hersteller_id`, `name`, `strasse`, `haus_nr`, `plz`, `ort`, `land`, `vst`)
SELECT 
    CONCAT('H', h.id),
    CONCAT('Hersteller', h.id),
    CONCAT('Straße', h.id),
    h.id,
    h.id,
    CONCAT('Ort', h.id),
    CONCAT('Land', h.id),
    CONCAT('VST', h.id)
FROM
    (SELECT @rownum_h := @rownum_h + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_h := 0) AS r) AS h;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'reparatur_t'
INSERT INTO `reparatur_t` (`datum`, `reparaturzeitinh`, `abholdatum`, `f_rechnungs_nr`, `f_rahmen_nr`)
SELECT 
    DATE_ADD(NOW(), INTERVAL r.id DAY),
    RAND() * 10,
    DATE_ADD(NOW(), INTERVAL r.id + 7 DAY),
    r.id,
    CONCAT('R', r.id)
FROM
    (SELECT @rownum_r := @rownum_r + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_r := 0) AS r) AS r;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'material_t'
INSERT INTO `material_t` (`name`, `einzelpreis`)
SELECT 
    CONCAT('Material', mt.id),
    RAND() * 100
FROM
    (SELECT @rownum_mt := @rownum_mt + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_mt := 0) AS r) AS mt;

-- Generiere 100 Dummy-Datensätze für die Tabelle 'rechnung_t'
INSERT INTO `rechnung_t` (`f_material_nr`, `anzahl`, `f_kunde_nr`)
SELECT 
    rt.id,
    rt.id,
    rt.id
FROM
    (SELECT @rownum_rt := @rownum_rt + 1 AS id FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t1, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t2, (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) AS t3, (SELECT @rownum_rt := 0) AS r) AS rt;
