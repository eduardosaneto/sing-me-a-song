  
import joi from 'joi';

const recommendationsSchema = joi.object({
  name: joi.string().min(3).required(),
  youtubeLink: joi.string().pattern(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/).required()
});

export { recommendationsSchema };