-- Erstellen Sie die Datenbank 'fitnesscenter'
CREATE DATABASE IF NOT EXISTS fitnesscenter;
USE fitnesscenter;

-- Erstellen Sie die Tabelle 'kunden'
CREATE TABLE IF NOT EXISTS T_kunden (
    P_kunr INT PRIMARY KEY,
    kuanrede ENUM('Herr', 'Frau'),
    kuname VARCHAR(255),
    kuvornahme VARCHAR(255),
    kuplz INT,
    kuort VARCHAR(255),
    kutelefon INT,
    kugeburtsdatum DATE,
    kuemail VARCHAR(255),
    kumerk VARCHAR(255)
);

-- Erstellen Sie die Tabelle 'kurse'
CREATE TABLE IF NOT EXISTS T_kurse (
    P_ksnr INT PRIMARY KEY,
    ksname VARCHAR(255),
    ksbeschreibung TEXT,
    ksart VARCHAR(255),
    kswochentag VARCHAR(15),
    ksuhrzeit TIME,
    ksdauer INT,
    ksdauer_einheit VARCHAR(255),
    kszielgruppe VARCHAR(255),
    F_trnr INT,
    FOREIGN KEY (F_trnr) REFERENCES T_trainer(P_trnr)
);

-- Erstellen Sie die Tabelle 'trainer'
CREATE TABLE IF NOT EXISTS T_trainer (
    P_trnr INT PRIMARY KEY,
    tranrede ENUM('Herr', 'Frau'),
    trname VARCHAR(255),
    trvorname VARCHAR(255),
    trstrasse VARCHAR(255),
    trplz INT,
    trort VARCHAR(255),
    trtelefon INT,
    trgeburtsdatum DATE,
    tremail VARCHAR(255),
    trquali VARCHAR(255)
);

-- Erstellen Sie die Tabelle 'teilnahme'
CREATE TABLE IF NOT EXISTS T_teilnahme (
    P_teilnehmernr INT PRIMARY KEY,
    F_teksnr INT,
    F_tekunr INT,
    teanmeldung DATE,
    teabmeldung DATE,
    FOREIGN KEY (F_teksnr) REFERENCES T_kurse(P_ksnr),
    FOREIGN KEY (F_tekunr) REFERENCES T_kunden(P_kunr)
);

-- Fügen Sie Daten in die Tabelle 'kunden' ein
INSERT INTO T_kunden VALUES
(1001, 'Herr', 'Pflaume', 'Renè', 10781, 'Berlin', 9588745, '1980-07-24', 'pglaume@pflaume.net', 'Liebt Ausdauerkurse'),
(1202, 'Frau', 'Müller', 'Anja', 10435, 'Potsdam', 3411833, '1983-06-30', 'anja@provider.de', 'Wasserratte'),
(1210, 'Frau', 'Dorfmann', 'Yvonne', 26133, 'Oldenburg', 02345342489, '1981-08-07', 'yvonne@provider.de', ''),
(1213, 'Herr', 'Krokowski', 'Timo', 10559, 'Berlin', 3944781, '1980-03-23', 'timo.de', '');

-- Fügen Sie Daten in die Tabelle 'kurse' ein
INSERT INTO T_kurse VALUES
(100, 'Aquafit', 'Mit dem AquaFit Kurs stärkst du optimal deine Muskelatur und schaffst es schon in kürzester Zeit, deine Ausdauer zu verbessern', 'Wasser', 'Donnerstag', '11:00:00', 90, 'Hallenbad', 'Alle Mitglieder', 11422),
(101, 'Aqua X-Press', 'In 30 Minuten das Beste aus sich herausholen', 'Wasser', 'Montag', '08:00:00', 90, 'Hallenbad', 'Alle Mitglieder', 11422);

-- Fügen Sie Daten in die Tabelle 'trainer' ein
INSERT INTO T_trainer VALUES 
(11221, 'Herr', 'Pflaume', 'Renè', 'Pallasstr. 5', 10781, 'Berlin', 9588745, '1980-07-24', 'pglaume@fantasie.com', 'Diplom-Sportlehrer'),
(11422, 'Frau', 'Dietz', 'Anja', 'Kalkscheuenstr. 22', 10435, 'Berlin',3411833,'1983-06-30', 'pglaume@fantasie.com', 'Diplom-Sportlehrer');

-- Fügen Sie Daten in die Tabelle 'teilnahme' ein
INSERT INTO T_teilnahme VALUES 
(2, 102, 6163, '2017-10-02', '0000-00-00'),
(3, 104, 6166, '2017-10-02', '0000-00-00'),
(4, 100, 6163, '2017-10-02', '0000-00-00'),
(5, 107, 6166, '2017-10-02', '0000-00-00'),
(6, 105, 4946, '2017-10-02', '0000-00-00');
