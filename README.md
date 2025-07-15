# Punjab Police Training Portal

A comprehensive web application for Punjab Police training programs including CCTNS, ICJS, and KHOJ modules.

## Features

- **User Authentication**: Dual login system for admin and regular users
- **Training Modules**: CCTNS, ICJS, and KHOJ training with comprehensive content
- **MCQ Tests**: Interactive multiple-choice questions with timer
- **Admin Dashboard**: User management and question bank management
- **Session Management**: Secure session handling with Redux
- **Certificate System**: Automated certificate generation for passed tests
- **CSV Upload**: Bulk question upload functionality for admins
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: Session-based authentication
- **File Upload**: Multer for CSV handling

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   - Install PostgreSQL
   - Create a database named `punjab_police_portal`
   - Update the connection string in `.env`

3. **Environment Variables**
   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/punjab_police_portal
   SESSION_SECRET=your-secret-key-here
   PORT=5000
   ```

4. **Seed Database**
   ```bash
   cd server && node seed.js
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## Default Credentials

- **Admin**: admin / admin123
- **User**: testuser / user123

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (admin only)
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Admin
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id` - Update user
- `POST /api/admin/questions` - Create question
- `POST /api/admin/questions/upload` - Upload CSV questions
- `GET /api/admin/questions` - Get all questions
- `DELETE /api/admin/questions/:id` - Delete question

### Test
- `GET /api/test/questions/:category` - Get questions by category
- `POST /api/test/submit` - Submit test
- `GET /api/test/results` - Get user's test results

## CSV Format for Question Upload

```csv
question,option1,option2,option3,option4,correctAnswer,category,difficulty,points
"What does CCTNS stand for?","Option 1","Option 2","Option 3","Option 4",2,"cctns","easy",1
```

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Layout/
│   ├── Test/
│   └── Training/
├── services/
├── store/
└── App.jsx

server/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.