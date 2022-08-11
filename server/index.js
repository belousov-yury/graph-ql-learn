const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [
  {id: 1, username: 'Vasya', age: 25, posts: [
      {
        id: 1,
        title: 'qwerty'
      },
      {
        id: 2,
        title: 'asdfg'
      },
      {
        id: 3,
        title: 'zxcvb'
      },
    ]}
]

const app = express()
app.use(cors())

const createUser = input => {
  const id = Date.now()
  return {
    id, ...input
  }
}

const root = {
  getAllUsers: ({limit}) => {
    console.log(limit)
    return users.map(user => {
      return {...user, posts: user.posts.slice(0, limit)}
    })
    // return [{...users, posts: [users.posts[0]]}]
  },
  posts: (data) => {
    console.log(data)
  },
  getUser: ({id}) => {
    return users.find(user => user.id == id)
  },
  createUser: ({input}) => {
    const user = createUser(input)
    users.push(user)
    return user
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}))

app.listen(5000, () => {
  console.log('server started on port 5000')
})