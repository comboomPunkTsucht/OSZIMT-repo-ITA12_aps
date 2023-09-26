-- ---------------------------------------------------------------------- --
-- Task 3.2 - Weitere Anfragen                                            --
-- ---------------------------------------------------------------------- --

-- Leider haben wir in der vierten Etage mit einigen Telefonen von Cusco, bei
-- uns als Gerätetypen 82, 83 und 84 gelistet. Wir benötigen daher Abfragen für
-- folgende Informationen, um der Problematik auf dem Grund gehen zu können:

-- a. In welchen Räumen (Ausgabe von Gebäude- und Raumnummer) sind Geräte vom
-- Typ ’82’, ’83’ oder ’84’ aufgestellt worden?
SELECT DISTINCT `F_Gebaeude_Nr`, `F_Raum_Nr` 
    FROM `t_geraete`
    WHERE `F_Geraetetyp_Nr` IN (82, 83, 84)
-- b. Welche dieser Telefone sind denn momentan schon als defekt eingetragen
--    (Funktional = 0)?
SELECT DISTINCT `F_Gebaeude_Nr`, `F_Raum_Nr`  
    FROM `t_geraete`
    WHERE `F_Geraetetyp_Nr` IN (82, 83, 84) AND `Funktional` = 0
-- c. Welche der Geräte hängen denn am Switch HQ41-3650-01? 
SELECT DISTINCT * 
    FROM `t_geraete`
    WHERE `F_Geraetetyp_Nr` IN (82, 83, 84) AND `Funktional` = 0 AND `F_Switch_Hostname` = "HQ41-3650-01" 
-- d. Welche anderen Geräte hängen denn am Switch HQ41-3650-01 mit dran (außer
--    den Telefonen)?
SELECT DISTINCT * 
    FROM `t_geraete`
    WHERE `F_Switch_Hostname` = "HQ41-3650-01" AND NOT `F_Geraetetyp_Nr` IN (82, 83, 84)
-- e. Welche dieser Telefone sind denn überhaupt im vierten Stock aufgestellt
--    (Gebäude-Nr HQ, Raumnummer beginnt mit „4.“)?
SELECT DISTINCT *
    FROM `t_geraete`
    WHERE `F_Geraetetyp_Nr` IN (82, 83, 84) AND `F_Raum_Nr` LIKE '%4.%'
-- Außerdem müssen wir unsere Wartungsmaßnahmen optimieren, um die solche
-- Probleme in Zukunft zu vermeiden. Dafür bräuchten wir ein paar statistische
-- Infos:
-- f. Welche Geräte haben wir denn außerhalb von unserer Geschäftsstelle
--    (Gebäudenummer ‚HQ‘) momentan im Bestand?
SELECT DISTINCT *
    FROM `t_geraete`
    WHERE NOT `F_Gebaeude_Nr` = "HQ"
-- g. Welche Geräte haben wir denn im Januar diesen Jahres so bestellt?
--    Inventarnummer und Kaufdatum reicht als Info!
SELECT DISTINCT *
    FROM `t_geraete`
    WHERE `Kaufdatum` LIKE '%2023%'
-- h. Ich brauche auch eine Liste aller Server in unseren Gerätetypen. Sie
--    sollten alle in ihrer Bezeichnung ’Server’ enthalten...
SELECT DISTINCT *
    FROM `t_geraetetypen`
    WHERE `Kategorie` LIKE '%Server%'
-- i. Welche Geräte vom KYOCEROPS (Hersteller-Nr. 8) haben denn mehr als 500
--    Euro gekostet?
SELECT DISTINCT *
    FROM `t_geraete`, `t_geraetetypen`
    WHERE ` F_Hersteller_Nr` = 8 AND `Kaufpreis_Netto` > 500.0
-- j. Bei welchen Geräten liegt denn der Netto-Kaufpreis im mittlerenPreissegment
--    Preissegment zwischen 1000€ und 10.000€? Bitte Inventarnummer, Netto-
--    Preis und Seriennummer ausgeben, aufsteigend sortiert nach Kaufpreis
--    sortieren.
SELECT DISTINCT `P_Inventar_Nr`, `Kaufpreis_Netto`, `Seriennummer`
    FROM `t_geraete`
    WHERE `Kaufpreis_Netto` < 10000.0 AND `Kaufpreis_Netto` > 1000.0
    ORDER BY `Kaufpreis_Netto`



 DZX8VGesQ8


 https://www.moralmachine.net/hl/de/results/270551471