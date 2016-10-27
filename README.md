# demoCMSProject
DEMO CMS

1. This project contains 3 directories:
    a. Admin
        This directory contains all the script and html content to host the admin page of a CMS.

    b. Server-Admin
        This directory contains the server script for the server. The server is hosted on localhost:3000
        This directory contains 'uploads' folder where all the content posted by admin is stored.

    c. Server-User
        This directory contains the server script for hosting the client side requests. This server is hosted 
        on localhost:4000 port. This part keeps watching the changes made by the admin side and populates 
        the content accordingly.  

    d. User
        This directory contains all the script and html content to host the user page of a CMS, which displays the 
        content posted by the admin.

2. To run this project, initially enter into induvidual directories and perform 'npm install'. This would fetch
   all the dependencies mentioned in package.json file and add it to the project.

3. Then enter into the server-admin directory and enter 'gulp'. This will host the server script on localhost:3000.
