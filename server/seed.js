const bcrypt = require('bcryptjs');
const { User, Question, sequelize } = require('./models');

const seedData = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    
    console.log('Database synced successfully');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      email: 'admin@punjabpolice.gov.in',
      password: adminPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      badgeNumber: 'ADMIN001',
      department: 'IT Department',
    });

    // Create test user
    const userPassword = await bcrypt.hash('user123', 10);
    await User.create({
      username: 'testuser',
      email: 'user@punjabpolice.gov.in',
      password: userPassword,
      role: 'user',
      firstName: 'Test',
      lastName: 'User',
      badgeNumber: 'USER001',
      department: 'Crime Branch',
    });

    // Sample CCTNS questions
    const cctnsQuestions = [
      {
        questionText: 'What does CCTNS stand for?',
        options: ['Central Criminal Tracking and Notification System', 'Crime and Criminal Tracking Network & Systems', 'Criminal Cases Tracking and Notification Service', 'Centralized Crime Tracking Network System'],
        correctAnswer: 1,
        category: 'cctns',
        difficulty: 'easy',
        points: 1
      },
      {
        questionText: 'Which of the following is NOT an objective of CCTNS?',
        options: ['Make police functioning citizen-friendly', 'Improve efficiency through automation', 'Replace human police officers with AI systems', 'Facilitate interaction among police stations'],
        correctAnswer: 2,
        category: 'cctns',
        difficulty: 'medium',
        points: 1
      },
      {
        questionText: 'What is the primary benefit of CCTNS integration with ICJS?',
        options: ['Automates court judgments', 'Seamless data sharing between police and courts', 'Reduces crime rates automatically', 'Eliminates the need for forensic labs'],
        correctAnswer: 1,
        category: 'cctns',
        difficulty: 'medium',
        points: 1
      },
      {
        questionText: 'Which government program is CCTNS part of?',
        options: ['Digital India', 'National e-Governance Plan', 'Smart Cities Mission', 'Make in India'],
        correctAnswer: 1,
        category: 'cctns',
        difficulty: 'easy',
        points: 1
      }
    ];

    // Sample ICJS questions
    const icjsQuestions = [
      {
        questionText: 'What does ICJS stand for?',
        options: ['Integrated Criminal Justice System', 'Interoperable Criminal Justice System', 'Indian Criminal Justice Service', 'International Criminal Justice Standards'],
        correctAnswer: 1,
        category: 'icjs',
        difficulty: 'easy',
        points: 1
      },
      {
        questionText: 'Which of these is NOT integrated in ICJS?',
        options: ['Police', 'Courts', 'Media', 'Forensic Labs'],
        correctAnswer: 2,
        category: 'icjs',
        difficulty: 'medium',
        points: 1
      },
      {
        questionText: 'What is the primary benefit of ICJS?',
        options: ['Faster delivery of justice', 'Reduced paperwork', 'Improved coordination among justice institutions', 'All of the above'],
        correctAnswer: 3,
        category: 'icjs',
        difficulty: 'medium',
        points: 1
      },
      {
        questionText: 'How does ICJS help in reducing case pendency?',
        options: ['By automating judgments', 'By eliminating the need for lawyers', 'By reducing delays through seamless information sharing', 'By reducing the number of cases filed'],
        correctAnswer: 2,
        category: 'icjs',
        difficulty: 'hard',
        points: 1
      }
    ];

    // Sample KHOJ questions
    const khojQuestions = [
      {
        questionText: 'What is the primary purpose of KHOJ?',
        options: ['Database management', 'Advanced analytics and investigation', 'File storage', 'Email management'],
        correctAnswer: 1,
        category: 'khoj',
        difficulty: 'easy',
        points: 1
      },
      {
        questionText: 'Which technology is primarily used in KHOJ for data analysis?',
        options: ['Machine Learning', 'Blockchain', 'Virtual Reality', 'Quantum Computing'],
        correctAnswer: 0,
        category: 'khoj',
        difficulty: 'medium',
        points: 1
      },
      {
        questionText: 'KHOJ helps in which aspect of policing?',
        options: ['Traffic management only', 'Crime prevention and investigation', 'Staff management', 'Equipment maintenance'],
        correctAnswer: 1,
        category: 'khoj',
        difficulty: 'medium',
        points: 1
      },
      {
        questionText: 'What type of data does KHOJ primarily analyze?',
        options: ['Personal emails', 'Crime and criminal data', 'Weather data', 'Social media likes'],
        correctAnswer: 1,
        category: 'khoj',
        difficulty: 'easy',
        points: 1
      }
    ];

    // Insert questions
    await Question.bulkCreate([...cctnsQuestions, ...icjsQuestions, ...khojQuestions]);

    console.log('Sample data created successfully');
    console.log('Admin credentials: admin / admin123');
    console.log('User credentials: testuser / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();