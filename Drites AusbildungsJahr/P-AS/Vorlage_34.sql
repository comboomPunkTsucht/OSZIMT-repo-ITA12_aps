-- ---------------------------------------------------------------------- --
-- Task 3.4 - Weitere Aggregationsfunktionen                              --
-- ---------------------------------------------------------------------- --

-- a) Wie viele Gerätetypen haben wir eigentlich pro Hersteller im System 
--    eingepflegt?
SELECT th.Hersteller, COUNT(tgt.P_Geraetetyp_Nr) AS DeviceTypesCount
    FROM t_hersteller th
    JOIN t_geraetetypen tgt ON th.P_Hersteller_Nr = tgt.F_Hersteller_Nr
    GROUP BY th.Hersteller
-- b) Wie viele Ports sind an den einzelnen Switches laut System eigentlich 
--    belegt?
SELECT ts.P_Hostname, COUNT(*) AS OccupiedPorts
    FROM t_switches ts
    JOIN t_geraete tg ON ts.F_Inventar_Nr = tg.P_Inventar_Nr
    WHERE tg.Funktional = 1
    GROUP BY ts.P_Hostname
-- c) Und wie viele Ports haben eigentlich unsere PoE-fähigen Switches
--    insgesamt?
SELECT SUM(ts.Anzahl_Ports) AS TotalPoEPorts
    FROM t_switches ts
    WHERE ts.PoE_Faehig = 'ja'
-- d) Schauen Sie mal bitte nach, wie viele IP-Telefone von Cusco
--    (Gerätetypen 92 und 93) wir momentan aufgestellt haben.
SELECT COUNT(*) AS TotalIPPhones
    FROM t_geraetetypen tgt
    JOIN t_geraete tg ON tgt.P_Geraetetyp_Nr = tg.F_Geraetetyp_Nr
    WHERE tgt.P_Geraetetyp_Nr IN (82, 83)
      AND tg.Funktional = 1
-- e) Für die Versicherung muss ich wissen, wie teuer jeweils das teuerste
--    Gerät in den verschiedenen Gebäuden ist, und wie viel die Geräte jeweils
--    insgesamt sind, jeweils sortiert von niedrig bis hoch.
SELECT tge.P_Gebaeude_Nr,
           MAX(tg.Kaufpreis_Netto) AS MaxDeviceCost,
           SUM(tg.Kaufpreis_Netto) AS TotalBuildingCost
    FROM t_gebaeude tge
    JOIN t_geraete tg ON tge.P_Gebaeude_Nr = tg.F_Gebaeude_Nr
    GROUP BY tge.P_Gebaeude_Nr
    ORDER BY TotalBuildingCost

-- f) Und dann war noch die Frage, in welchen Räumen der Durchschnittspreis
--    der Geräte über 500 € liegt, dort bräuchten wir dann eventuell ein
--    neues Schloss an der Tür. 
SELECT tr.PF_Gebaeude_Nr, tr.P_Raum_Nr,
           AVG(tg.Kaufpreis_Netto) AS AvgDeviceCost
    FROM t_raeume tr
    JOIN t_geraete tg ON tr.PF_Gebaeude_Nr = tg.F_Gebaeude_Nr
                      AND tr.P_Raum_Nr = tg.F_Raum_Nr
    GROUP BY tr.PF_Gebaeude_Nr, tr.P_Raum_Nr
    HAVING AvgDeviceCost > 500
-- g) Für die Bilanz müssen wissen, wie groß der Gesamtwert aller Geräte pro
--    Gerätetyp im Bestand ist, absteigend nach Gesamtwert sortiert.
SELECT tgt.P_Geraetetyp_Nr,
           SUM(tg.Kaufpreis_Netto) AS TotalDeviceValue
    FROM t_geraetetypen tgt
    JOIN t_geraete tg ON tgt.P_Geraetetyp_Nr = tg.F_Geraetetyp_Nr
    GROUP BY tgt.P_Geraetetyp_Nr
    ORDER BY TotalDeviceValue DESC

-- h) Fürs Finanzamt brauchen wir die Anzahl der gekauften Geräte pro Jahr.
--    (Tipp: verwenden Sie die YEAR()-Funktion in der GROUP BY-Anweisung).
SELECT YEAR(tg.Kaufdatum) AS PurchaseYear, COUNT(*) AS PurchasedDevices
    FROM t_geraete tg
    GROUP BY PurchaseYear
-- i) Ich wüsste ganz gerne, wie viele Geräte im Laufe des aktuellen Jahres
--    aus der Garantie fallen, und wieviel diese Geräte insgesamt wert sind.
SELECT COUNT(*) AS DevicesOutOfWarranty, SUM(tg.Kaufpreis_Netto) AS TotalValueOutOfWarranty
    FROM t_geraete tg
    WHERE YEAR(tg.Garantieablauf) = YEAR(CURRENT_DATE())
-- j) Und von welchen Geräteypen haben wir eigentlich mehr als 30 Stück im
--    Bestand gelistet?
SELECT tgt.P_Geraetetyp_Nr, COUNT(*) AS TotalDevices
    FROM t_geraetetypen tgt
    JOIN t_geraete tg ON tgt.P_Geraetetyp_Nr = tg.F_Geraetetyp_Nr
    GROUP BY tgt.P_Geraetetyp_Nr
    HAVING TotalDevices > 30
-- k) Es gab eine Beschwerde, dass einige Kolleginnen und Kollegen deutlich
--    mehr Räume betreuen müssen, als andere. Können Sie eine Liste aller
--    Ansprechpartner ausgebeben, die im Hauptgebäude mehr als 5 Räume
--    betreuen müssen, absteigend sortiert nach der Anzahl der Räume?
SELECT tap.P_Ansprechpartner_Nr, tap.Nachname, tap.Vorname, COUNT(tr.P_Raum_Nr) AS ManagedRoomsCount
    FROM t_ansprechpartner tap
    JOIN t_raeume tr ON tap.P_Ansprechpartner_Nr = tr.F_Ansprechpartner_Nr
                   AND tr.PF_Gebaeude_Nr = 'HQ'
    GROUP BY tap.P_Ansprechpartner_Nr
    HAVING ManagedRoomsCount > 5
    ORDER BY ManagedRoomsCount DESC