public class Main {
    public static void main(String[] args) {
        Spieler s1 = new Spieler(11, "Tor", "Herbert Müllermann", "+49 123 456789", true);
        Mannschaftsleiter m1 = new Mannschaftsleiter("U12", 10.5, 12, "Abwehr", "Hans Müller", "+49 123 456789", true);
        Trainer t1 = new Trainer('B', 1000.0, "Olaf Müller", "+49 123 456789", true);
        Schiedsrichter sr1 = new Schiedsrichter(20, "Thilo Wicktor", "+49 123 456789", true);

        System.out.println(s1.getTrikonr());
        System.out.println(s1.getPos());
        System.out.println(s1.getName());
        System.out.println(s1.getTelnum());
        System.out.println(s1.getBeitrag());
        System.out.println(" ");
        System.out.println(m1.getMannschaft());
        System.out.println(m1.getRabattBeitrag());
        System.out.println(m1.getTrikonr());
        System.out.println(m1.getPos());
        System.out.println(m1.getName());
        System.out.println(m1.getTelnum());
        System.out.println(m1.getBeitrag());
        System.out.println(" ");
        System.out.println(t1.getLklasse());
        System.out.println(t1.getGehalt());
        System.out.println(t1.getName());
        System.out.println(t1.getTelnum());
        System.out.println(t1.getBeitrag());
        System.out.println(" ");
        System.out.println(sr1.getAnzahlSpiele());
        System.out.println(sr1.getName());
        System.out.println(sr1.getTelnum());
        System.out.println(sr1.getBeitrag());
        System.out.println(" ");
        System.out.println(" ");

        int temp1 = -1;
        System.out.println(temp1);
        s1.setTrikonr(temp1);
        System.out.println(s1.getTrikonr());
        temp1 = 100;
        System.out.println(temp1);
        s1.setTrikonr(temp1);
        System.out.println(s1.getTrikonr());
        temp1 = 12;
        System.out.println(temp1);
        s1.setTrikonr(temp1);
        System.out.println(s1.getTrikonr());

        

        System.out.println(" ");
        System.out.println("s1");
        System.out.println(s1.toString());
        System.out.println("m1");
        System.out.println(m1.toString());
        System.out.println("t1");
        System.out.println(t1.toString());
        System.out.println("sr1");
        System.out.println(sr1.toString());


    }

}
