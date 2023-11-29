# SEISFireBase
This Project has 2 main functional components under the StudentEnrollmentInformationSystem Folder.

The Folder under it is SEIS which is a NEXT JS Application and also contains the CLOUD FUNCTIONS CODES (They Reside under the firebase-functions Folder).

After cloning the Repo you need to use the "npm install" command to install all the dependencies NOTE THAT THIS REQUIRES NODEJS TO BE PRE-INSTALLED IN YOUR SYSTEM.

From this point, the NEXTJS application can be run using the command "npm run dev"; but in order to make the backend functional you need to create a .env.local file inside seis Folder
which has the following data:


--------------------FILE BEGINS-------------------------------------------------
  NEXT_PUBLIC_apiKey="YOUR API KEY"
  NEXT_PUBLIC_authDomain="YOUR AUTH DOMAIN"
  NEXT_PUBLIC_projectId="YOUR PROJECT NAME"
  NEXT_PUBLIC_storageBucket="YOUR STORAGE BUCKET"
  NEXT_PUBLIC_messagingSenderId= "YOUR SENDER ID"
  NEXT_PUBLIC_appId="YOUR APP ID"
  NEXT_PUBLIC_collection='YOUR COLLECTION NAME FOR ENROLLMENT DATA'
  NEXT_PUBLIC_collection_alerts='YOUR COLLECTION NAME FOR ALERTS DATA'
  NEXT_PUBLIC_collection_summaire='YOUR COLLECTION NAME FOR SUMMARY DATA'
  -----------------------EOF----------------------------------------------------


Finally, you need to go to the FIREBASE FUNCTIONS Folder under the SEIS Folder and execute the commands:

"firebase init" and connect to your firebase project

Later, use the command "firebase deploy --only functions" TO deploy the Functions.


NOTE THAT YOU NEED TO CREATE THE RESPECTIVE COLLECTIONS AND DOCUMENTS IN FIRESTORE AND SET AUTHENTICATION IN YOUR PROJECT


Finally, you can Run the NEXTJS APPLICATION 


NOTE

IF THE PERSON CLONING THIS IS AN INSTRUCTOR OR A GRADER PLEASE REFER THE REPORT WHICH CONSISTS THE .env.local file That can be used to connect to the existing Firebase Project Instead of Initiating the CLOUD or FIREBASE from Scratch!
