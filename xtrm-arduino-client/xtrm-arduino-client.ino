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

byte macAddress[] = { 0x90, 0xA2, 0xDA, 0x0D, 0x23, 0x58 }; // MAC address
byte serverAddress[] = { 192, 168, 1, 11 }; // Server IP address
byte localAddress[] = { 192, 168, 1, 100 }; // Arduino IP address
int serverPort = 3001; // Server port

int buttonPins[] = { 4, 5, 6, 7 }; // Buttons pins
int previousValues[] = { HIGH, HIGH, HIGH, HIGH };

// Ethernet TCP client
EthernetClient client;

// Starts ethernet connection
void setupEthernet() {
  Serial.println("Connecting to the server...");
  
  // Automatic IP, DNS, gateway and subnet mask
  Ethernet.begin(macAddress, localAddress);
  
  Serial.println(Ethernet.localIP());
  
  // Attempt server connection
  if (client.connect(serverAddress, serverPort)) {
    Serial.println("Connected to the server!");
  }
  else {
    Serial.println("Failed connection to the server");
    Serial.println("Retrying...");
    // Retry failed connection
    setupEthernet();
  }
}

void setup() {
  
  // Start serial connection
  Serial.begin(9600);
  
  // Setup ethernet connection
  setupEthernet();
  
  for (int i = 0; i < 4; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP); // set button pin as INPUT_PULLUP
  }
    
}

void loop() {
  // Check if connection is still valid
  checkServerConnection();
  
  // Get the pressed button id
  int pressedButtonId = getPressedButton();
  
  // Send the feedback!
  if (pressedButtonId > -1) {
      sendFeedback(pressedButtonId);
  }
  
  // Debounce time
  delay(100);
}

// Returns the id (0...3) of the last pressed button
int getPressedButton() {
  for (int i = 0; i < 4; i++) {
    int val = digitalRead(buttonPins[i]);
    
    // If button is pressed
    if (val == LOW && previousValues[i] == HIGH) {
      previousValues[i] = val;
      return i;
    }
    previousValues[i] = val;
  }
  return -1;
}

// Sends the value over TCP
void sendFeedback(int buttonId) {
  // Create CSV payload
  String payload = "arduinoUnoAgnagnu;";
  payload.concat(buttonId);
  
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
    
    // Do nothing forever
    //while (true) ;
    setupEthernet();
  }
}
