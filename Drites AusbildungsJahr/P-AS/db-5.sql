CREATE    DATABASE IF NOT EXISTS `db-5`;

USE       `db-5`;

CREATE    TABLE IF NOT EXISTS `kunden_t` (
          `p_kunden_nr` INT NOT NULL AUTO_INCREMENT,
          `vname` VARCHAR(32) NOT NULL             ,
          `nname` VARCHAR(32) NOT NULL             ,
          `strasse` VARCHAR(32) NOT NULL           ,
          `haus_nr` INT NOT NULL                   ,
          `plz` INT NOT NULL                       ,
          `ort` VARCHAR(64) NOT NULL               ,
          `telnum` VARCHAR(16)                     ,
          `land` VARCHAR(32) NOT NULL              ,
          `email` VARCHAR(32)                      ,
          PRIMARY KEY (`p_kunden_nr`)
          ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE    TABLE IF NOT EXISTS `fahrad_t` (
          `p_rahmen_nr` VARCHAR(8) NOT NULL                                                                        ,
          `f_model_id` VARCHAR(8) NOT NULL                                                                         ,
          PRIMARY KEY (`p_rahmen_nr`)                                                                              ,
          CONSTRAINT `f_model_id` FOREIGN KEY (`f_model_id`) REFERENCES `model_t` (`p_model_id`) ON UPDATE NO ACTION
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE    TABLE IF NOT EXISTS `fahrad_kunde_t` (
          `f_kunden_nr` INT NOT NULL                                                                                  ,
          `f_rahmen_nr` VARCHAR(8) NOT NULL                                                                           ,
          PRIMARY KEY (`f_kunden_nr`, `f_rahmen_nr`)                                                                  ,
          CONSTRAINT `f_kunden_nr` FOREIGN KEY (`f_kunden_nr`) REFERENCES `kunden_t` (`p_kunden_nr`) ON UPDATE CASCADE,
          CONSTRAINT `f_rahmen_nr` FOREIGN KEY (`f_rahmen_nr`) REFERENCES `fahrad_t` (`p_rahmen_nr`) ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE    TABLE IF NOT EXISTS `model_t` (
          `p_model_id` VARCHAR(8) NOT NULL                                                                                           ,
          `f_hersteller_id` VARCHAR(8) NOT NULL                                                                                      ,
          PRIMARY KEY (`p_model_id`)                                                                                                 ,
          CONSTRAINT `f_hersteller_id` FOREIGN KEY (`f_hersteller_id`) REFERENCES `hersteller_t` (`p_hersteller_id`) ON UPDATE CASCADE
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE    TABLE IF NOT EXISTS `hersteller_t` (
          `p_hersteller_id` VARCHAR(8) NOT NULL,
          `name` VARCHAR(255) NOT NULL         ,
          `strasse` VARCHAR(32) NOT NULL       ,
          `haus_nr` INT NOT NULL               ,
          `plz` INT NOT NULL                   ,
          `ort` VARCHAR(64) NOT NULL           ,
          `land` VARCHAR(32) NOT NULL          ,
          `vst` VARCHAR(64)                    ,
          PRIMARY KEY (`p_hersteller_id`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE    TABLE IF NOT EXISTS `reperatur_t` (
          `p_reperatur_nr` INT NOT NULL AUTO_INCREMENT                                                                             ,
          `datum` DATE NOT NULL                                                                                                    ,
          `reperaturzeitinh` FLOAT                                                                                                 ,
          `abholdatum` DATE                                                                                                        ,
          `f_rechnungs_nr` VARCHAR(8) NOT NULL                                                                                     ,
          `f_rahmen_nr` VARCHAR(8) NOT NULL                                                                                        ,
          PRIMARY KEY (`p_reperatur_nr`)                                                                                           ,
          CONSTRAINT `f_rechnungs_nr` FOREIGN KEY (`f_rechnungs_nr`) REFERENCES `rechnung_t` (`p_rechnungs_nr`) ON UPDATE NO ACTION,
          CONSTRAINT `f_rahmen_nr` FOREIGN KEY (`f_rahmen_nr`) REFERENCES `fahrad_t` (`p_rahmen_nr`) ON UPDATE CASCADE
          ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE    TABLE IF NOT EXISTS `material_t` (
          `materal_nr` INT NOT NULL AUTO_INCREMENT,
          `name` VARCHAR(255) NOT NULL            ,
          `einzelpreis` FLOAT NOT NULL            ,
          PRIMARY KEY (`materal_nr`)
          ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE    TABLE IF NOT EXISTS `rechnung_t` (
          `p_rechnungs_nr` INT NOT NULL AUTO_INCREMENT                                                                       ,
          `f_material_nr` INT NOT NULL                                                                                       ,
          `anzahl` INT NOT NULL                                                                                              ,
          `f_kunde_nr` INT NOT NULL                                                                                          ,
          PRIMARY KEY (`p_rechnungs_nr`)                                                                                     ,
          CONSTRAINT `f_material_nr` FOREIGN KEY (`f_material_nr`) REFERENCES `material_t` (`materal_nr`) ON UPDATE NO ACTION,
          CONSTRAINT `f_kunden_nr` FOREIGN KEY (`f_kunden_nr`) REFERENCES `kunden_t` (`p_kunden_nr`) ON UPDATE NO ACTION
          ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Inserting dummy data into 'material_t' table
INSERT    INTO `material_t` (`name`, `einzelpreis`)
VALUES    ('Material1', '10.50'),
          ('Material2', '20.75');

-- Inserting dummy data into 'fahrad_t' table
INSERT    INTO `fahrad_t` (`p_rahmen_nr`, `f_model_id`)
VALUES    ('R1', 'M1'),
          ('R2', 'M2');

-- Inserting dummy data into 'rechnung_t' table
INSERT    INTO `rechnung_t` (`f_material_nr`, `anzahl`, `f_kunde_nr`)
VALUES    ('1', '2', '1'),
          ('2', '1', '2');

-- Inserting dummy data into 'reparatur_t' table
INSERT    INTO `reperatur_t` (
          `datum`           ,
          `reperaturzeitinh`,
          `abholdatum`      ,
          `f_rechnungs_nr`  ,
          `f_rahmen_nr`
          )
VALUES    ('2024-02-27', '1.5', '2024-03-05', '1', 'R1'),
          ('2024-02-28', '2.0', '2024-03-07', '2', 'R2');

-- Inserting dummy data into 'fahrad_kunde_t' table
INSERT    INTO `fahrad_kunde_t` (`f_kunden_nr`, `f_rahmen_nr`)
VALUES    ('1', 'R1'),
          ('2', 'R2');