import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public static void main(String[] args) {
    Map<Integer, Integer> map = new HashMap<>();
    for (Entry<Integer, Integer> e : map.entrySet()) {
        Integer key = e.getKey();
    }
}