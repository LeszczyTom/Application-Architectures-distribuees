package tl;

import com.zeroc.Ice.Current;

public class PrinterI implements Printer {

    public void printString(String s, Current current) {
        System.out.println(s);
    }
}
