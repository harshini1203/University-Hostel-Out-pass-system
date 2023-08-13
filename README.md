
# User authentication system for outpass management system

This repository showcases a seamless login/signup system with both a user-friendly UI and a solid backend connection.

It has an intuitive interface while benefiting from essential features like one-factor authentication, password management (reset and change), session/cookie handling, and stringent password strength checks for authenticating students and wardens before redirecting to their respective dashboards. 

It is implemented using ReactJS, HTML and CSS for the frontend and NodeJS with ExpressJS, MySQL database for backend.







## Screenshots

### Login / Sign up home page
![Login](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/login%20page.png?raw=true)

Users must sign up, verify their accounts using official university emails, and create strong passwords. If the password is weak, a toast alert is shown. Only after these steps can users log in.

![Sign Up](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/signup%20valid%20email.png?raw=true
)
![Sign Up](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/signup%20valid%20password.png?raw=true
)

Upon successful signup, a verification email is sent to the respective email id to enable one factor authentication. This project uses the sendGrid mailer API to implement the same.

![Sign Up](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/signup%20check%20email.png?raw=true
)

### Verification of user

Verification email is sent to user :

![Verification email](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/verify%20email.png?raw=true
)
![Verification email](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/verification%20link.png?raw=true
)

Upon clicking the link, the user is verified which will be updated in the database.

![Verification email](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/verification%20success.png?raw=true
)

Once the user logs in, they are directed to the their dashboards.

 Here I have created a dummy dashboard to showcase the functionality of my login page , the actual page will be integrated in later stages.

![Dashboard](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/dummy%20dashboard.png?raw=true
)

Successful login creates a 24-hour session. Inactive session or logout requires re-authentication to access the dashboard, enhancing security.

### Forgot password

"Clicking 'Forgot Password?' redirects users to a page to enter their usernames. Afterward, a unique link with a verification token is provided for password reset to their respective email id.

The following screenshots show the workflow of this functionality : 

![Reset page username enter](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/change%20password.png?raw=true
)
![Reset email sent](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/password%20reset.png?raw=true
)
![Reset email](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/reset%20mail.png?raw=true
)

![Reset link](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/reset%20link.png?raw=true
)

![Password reset](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/password%20reset%20page.png?raw=true
)
![Reset successful](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/password%20reset%20successful.png?raw=true
)

This is a screenshot of the record of the user in MySQL database, where we can see the password is hashed and updated.

![data updated successfully](https://github.com/harshini1203/University-Hostel-Out-pass-system/blob/master/ss/data%20updated%20successfully.png?raw=true
)










