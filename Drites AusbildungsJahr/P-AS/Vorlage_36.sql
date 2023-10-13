-- ---------------------------------------------------------------------- --
-- Task 3.6 - Abfragen über mehrere Tabellen                              --
-- ---------------------------------------------------------------------- --

-- a) Wir brauchen zu jedem Raum im Gebäude ZU13 den Namen und die 
--    Telefonnummer des zuständigen Ansprechpartners.
SELECT tr.PF_Gebaeude_Nr, tr.P_Raum_Nr, tap.Nachname, tap.Vorname, tap.Abteilung
    FROM t_raeume tr
    JOIN t_ansprechpartner tap ON tr.F_Ansprechpartner_Nr = tap.P_Ansprechpartner_Nr
    WHERE tap.Abteilung = 'DES'

-- b) Morgen kommt der Kundendienst von Luzifer vorbei. Wo haben wir
--    eigentlich überall die Geräte von Luzifer stehen?
SELECT DISTINCT tge.Bezeichnung AS Gebaeude, tr.Raumbezeichnung AS Raum
    FROM t_geraetetypen tgt
    JOIN t_geraete tg ON tgt.P_Geraetetyp_Nr = tg.F_Geraetetyp_Nr
    JOIN t_raeume tr ON tg.F_Gebaeude_Nr = tr.PF_Gebaeude_Nr AND tg.F_Raum_Nr = tr.P_Raum_Nr
    JOIN t_gebaeude tge ON tr.PF_Gebaeude_Nr = tge.P_Gebaeude_Nr
    WHERE tgt.Hersteller = 'Luzifer'

-- c) Für welche Räume ist eigentlich ein Ansprechpartner der Design-Abteilung
--    (DES) zuständig?
SELECT tr.PF_Gebaeude_Nr, tr.P_Raum_Nr, tap.Nachname, tap.Vorname, tap.Abteilung
    FROM t_raeume tr
    JOIN t_ansprechpartner tap ON tr.F_Ansprechpartner_Nr = tap.P_Ansprechpartner_Nr
    WHERE tap.Abteilung = 'DES';

-- d) Könnten Sie mir den Gesamtwert aller Geräte heraussuchen, in deren
--    Kategorie das Wort „Drucker“ vorkommt? 
SELECT SUM(tg.Kaufpreis_Netto) AS GesamtwerDrucker
    FROM t_geraetetypen tgt
    JOIN t_geraete tg ON tgt.P_Geraetetyp_Nr = tg.F_Geraetetyp_Nr
    WHERE tgt.Bezeichnung LIKE '%Drucker%';

-- e) Außerdem brauchen wir eine Liste aller Switches mit den Hostnamen und
--    den zugehörigen Herstellern.
SELECT ts.P_Hostname, th.Hersteller
    FROM t_switches ts
    JOIN t_geraete tg ON ts.F_Inventar_Nr = tg.P_Inventar_Nr
    JOIN t_geraetetypen tgt ON tg.F_Geraetetyp_Nr = tgt.P_Geraetetyp_Nr
    JOIN t_hersteller th ON tgt.F_Hersteller_Nr = th.P_Hersteller_Nr

-- f) Könnten Sie mir den Gesamtbestand pro Hersteller (Anzahl der Geräte)
--    auflisten – mit Herstellernamen? Es sollen auch die Hersteller
--    auftauchen, von denen wir momentan gar keine Geräte im Bestand haben…
-- 
--    Tipp: Informieren Sie sich noch einmal, warum genau es eigentlich
--          COUNT(*) und COUNT(Feldname) gibt...
SELECT th.Hersteller, COUNT(tg.P_Inventar_Nr) AS AnzahlGeräte
    FROM t_hersteller th
    LEFT JOIN t_geraetetypen tgt ON th.P_Hersteller_Nr = tgt.F_Hersteller_Nr
    LEFT JOIN t_geraete tg ON tgt.P_Geraetetyp_Nr = tg.F_Geraetetyp_Nr
    GROUP BY th.Hersteller
