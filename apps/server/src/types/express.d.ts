import "express";

declare global {
  // Я зараз додаю щось до глобальних типів.
  namespace Express {
    // Відкриває простір імен Express.
    interface Request {
      // Беремо існуючий інтерфейс Request і додаємо до нього свої поля.
      user: {
        id: string; // в кожному req є: req.user.id
      };

      file?: Express.Multer.File; // Без цього рядка TypeScript видасть помилку:
      //console.log(req.file.filename);
      //Property 'file' does not exist on type 'Request'
    }
  }
}

export {};
