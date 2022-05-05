# 1.Frage 
# Quiz
# Welche Deklaration ist Korrekt?
```java
int one1[] = {1,2,3,4,5,6,7,8,9,10}; *
int [] two2 = {1,2,3,4,5,6,7,8,9,10}; *
int [tree3] = {1,2,3,4,5,6,7,8,9,10};
[] int four4 = {1,2,3,4,5,6,7,8,9,10};
```
# 2. Frage
# Wahr oder Falsch
# Ist das Array richtig deklariert
```java
Int one1[] = {1,2,3,4,5,6,7,8,9,10}; 
```
*falsch

# 3. Frage
# Wahr oder Falsch
# Kann man mehr dimensionale Arrays Deklarieren
*Wahr

# 4. Frage
# Quiz
# Was wird ausgegeben
```java
public static void istGroesserals42(int a){
if(a > 42){
    System.out.println("istGroesserals42");
}else {
    System.out.println("istnichtGroesserals42");
}
}
public static void main(String[] args) {
    int one1[] = {1,20,30,40,50};
for (int i = 0; i <= 4; i++) {
    istGroesserals42(one1[i])
}
```


A:istnichtGroesserals42 || istGroesserals42
B:istnichtGroesserals42 || istnichtGroesserals42 || istGroesserals42
C:istnichtGroesserals42 || istnichtGroesserals42 || istnichtGroesserals42 || istGroesserals42 *
D:istGroesserals42




# 5. Frage
# wahr oder Falsch (getauscht)
# Wird in der Methode eine Statistik von einem 6 seitigern Würfel aufgestellt
```java
public static void testeWuerfel() {
    final int[] wuerfel = { 1, 2, 3, 4, 5, 6 };
    int one = 0;
    int two = 0;
    int three = 0;
    int four = 0;
    int five = 0;
    int six = 0;
    for (int i = 0; i <= 100; i++) {
      int wuerfelseite = rand.nextInt(5);

      switch (wuerfelseite) {
        case 0:
          one++;
          break;
        case 1:
          two++;
          break;
        case 2:
          three++;
          break;
        case 3:
          four++;
          break;
        case 4:
          five++;
          break;
        case 5:
          six++;
          break;
      }
```
*wahr

# 6.Frage
# Quiz
# Was Wird in dem Folgendem Codeschnipsel getan?
```java
int[] array = { 3, 2, 5, 7, 9, 12, 97, 24, 54 };
    // drei Variablen für die Summen deklarieren und initialisieren
    // Summen berechnen
    int sum1 = 0;
    int sum2 = 0;
    int sum = 0;
    for (int index = 0; index < array.length; index++) {
      if (index % 2 == 0) {
        sum2 += array[index];
      } else {
        sum2 += array[index];
      }
      sum = sum1 + sum2;
      // Summen ausgeben
      System.out.println(
        "ungerade : " +
        sum1 +
        System.lineSeparator() +
        "gerade : " +
        sum2 +
        System.lineSeparator() +
        "alles : " +
        sum
      );
    }
```
A: Es werden Alle Werte Addirt und Alle ungeraden 
B: Es werden alle Werte Addiert
c: Es werden Alle Werte Addirt und Alle geraden 
D: Es werden alle Werte Addiert und Alle geraden und Alle ungeraden*