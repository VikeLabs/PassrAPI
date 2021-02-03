







public static void updateTopTen(int[] topTen, int score) {
    
    if (score > topTen[9]) {
        int pos = 0;

        while (score < topTen[pos]) {
            pos++;
        }

        for (int i = 9; i > pos; i--) {
            topTen[i] = topTen[i-1];
        }
        
        topTen[pos] = score;
    }

}








public void calculateShipping(Address origin) {
    if (destination.getCountry() == origin.getCountry()) {
        cost += DOMESTIC_CHARGE;
    } else {
        cost += INTERNATIONAL_CHARGE;
    }
}

public static double calculateTotal(Delivery[] items, Address origin) {
    double total = 0.0;

    for (int i = 0; i < items.length; i++) {
        total += items[i].calculateShipping(origin);
    }

    return total;
}