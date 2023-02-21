#include <fstream>
#include <iterator>
#include <iostream>
#include <vector>
#include <string>

using namespace std;



string menuDisplay()
 {
  string option;
    cout << "*************************************" << endl;
    cout << "*                                   *" << endl;
    cout << "* German-English Vocabulary trainer *" << endl;
    cout << "*                                   *" << endl;
    cout << "* Please select an option:          *" << endl;
    cout << "*                                   *" << endl;
    cout << "* (1) add vocabulary                *" << endl;
    cout << "* (2) vocabulary test               *" << endl;
    cout << "* (q) quit                          *" << endl;
    cout << "*                                   *" << endl;
    cout << "*************************************" << endl;
    cin >> option;
    return option;
 }


 vector<string> loadVectorFile(vector<string> voc_file, string filepath){

    ifstream file(filepath);

    string str;

    while (getline(file, str))
    {
      if (str.size() > 0)
      {
        voc_file.push_back(str);
      }
  }
  return voc_file;
 }

 void saveVectorFile(vector<string> voc_file, string filepath) {

  ofstream file(filepath);

  ostream_iterator<string> output_iterator(file, "\n");
  copy(voc_file.begin(), voc_file.end(), output_iterator);
 }
vector<string> addGerWord(vector<string> voc_ger) {
      cout << "*******************************" << endl;
      cout << "* Please enter a German word: *" << endl;
      cout << "*******************************" << endl;
      string german_word;
      cin >> german_word;
      voc_ger.push_back(german_word);
      return voc_ger;
}
vector<string> addEngWord(vector<string> voc_eng) {
      cout << "*****************************************" << endl;
      cout << "* Please enter the English translation: *" << endl;
      cout << "*****************************************" << endl;
      string english_word;
      cin >> english_word;
      voc_eng.push_back(english_word);
      return voc_eng;
}
void wordAddDysplay(vector<string> voc) {
      cout << "****************" << endl;
      cout << "* Word added!  *" << endl;
      cout << "* Word cout: " << to_string(voc.size()) << " *" << endl;
      cout << "****************" << endl;
}
void vocabularyTest(vector<string> voc_ger, vector<string> voc_eng) {
      bool done = false;
      string userInput;
      int random;
      do {
      userInput = " ";
      random = rand() % voc_ger.size();
      cout << "************************************" << endl;
      cout << "*  vocabulary test is starting...  *" << endl;
      cout << "*                                  *" << endl;
      cout << "*  Please translate in to English: *" << endl;
      cout << "* " << voc_ger[random] << " *" << endl;
      cout << "************************************" << endl;
      cin >> userInput;
      if (userInput == voc_eng[random]) {
        cout << "************************************" << endl;
        cout << "* Great it's correct               *" << endl;
        cout << "*                                  *" << endl;
        cout << "* Would you like another? (yes/no) *" << endl;
        cout << "************************************" << endl;
        userInput = " ";
        cin >> userInput;
        if (userInput == "n" || userInput == "no") {
          done = true;
        }else if (userInput == "y" || userInput == "yes") {
          done = false;
        }
      } else {
        cout << "**************************************" << endl;
        cout << "* Try again with a other random Word *" << endl;
        cout << "**************************************" << endl;
      }
} while (done == false);
}
int main()
{

  vector<string> voc_ger;
  vector<string> voc_eng;

  do
  {

    voc_ger = loadVectorFile(voc_ger, "./voc_ger.txt");
    voc_eng = loadVectorFile(voc_eng, "./voc_eng.txt");
    
    string option;
    option = menuDisplay();

    if (option == "1" || option == "(1)")
    {
      voc_ger = addGerWord(voc_ger);
      voc_eng = addEngWord(voc_eng);
      saveVectorFile(voc_ger, "./voc_ger.txt");
      saveVectorFile(voc_eng, "./voc_eng.txt");

     wordAddDysplay(voc_ger);


      
    }else if (option == "2" || option == "(2)")
    {
      vocabularyTest(voc_ger, voc_eng);
    }
    else if (option == "q" || option == "(q)" || option == "Q" || "(Q)")
    {
      return 0;
    }

  } while (true);
}