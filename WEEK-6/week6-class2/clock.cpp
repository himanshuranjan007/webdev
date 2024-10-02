#include <iostream>
#include <unistd.h>

using namespace std;

int main() {
    for (int h = 0; h < 24; h++) {
        for (int m = 0; m < 60; m++) {
            for (int s = 0; s < 60; s++) {
                system("clear"); 
               if(h<10){
                cout<<"0";
               }
                cout << h << ":";
                if(m<10){
                cout<<"0";
               }
                cout << m << ":";
                if(s<10){
                cout<<"0";
               }
                cout << s << endl;
                sleep(1);
            }
        }
    }

    return 0;
}