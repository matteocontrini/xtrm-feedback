int led = D7;
int val = HIGH;

TCPClient client;
byte serverAddress[] = { 188, 166, 58, 249 };
int serverPort = 3001;

int buttonPins[] = { D1, D2, D3, D4 }; // Buttons pins
int previousValues[] = { HIGH, HIGH, HIGH, HIGH };

void setup() {
    pinMode(led, OUTPUT);
    
    client.connect(serverAddress, serverPort);
    
    for (int i = 0; i < 4; i++) {
        pinMode(buttonPins[i], INPUT_PULLUP); // set button pin as INPUT_PULLUP
    }
}

void loop() {
    // Get the pressed button id
    int pressedButtonId = getPressedButton();
    
    // Send the feedback!
    if (pressedButtonId > -1) {
        sendFeedback(pressedButtonId);
        
        digitalWrite(led, HIGH);
        delay(100);
        digitalWrite(led, LOW);
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
    String payload = "Spark;" + String(buttonId);
    
    // Send data
    client.println(payload);
}

// Stops the client if connection is lost
void checkServerConnection() {
    if (!client.connected()) {
        client.stop();
        
        // Reconnect
        client.connect(serverAddress, serverPort);
    }
}
