import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "roman-project-manager/tasks",
    resource_type: "auto",
  }),
});

export const upload = multer({ storage });

// Multer = middleware для прийому файлів
// (зображень, PDF, документів тощо)
// в Express.