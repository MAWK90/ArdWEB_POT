const int potPIN = A0;  // Pin potencjometru

int potValue = 0;       // Wartosc odczytana z pot
int checkValue = 0;     // Zmienna do porownania wartosci

void setup() 
{
  Serial.begin(9600); 
}

void loop() 
{
  // Odczytanie wartosci potencjometru
  potValue = analogRead(potPIN);

  // Porownanie wartosci z wartoscia poprzednia odczytu 
  if (checkValue != potValue) {
    // Wysylamy dane portem szeregowym
    Serial.print("A"); // Literka A rozpoczyna transmisje
    Serial.print(potValue); // Wysylanie danych jako int
    Serial.print("B"); // Literka B konczy transmisje
    checkValue = potValue; // Ustawiamy wynik do porownania
  }
  // Opoznienie programu o 0,1s. 
  delay(100);                     
}
