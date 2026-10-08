package org.example.brettspiele;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BrettspieleApplicationTests {

    @Test
    @Disabled("Deaktiviert für CI Pipeline ohne MongoDB")
    void contextLoads() {
    }

}
