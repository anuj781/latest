import express from 'express';
import { getAllDetails, getDetails, getOnMail } from "../controllers/enquiryControllers.js" 
const router = express.Router()

router.post('/register',getDetails);

router.get('/all', getAllDetails);
router.post('/send-email',getOnMail);


export default router