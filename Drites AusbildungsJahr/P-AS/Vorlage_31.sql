-- ---------------------------------------------------------------------- --
-- Task 3.1 - Aufgabe 2                                                   --
-- ---------------------------------------------------------------------- --

-- 1. Die einfachste Abfrage gibt eine komplette Tabelle aus:
SELECT * 
    FROM `t_hersteller` 
-- 2. Es k�nnen aber auch Felder (Spalten) in der gew�nschter Reihenfolge
--    ausgew�hlt werden:
SELECT `Hersteller` 
    FROM `t_hersteller`
-- 3. Es k�nnen auch nur bestimmte Datens�tze gefiltert werden:
SELECT `Hersteller` 
    FROM `t_hersteller` 
    WHERE `Hersteller` = "Cusco"
-- 4. Darstellung der Datens�tze in bestimmter Reihenfolge (alphabetisch, 
--    numerisch)
SELECT `Hersteller` 
    FROM `t_hersteller` 
    ORDER BY `Hersteller` ASC
-- 5. Es kann auch nur ein Ausschnitt der gesamten Ergebnismenge abgefragt 
--    werden:
SELECT `Hersteller` 
    FROM `t_hersteller`
    LIMIT 10
-- 6. Zus�tzlich kann auch ein Offset festgelegt werden:
SELECT `Hersteller` 
    FROM `t_hersteller`
    LIMIT 3,10
-- 7. Der Abfrage k�nnen "virtuelle Spalten" hinzugef�gt und benannt 
--    werden. 
--    ACHTUNG � der Alias gilt nur in der aktuellen Abfrage!
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller`
-- 8. Auch den Tabellennamen kann ein K�rzel (= Alias) mit AS zugeordnet 
--    werden. Dadurch k�nnen die Feldnamen platzsparend vollst�ndig
--    korrekt bezeichnet werden.
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
-- 9. Die Bedingungen im WHERE- Abschnitt der SQL- Anweisung k�nnen mit 
--    AND und OR verkn�pft werden, um komplexere Filtervorschriften zu 
--    nutzen.
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
    WHERE `Hersteller`= "Cusco" AND `P_Hersteller_Nr` = 1 OR `P_Hersteller_Nr` >= 4
-- 10.  Bedingungen k�nnen optional mit einen NOT negiert werden � die 
--    [...] geh�ren hier nicht zur Syntax, sie stehen f�r "dieses 
--    Schl�sselwort ist optional".
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
    WHERE `Hersteller`= "Cusco" AND NOT `P_Hersteller_Nr` = 1 OR `P_Hersteller_Nr` >= 4
-- 11.  F�r Text gibt es auch die M�glichkeit, mit einem Platzhalter zu 
--    arbeiten, der Textsuche mit dem LIKE- Operator. Das Beispiel findet 
--    alle Datens�tze, in denen Feldname1 ein X enth�lt.
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
    WHERE `Hersteller` LIKE '%Cusco%' 
-- 12.  Auch die Abfrage auf die Nullmarke NULL ist m�glich, hier werden 
--    alle Felder gesucht, bei denen kein Wert gesetzt wurde � nicht zu 
--    verwechseln mit einem leeren String!
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
    WHERE `Hersteller` IS NOT NULL
-- 13.  M�glich ist auch die Filterung durch Festlegung eines 
--    zusammenh�ngenden Bereichs:
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
    WHERE `P_Hersteller_Nr` BETWEEN 3 AND 6
-- 14.  Ein Filter kann auch durch eine unzusammenh�ngenden Liste 
--    festgelegt werden:
SELECT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
    WHERE `P_Hersteller_Nr` IN (2, 5, 6, 7)
-- 15.  Bei Bedarf k�nnen doppelte Datens�tze auch komplett unterdr�ckt 
--    werden:
SELECT DISTINCT `Hersteller`, `P_Hersteller_Nr` AS `virtuelle Spalten` 
    FROM `t_hersteller` AS `T`
    WHERE `Hersteller`= "Cusco" AND `P_Hersteller_Nr` = 1 OR `P_Hersteller_Nr` >= 4
-- ---------------------------------------------------------------------- --
-- Task 3.1 - Aufgabe 3                                                   --
-- ---------------------------------------------------------------------- --
-- 1. Wir ben�tigen eine Ansprechpartnerliste mit Name, Telefonnummer und
--    Mail-Adresse.
SELECT DISTINCT `Vorname`, `Nachname`, `Telefon`, `Mailadresse`
	FROM `t_ansprechpartner` 
-- 2. Au�erdem brauchen unsere Kundendienstmitarbeiter eine �bersicht �ber
--    die vorhandenen Ger�tekategorien, nat�rlich soll jede Ger�teart nur
--    einmal in die Liste.
SELECT DISTINCT `Kategorie`
	FROM `t_geraetetypen`
-- 3. F�r den Support brauchen wir eine Liste der Switches, mit 
--    Inventar-Nummer, Hostname und IP-Adresse.
SELECT DISTINCT `F_Inventar_Nr`, `P_Hostname`, `Management_IP`
	FROM `t_switches`
-- 4. F�r die Webseite brauchen wir eine Liste unserer Standorte, sortiert
--    nach Geb�udenummer
SELECT DISTINCT *
	FROM `t_gebaeude`
    ORDER BY `P_Gebaeude_Nr` DESC
-- 5. Die IT h�tte gerne eine Liste, in welchen R�umen sich momentan �berhaupt
--    Ger�te befinden, bitte sortiert nach Geb�ude und Raumnummer.
SELECT DISTINCT `F_Raum_Nr`, `F_Gebaeude_Nr`
	FROM `t_geraete`
    WHERE `F_Raum_Nr` IS NOT NULL
-- 6. Au�erdem brauchen wir eine Liste aller Abteilungsleitungen, sortiert
--    nach Alphabet.
SELECT DISTINCT `Abteilungsleitung`
	FROM `t_ansprechpartner`
    ORDER BY `Abteilungsleitung` ASC
-- 7. Als letztes brauchen wir noch die Liste aller Switches, die PoE 
--    unterst�tzen (PoE_Faehig = "ja")
SELECT DISTINCT *
	FROM `t_switches`
    WHERE `PoE_Faehig` = "ja"