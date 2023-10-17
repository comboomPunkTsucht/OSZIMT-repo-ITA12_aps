--1. 
SELECT DISTINCT Kategorie
FROM t_auftraege

--2.
SELECT P_ID, Auftraggeber, Auftragsort, Geplant
FROM t_auftraege
WHERE Erfolgreich = 'Ja' AND YEAR(Geplant) = 2017 AND MONTH(Geplant) = 3


--3.
-- Gesamtes geplantes Auftragsvolumen
SELECT SUM(Auftragsvolumen) AS Volumen_Geplant
FROM t_auftraege

-- Erfolgreich durchgeführtes Auftragsvolumen
SELECT SUM(Auftragsvolumen) AS Volumen_Erfolreich
FROM t_auftraege
WHERE Erfolgreich = 'Ja';


--4.
SELECT Kategorie, AVG(Auftragsvolumen) AS Volumen_Geplant
FROM t_auftraege
GROUP BY Kategorie
ORDER BY Volumen_Geplant DESC

--5.
SELECT Auftragsort, SUM(Auftragsvolumen) AS Volumen_Durchgeführt
FROM t_auftraege
WHERE Erfolgreich = 'Ja'
GROUP BY Auftragsort
HAVING SUM(Auftragsvolumen) > 10000

--6.
SELECT Auftragsort, MIN(Auftragsvolumen) AS Auftragsvolumen
FROM t_auftraege

--7.
SELECT MONTH(Geplant) AS Monat, Auftragsort, SUM(Auftragsvolumen) AS Auftragsvolumen_Geplant
FROM t_auftraege
GROUP BY Monat, Auftragsort


--8.
SELECT MONTH(Geplant) AS Monat, MA, SUM(Auftragsvolumen) AS Volumen_Pro_MA
FROM t_auftraege
WHERE Erfolgreich = 'Ja'
GROUP BY Monat, MA
