const { Sequelize, DataTypes } = require('sequelize') // import class Sequelize & new instance from Sequelize

const sequelize = new Sequelize( "task_management", "root", "nhiPH1210", {
    host: "localhost", // in production => changes
    dialect: "mysql", // type of database management
})

// create model from sequelize to save in mysql , it likes table 
const Task = sequelize.define("Task", {
    name : {
        type: DataTypes.STRING(255), // like name varchar(255) in mysql
        allowNull: false
    },
    status: {
        type: DataTypes.STRING, // like name varchar in mysql 
        allowNull: false
    }
})

// dong mo model in sql, create table in datable base on code in nodejs
const syncMode = async () => {
    await Task.sync({ force: true }) // delete old mysql and create new mysql table in case model changes
    // Task.sync({ alter: true }) // update mysql table in case model changes
    console.log('Da dong bo model Task');
}

// insert data in to table Task, there are 2 ways
const createTask = async (name, status) => {
    // c1: build & save
    // const newTask = Task.build({
    //     name, status
    // })
    // await newTask.save()

    // c2: create === build && save
    await Task.create({ name, status }) // like insert into tasks (...) in mysql
}

const getTaskList = async () => {
    const taskList = await Task.findAll() // like select * from task_management.tasks
    console.log('taskList', JSON.stringify(taskList, null, 2));
    return taskList
}

const getTaskDetail = async (id) => {
    // like select * from task_management.tasks where id = xxx
    const taskDetail = await Task.findOne(
        {
            where: {
                id: id
            }
        }
    ) 
    console.log('taskDetail', JSON.stringify(taskDetail, null, 2));
    return taskDetail
}

const updateTaskById = (task) => {
    const { name, status, id } = task
    Task.update(
        {
            name, status
        },
        {
            where: {
                id
            }
        }
    )
}

const deleteTaskById = async (id) => {
    await Task.destroy({
        where: {
            id
        }
    })
}

const  checkConnect = async () => {
    try {
        await sequelize.authenticate(); // check sequelize da connect mysql
        console.log('connect success');
    } catch(e) {
        console.log('connect failed', e);
    }
}


checkConnect()

// syncMode()


// getTaskList()
getTaskDetail('10')
// createTask('Hoc Css', 'PENDING')
// updateTaskById({name: 'Hoc Lap Trinh edit', status: 'DONE', id: 1})
deleteTaskById(2)


