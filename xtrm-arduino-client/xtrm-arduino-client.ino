/*

  XTRM feedback system
  Arduino client
  
  This sketch detects button click and
  sends data to the server through TCP
  
  Using - Ethernet shield
      - 4 buttons

 */

#include <SPI.h>
#include <Ethernet.h>

byte macAddress[] = { 0x90, 0xA2, 0xDA, 0x0D, 0x23, 0x58 };
IPAddress server(192, 168, 1, 50); // Server IP address
int serverPort = 3001; // Server port

// Ethernet TCP client
EthernetClient client;

// Starts ethernet connection
void setupEthernet() {
  // Automatic IP, DNS, gateway and subnet mask
  Ethernet.begin(macAddress);
  delay(1000);
  
  Serial.println("Device connected: " + Ethernet.localIP());
  
  // Attempt server connection
  if (client.connect(server, serverPort)) {
      Serial.println("Connected to the server!");
  }
  else {
    Serial.println("Failed connection to the server");
  }
}

void setup() {
  
  // Start serial connection
  Serial.begin(9600);
  Serial.println("Connecting to the server...");
  
  // Setup ethernet connection
  setupEthernet();
    
}

void loop() {
  // Check if connection is still valid
  checkServerConnection();
  
  // Get the pressed button id
  int pressedButtonId = checkPressedButton();
  
  // Send the feedback!
  if (pressedButtonId > -1) {
      sendFeedback(pressedButtonId);
  }
}

// Returns the id (0...3) of the last pressed button
int checkPressedButton() {
  // TODO
}

void sendFeedback(int buttonId) {
  // Create CSV payload
  String payload = "arduinoUnoAgnagnu;" + buttonId;
  
  Serial.println(payload);
  
  // Send data
  client.println(payload);
}

// Stops the client if connection is lost
void checkServerConnection() {
  if (!client.connected()) {
    Serial.println();
    Serial.println("Server disconnected");
    client.stop();
    
    while (true) ;
  }
}
