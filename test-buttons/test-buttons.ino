int pinButton[4] = {4,5,6,7}; // array of button pin
int before[4]; // array of before value
 
int index; // index array
int val; // button value
 
// ========== VOID SETUP ========== //
void setup() {
  for (index = 0; index < 4; index++)
  {
    pinMode(pinButton[index], INPUT_PULLUP); // set button pin as INPUT_PULLUP
    before[index] = HIGH; // set before value as HIGH
  }
  
  Serial.begin(9600);
  Serial.println("Iniziamo:"); // start serial communication
}
 
// ========== VOID LOOP ========== //
void loop() {
  
  if (digitalRead(pinButton[0]) == LOW && before[0] == HIGH)
  { // first button pressed
    send(0);
  }
  if (digitalRead(pinButton[1]) == LOW && before[1] == HIGH)
  { // second button pressed
    send(1);
  }
  if (digitalRead(pinButton[2]) == LOW && before[2] == HIGH)
  { // third button pressed
    send(2);
  }
  if (digitalRead(pinButton[3]) == LOW && before[3] == HIGH)
  { // fourth button pressed
    send(3);
  }
  
  invert(); // function invert
  
  /*
  for (index = 0; index < 4; index++) // read button pin
  {
    val = digitalRead(pinButton[index]); // read button value
    
    if (val == LOW && before[index] == HIGH)
    {
      send(index);
      
    } // end if
    
      before[index] = val;
      
  } // end for
  */
  
  delay(100); // delay
  
} // end loop
 
// ========== VOID SEND ========== //
void send(int value) { // print pressed button
  Serial.println(value);
}
 
// ========== VOID INVERT ========== //
void invert() { // set before as pin state
  for (index = 0; index < 4; index++)
  {
    before[index] = digitalRead(pinButton[index]);
  }
}