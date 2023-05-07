import { Router, Request, Response } from 'express';
import handleProxy from '../utils/handleProxy';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const response = await handleProxy(req.body);
    res.send(response);
});

export default router;
