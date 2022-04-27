# Inizialisierung
 ## Arrays werden wie folgt initialisiert:
 ```java  
 Datentyp[] name = new Datentyp[maxIndex];
 ```
 oder
```java
    int[] name = { variable, zahlernfolge };
```
 ##
 ## Bsp:
 ```java
int[] array = new int[5];
```
##
# Auslesung
## Arrays werden wie folgt ausgelesen:
```java
System.out.println(array[0]);
```
oder
```java
variable = array[0];
```
##
## Bsp:
```java
int[] array = { 3, 2, 5, 7, 9, 12, 97, 24, 54 };
    // drei Variablen für die Summen deklarieren und initialisieren
    // Summen berechnen
    for (int index = 0; index < array.length; index++) {
      int sum1 = 0;
      int sum2 = 0;
      int sum
      if (array[index] % 2 == 0) {
        sum2 += array[index];
      } else {
        sum2 += array[index];
      }
      sum = sum1 + sum2;
      // Summen ausgeben
      System.out.println(
        "ungerade : " + sum1 + System.lineSeparator() + "gerade : " + sum2 + System.lineSeparator() + "alles : " + sum);
    }
```
##
## man kann aber auch die länge bestümmen mit:
```java
name.length
```