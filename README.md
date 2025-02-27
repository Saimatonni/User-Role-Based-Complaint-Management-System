# **User Role-Based Complaint Management System**

A web-based support ticketing system that allows customers to submit complaints, while admins manage and resolve them. The system features role-based access with separate dashboards for **Admins** and **Customers**.

---

## **Tech Stack**

- **Frontend**: React.js, Ant Design, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Other Libraries**: Axios for API requests, React Router for navigation

---

<!-- ## **Features**

- **Customer Dashboard**:
  - Create, view, update, and delete complaint tickets.
  - View status updates for complaints.
- **Admin Dashboard**:
  - View all complaints submitted by customers.
  - Resolve complaints by updating their status.
  - Add replies to complaints.
  - Filter complaints by status, Subject, etc.
- **Authentication**:
  - Login with email and password for both customer and admin roles.
  - Role-based redirection to different dashboards based on the user role.

--- -->

## **Demo**

- **Live Demo**: https://drive.google.com/file/d/103lXBS0hhjsA3OWXzFWd2_F8AfF7n4ZV/view?usp=drive_link

---

## **Installation and Setup Guide**

Follow the steps below to set up and run the project locally.

### **1. Clone the Repository**

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Saimatonni/User-Role-Based-Complaint-Management-System.git
```

---

## 2. Set Up the Backend (Node.js)

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory and add the following environment variables:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
PORT=5001
```

Run the backend server:

```bash
npm start
```

Will able to see these:
```bash
Server running on port 5001
✅ Database connected successfully
```

The backend should now be running at [http://localhost:5001](http://localhost:5001).

---

## 3. Set Up the Frontend (React.js)

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Run the React development server:

```bash
npm start
```

The frontend should now be running at [http://localhost:3000](http://localhost:3000).

---

