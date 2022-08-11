import React, {useEffect, useState} from 'react';
import {IUser} from './models/IUser';
import {useMutation, useQuery} from '@apollo/client';
import {GET_ALL_USERS, GET_ONE_USER} from './query/user';
import {CREATE_USER} from './mutations/user';

interface IUsers {
  getAllUsers: IUser[]
}

function App() {
  const {data, loading, error, refetch} = useQuery<IUsers>(GET_ALL_USERS)
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })

  console.log(oneUser)
  const [newUser] = useMutation<IUsers>(CREATE_USER)
  const [users, setUsers] = useState<IUser[]>([])
  const [username, setUsername] = useState<string>('')
  const [age, setAge] = useState<number>(0)


  useEffect(() => {
    if (!loading) {

      setUsers(data!.getAllUsers)
    }
  }, [data])

  const addUser = (e: React.MouseEvent) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername('')
      setAge(0)
    })
  }

  const getAll = (e: React.MouseEvent) => {
    e.preventDefault()
    refetch()
  }

  if (loading) {
    return (
      <div className='App'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className='App'>
      <form>
        <input type='text'
               value={username}
               onChange={(e)=>setUsername(e.target .value)}
        />
        <input type='number'
               value={age}
               min={0}
               onChange={(e)=>setAge(parseInt(e.target.value))}
        />
        <div className='btns'>
          <button onClick={addUser}>Создать</button>
          <button onClick={getAll}>Получить</button>
        </div>
      </form>
      <div>
        {
          users.map(user =>
            <div className='user' key={user.id}>{user.id}. {user.username} {user.age}</div>
          )
        }
      </div>
    </div>
  );
}

export default App;
