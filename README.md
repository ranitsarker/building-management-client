# Building Management System

## assignment12_category_0011

The Building Management System is a sophisticated web application aimed at enhancing the overall residential experience within an apartment complex. With a responsive design catering to various devices, the system seamlessly integrates Tanstack query functionality for efficient data retrieval. The homepage boasts a dynamic navbar featuring user-specific elements like a profile picture, providing quick access to user-related actions.

This feature-rich system includes an intuitive Apartment page where users can view detailed information about available apartments, complete with images, floor numbers, block names, apartment numbers, and rent details. The user-friendly interface facilitates agreement processes, allowing users to submit requests and store relevant information in the database. Pagination ensures a structured presentation of apartment details.

Private Dashboards for Users, Members, and Admins cater to specific roles. Users can manage their profiles, view announcements, and explore available services. Members gain additional functionalities such as making payments, checking payment history, and accessing announcements. Admins, on the other hand, have a comprehensive dashboard for managing members, making announcements, handling agreement requests, and managing coupons.

Bonus features include an Admin Profile with detailed statistics, JWT implementation for secure login, the ability for admins to change coupon availability, and seamless handling of successful payments. Altogether, the Apartment Management System serves as an efficient and user-friendly platform, enhancing the residential experience for both residents and administrators.

## Project features and functionalities:

#### 1. Responsive Design: 
Ensure the website is responsive for mobile, tablet, and desktop.

#### 2.	Tanstack Query Implementation:
Implement tanstack query in all data fetching functionalities for the GET method.

#### 3. User-Friendly Navbar
Dynamic navigation bar with a logo, website name, Home, Apartment, and a conditional Login icon.

#### 4.	Profile Management:
Users can easily manage their profiles, including uploading a profile picture and accessing a dropdown menu for quick actions.

#### 5.	Apartment Details:
Detailed presentation of available apartments, showcasing images, floor numbers, block names, apartment numbers, and rent details.

#### 6.	Agreement Processing: 
Users can submit agreement requests, and the system stores relevant information in the database with the default status as pending.

#### 7.	Private Dashboards:
Separate dashboards for Users, Members, and Admins, each tailored to their specific roles and responsibilities.

#### 8: Pagination:
Organizes apartment details with a maximum of 6 per page, improving readability and navigation.

#### 9: Admin Statistics:
Admins have access to a comprehensive profile displaying key statistics, including the total number of rooms, room availability percentages, and user counts.

#### 10: JWT Authentication:
Implements JSON Web Token (JWT) authentication for secure login, enhancing user data protection.

#### 11: Coupon Management:
Admins can manage coupons, adjusting their availability, and users can apply valid coupons during the payment process to reduce rent percentages.

#### 12: Announcement Creation:
Admins can create announcements using a dedicated form, including fields for the title and description of the announcement.

### Note: Important GitHub commits:
#### Client side:
* I have added one auto-play slider on the home page
* I have created one apartments json file and show data on the apartment page
* I have created authprovider context and made login and signup 
* interceptor code has been updated
* agreement data prepared with pending status with post-request
* All agreement requests I have shown on one page with the required information
* I have created adminRoute and also configured all admin page path
* agreement accept and reject data requests sent to the server
* user profile page created and shows user email, name, and image
* Announcements are showing user and member both properly
* I have added the payment method stripe properly
* payments have been saved in the database
* I have calculated coupon % and after applying the coupon it work
* I have created an admin profile page and all components
* set and get token issues solved
* apartment information also saved in the payment history
* framer motion animation added in the project


### Live URL: https://building-management-31565.web.app
