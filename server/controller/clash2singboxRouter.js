import express from 'express';
import zlib from 'zlib';

import clash2singboxService from '../service/clash2singboxService.js';
import { type } from 'os';
var router = express.Router();
var clash2singboxservice = new clash2singboxService();
router.get('/', async(req, res) => {
    let clashurl = req.query.url
    let module = req.query.module
    let moduleurl = req.query.moduleurl
    let option = {
        module : module,
        moduleurl : moduleurl
    }
    let data = await clash2singboxservice.getyaml(clashurl,option)
    res.send(data)
})

router.get('/test' , async(req, res) => {
    let module = req.query.module
    console.log(module)
    let m = 'eJzNWN1u2zYUvu9TFLqOJTvttjh33Qa0wLofYAFWYAgISjq2uVCkSlJJjDTA7oauL7LtvVZsb7FD6s+SKFsOlmEOYkg6RzznfOffd0+e4ifgch2cP71zN+5ByjSNOaT4dEW5hpOWxOEaOD4PmFjJYIdgWAba0CxHolEFOMp9yRCkQnclaFDXoOzDH5uH9nPXuSsPpla7IIUVLbiZ2aNOhlw0TRVoe2Bwevos/MT++fhSMLJQ7kCmIDEzWZigw3Z/MlEjvdUGsgkKcZlQ/sjKxCjkaoIuKpEpnEeRoBkQUEqqBwpcS7nmcEDaxphcozTUKyxfsJeztwWo7Z5XCX5JjgEy3fFEG0UNrLcuNvPr50QK7pUxmTHhDIQhuogFGMu9COch/vcAa+4ud7JBFRwmRTd6PJaFsKkWUOFX2OVKH4ojveYgJ2abgz3o1cXFd9/vl9UG1JGSEk71hmQYZm1gP5pZXWFrLmN/prXCqrg9Uo71J9FlGCRCM+ON/CkmecPlUEzWFZkkNNmApyzXdLjNEXAPAxMp5IBfGNFjh6yYoLyPUV3CmXBx2g3qLlJBHV6mED146qqBlBkbEJkwoFY0AWLLUsU3H3KBeU52qsvis9NwsbRJGT0bcGemQJ7lfD7vEdZaVi2qR6CFkURhQoKfjt0tuWoLf1+gFmy1GnnTkojE2FAsBZJio0SoDZOi9kLDX8ZHFRtNdZiEujfVmvbZNpgeg7WYiTXJqLLWLebzVpmTQzJdlRgRWVaQTks7fOCwyjcWYOM48rBCcYNYjxz41y9//Pnrb3///P7jh9/7LH7gG3JrmqcKMJHwApvsq6/eXfzQzf7LI5TXwNFj2J/92n98/+Gh2o/GwmHb9mDWs/0lGv+NjwVuS5Z5ePamh07PjKqIDnz174H48vW3n794vRe+PUp1XDCSwXU92Zl9J88GVcmtg39QNzvKelOkB9KInFxJIxPJ/fn3GFLeFiw5JMZTPqYJmjqAdGx68Pw9dQLZlVaF3cNnkGFSl7oIlntkV7SRqcVR19h3k1QEA+qlx5RUZpQJcgXbG6nScXVibCvTTpzkitFB2wuKb3OpioKCTPoHuKosjOAYrKTKqEt9NI36VxjsObubz5qZTRGHicyir8HQL4oY3kQZXs1cGZil1ESK3kQasYrWIGccvWQvWB4lItTKm46pvBFc0pS0G6S/QjrgDq9004EZG33/S2isDv9DcOoc2ouORo0S7yk9dNDysESowLUikTgiC+PAepGrLyFhDpdY3pZogYlsUkZWiRlqEf6kpVeV49Dx5pwblPF1TFPSjO6DybddJ4Z9sl4qcF0BxTK0zHHuNEm3o5AV493m6Wg5NRsXjZYnTON+/y7fZWnDY68Hw7xUeD69ApYPVC91E/VvYM3PWTuql4Jc7ac5G+oIt4gL2k+s55TkvNwLF0tcWT49C8/CxflyvhxsLc1rBXMDLNvDQBpXVqEzibd1+wASSFS54fYp1czTdLn+sHP/5P4fwVLLeA=='
    console.log(m=== module)
    const decompressed = zlib.inflateSync(Buffer.from(module, 'base64')).toString('utf8');
        res.send(decompressed)
}
)
export default router