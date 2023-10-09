-- ---------------------------------------------------------------------- --
-- Task 3.5 - Unterabfragen                                               --
-- ---------------------------------------------------------------------- --

-- a) Die Serien- und Inventarnummern der allerersten Anschaffung (kleinstes
--    Kaufdatum) im Bestand
SELECT Seriennummer, P_Inventar_Nr
    FROM t_geraete
    WHERE Kaufdatum = (SELECT MIN(Kaufdatum) FROM t_geraete)

-- b) Preis und Inventarnummer des teuersten Geräts, das letztes Jahr gekauft
--    wurde
SELECT Kaufpreis_Netto, P_Inventar_Nr
    FROM t_geraete
    WHERE Kaufdatum >= '2022-01-01' AND Kaufdatum <= '2022-12-31'
    ORDER BY Kaufpreis_Netto DESC
    LIMIT 1

-- c) Alle Informationen der Geräte, deren Einkaufspreis zum teuerten Drittel
--    gehört (d.h. größer als 0,33 * der maximale Preis…).
SELECT *
    FROM t_geraete
    WHERE Kaufpreis_Netto > 0.33 * (SELECT MAX(Kaufpreis_Netto) FROM t_geraete)

-- d) Die Anzahl der Geräte mit dem höchsten und dem geringsten Einkaufspreis.
SELECT COUNT(*) AS Anzahl, 'Höchster Preis' AS Beschreibung
    FROM t_geraete
    WHERE Kaufpreis_Netto = (SELECT MAX(Kaufpreis_Netto) FROM t_geraete)

    UNION

        SELECT COUNT(*) AS Anzahl, 'Niedrigster Preis' AS Beschreibung
            FROM t_geraete
            WHERE Kaufpreis_Netto = (SELECT MIN(Kaufpreis_Netto) FROM t_geraete)

-- e) Die Anzahl der Geräte, die an einem PoE-fähigen Switch hängen
SELECT COUNT(*) AS Anzahl
    FROM t_geraete
    WHERE F_Switch_Hostname IN (SELECT P_Hostname FROM t_switches WHERE PoE_Faehig = 'ja')

-- f) Die Anzahl der Geräte des Raums mit den meisten Geräten im Hauptgebäude [Achtung - ☠⚠]
SELECT COUNT(*) AS Anzahl
    FROM t_geraete
    WHERE (F_Gebaeude_Nr, F_Raum_Nr) = (
        SELECT PF_Gebaeude_Nr, P_Raum_Nr
        FROM t_raeume
            WHERE PF_Gebaeude_Nr = 'HQ'
            ORDER BY (SELECT COUNT(*) FROM t_geraete WHERE F_Gebaeude_Nr = 'HQ' AND F_Raum_Nr = P_Raum_Nr) DESC
            LIMIT 1
    )

-- g) Die Nummer des Gerätetyps mit dem größten Gesamtbestand (Summe aller
--    Einkaufspreise). [Achtung - ☢🔥😈]
SELECT F_Geraetetyp_Nr
    FROM t_geraete
    GROUP BY F_Geraetetyp_Nr
    ORDER BY SUM(Kaufpreis_Netto) DESC
    LIMIT 1
