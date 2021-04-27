const { MONGO_PASSWORD, MONGO_USERNAME } = process.env;

const connectMongoUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@todo-app.oyonp.mongodb.net/todo_db?retryWrites=true&w=majority`;

module.exports = {
    connectMongoUrl
}