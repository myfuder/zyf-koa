// const Sequelize = require("sequelize")
// const fs = require("fs")
// const db = require("../config/db")

import Sequelize from 'sequelize'
import fs from 'fs'
import db from '../config/db.js'
// 引入Sequelize对象
const sequelize = db.sequelize;
// // 引入上一步的文章数据表模型文件
// const Article = Sequelize.import('../schema/article');

let files = fs.readdirSync(__dirname + '/schema')
for(let file of files){
    //import("./schema/"+file).then((module)=>{
    //    if(module.Model){
    //        let model = new module.Model(sequelize, Sequelize.DataTypes)
    //        let name = file.substring(0, file.length - 3);
    //        modules[name] = model;
    //    }
    //})
     let Model = require("./schema/"+file);
    // // (sequelize, Sequelize.DataTypes)
     let model = new Model(sequelize, Sequelize.DataTypes)
     let name = file.substring(0, file.length - 3);
     module.exports[name] = model;
}