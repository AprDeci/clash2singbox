import express from 'express';
import clash2singboxService from '../service/clash2singboxService.js';

var router = express.Router();
var clash2singboxservice = new clash2singboxService();
router.get('/', async(req, res) => {
    let clashurl = req.query.urls
    let module = req.query.module
    let moduleurl = req.query.moduleurl
    let option = {
        module : module,
        moduleurl : moduleurl,
    }
        let data = await clash2singboxservice.getyaml(clashurl,option)
        res.send(data)

})

router.get('/advance', async(req, res) => {
    let lg = req.query.lg
    let module = req.query.module
    let moduleurl = req.query.moduleurl
    let option = {
        module : module,
        moduleurl : moduleurl,
}
        let data = await clash2singboxservice.getyaml_advanced(lg,option)
        res.send(data)

})

export default router