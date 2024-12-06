const PATH = require('path')
const EXPRESS = require('express')
const OCASTWalker = require('../ast/OCASTWalker')

const app = EXPRESS()
app.use(EXPRESS.json())
// 静态站点
app.use('/',EXPRESS.static(PATH.join(__dirname,'html')))

app.use('/convertCode',EXPRESS.urlencoded({ extended: false }),(req,res)=>{
    const { code } = req.body
    let walker = new OCASTWalker()
    try {
        let translateCode = walker.translateCode(code)
        res.json({
            code:translateCode,
            errors:[],
            status:0,
        })
    } catch (error) {
        res.json({
            code:'',
            errors:[`${error}`],
            status:1,
        })
    }
   

})

const port = 8765
app.listen(port,() => console.log(`Example app listening on port ${port}!`))