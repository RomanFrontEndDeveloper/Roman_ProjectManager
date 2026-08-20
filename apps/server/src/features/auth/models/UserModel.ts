import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  phone: string;
  location: string;
  website: string;

  settings: {
    emailNotifications: boolean;
    language: string;
  };

  preferences: {
    timezone: string;
    dateFormat: string;
    startOfWeek: "monday" | "sunday";
  };

  role: "user" | "admin";

  isVerified: boolean;
  verificationToken?: string;

  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: null,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    settings: {
      type: {
        emailNotifications: {
          type: Boolean,
          default: true,
        },

        language: {
          type: String,
          default: "uk",
          trim: true,
        },
      },
    },

    preferences: {
      type: {
        timezone: {
          type: String,
          default: "Europe/Kyiv",
          trim: true,
        },

        dateFormat: {
          type: String,
          default: "DD.MM.YYYY",
          trim: true,
        },

        startOfWeek: {
          type: String,
          enum: ["monday", "sunday"],
          default: "monday",
        },
      },
    },
  },
  {
    timestamps: true, // createdAt updatedAt
  },
);

export const UserModel = model<IUser>("User", userSchema);

// Створи модель UserModel на основі схеми userSchema. Вона буде працювати з колекцією
// users у MongoDB, а всі документи цієї моделі повинні відповідати інтерфейсу IUser.

// Schema описує структуру документа.
// Model використовується для роботи з колекцією MongoDB.
// Interface IUser потрібен TypeScript для перевірки типів.
// timestamps: true автоматично додає createdAt і updatedAt.
// Поле role краще обмежувати через enum.
// Email зазвичай роблять unique, а пароль зберігають лише у вигляді хешу.

/////////////////////////////////////////////////////////////////////////////
//Блок 2. Authentication
// User Model
// — описує структуру користувача в MongoDB.

// Основні поля:

// name
// email
// password
// role
// timestamps

// Register Endpoint

// 1. Перевіряє чи існує користувач.
// 2. Хешує пароль через bcrypt.hash().
// 3. Створює користувача.
// 4. Генерує Access Token і Refresh Token.

// Login Endpoint

// 1. Знаходить користувача за email.
// 2. Порівнює пароль через bcrypt.compare().
// 3. Генерує нові токени.
// 4. Повертає користувача та Access Token.

// JWT (JSON Web Token)

// Access Token
// — короткоживучий токен для доступу до захищених API.

// Передається:

// Authorization: Bearer <token>

// Refresh Token
// — довгоживучий токен для отримання нового Access Token без повторного логіну.

// HttpOnly Cookie
// — безпечне місце для зберігання Refresh Token.
// JavaScript не може прочитати таку cookie.

// Auth Middleware

// 1. Читає JWT з Authorization Header.
// 2. Перевіряє токен через jwt.verify().
// 3. Отримує payload.
// 4. Додає інформацію про користувача в req.user.
// 5. Викликає next().

// Protected Routes
// — маршрути, доступні лише авторизованим користувачам.

// Logout

// 1. Очищає Refresh Token Cookie.
// 2. Завершує сесію користувача.

// Current User Endpoint

// GET /api/auth/me

// Повертає дані поточного користувача на основі req.user.id.

// Пароль ніколи не повертається клієнту.
