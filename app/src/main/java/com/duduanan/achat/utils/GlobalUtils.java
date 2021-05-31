package com.duduanan.achat.utils;

import java.util.UUID;

public class GlobalUtils {
    public static String uuid(){
        String uuid = UUID.randomUUID().toString();
        return uuid;
    }
}
