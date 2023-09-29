-- ---------------------------------------------------------------------- --
-- Task 3.3 - Anfragen für die Kita                                       --
-- ---------------------------------------------------------------------- --

-- 1.)  Wie viele Kinder gehen in den Kindergarten?
SELECT COUNT(*) AS AnzahlKinder
    FROM t_kita_datenzwerge
-- 2.)  Wann hat das jüngste und das älteste Kind Geburtstag?
SELECT MIN(GebDatum) AS JuengstesKind, MAX(GebDatum) AS AeltestesKind
    FROM t_kita_datenzwerge
-- 3.)  Welche Spendensumme steht der Kita insgesamt zur Verfügung?
SELECT SUM(Spende) AS Gesamtspende
    FROM t_kita_datenzwerge
-- 4.)  Wie viele Jungen und Mädchen gibt es? (GROUP BY)
SELECT Geschl, COUNT(*) AS Anzahl
    FROM t_kita_datenzwerge
    GROUP BY Geschl
-- 5.)  Wie viele Kinder hat jeder Betreuer?
SELECT Betreuer, COUNT(*) AS AnzahlKinder
    FROM t_kita_datenzwerge
    GROUP BY Betreuer
-- 6.)  Welche Betreuer sind für mehr als drei Kindern zuständig? (HAVING).
SELECT Betreuer, COUNT(*) AS AnzahlKinder
    FROM t_kita_datenzwerge
    GROUP BY Betreuer
    HAVING COUNT(*) > 3
-- 7.)  Wie viele Jungen und Mädchen hat jeder Betreuer?
SELECT Betreuer, Geschl, COUNT(*) AS Anzahl
    FROM t_kita_datenzwerge
    GROUP BY Betreuer, Geschl
-- 8.)  Wie viele Kinder entfallen auf ein Geburtsjahr?
SELECT YEAR(GebDatum) AS Geburtsjahr, COUNT(*) AS AnzahlKinder
    FROM t_kita_datenzwerge
    GROUP BY YEAR(GebDatum)
-- 9.)  Welche monatliche Spendensumme hat jeder Betreuer zur Verfügung?
SELECT Betreuer, SUM(Spende) AS MonatlicheSpende
    FROM t_kita_datenzwerge
    GROUP BY Betreuer
-- 10.) Wie ist die höchste und niedrigste Elternspende pro Betreuer?
SELECT Betreuer, MAX(Spende) AS HoechsteSpende, MIN(Spende) AS NiedrigsteSpende
    FROM t_kita_datenzwerge
    GROUP BY Betreuer
-- 11.) Wie hoch ist die durchschnittliche Elternspende pro Betreuer?
SELECT Betreuer, AVG(Spende) AS DurchschnittlicheSpende
    FROM t_kita_datenzwerge
    GROUP BY Betreuer