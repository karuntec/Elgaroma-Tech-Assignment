// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const TodoItem = props => {
  const {todoDetails} = props
  const {id, name, description, isLiked, initialClassName, date} = todoDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteTodo = () => {
    const {deleteTodo} = props
    deleteTodo(id)
  }

  return (
    <li className="todo-item">
      <div className="todo-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="todo-time-container">
            <p className="name">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{description}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            Completed
          </button>
        </div>
        <button className="button" type="button" onClick={onDeleteTodo}>
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default TodoItem
